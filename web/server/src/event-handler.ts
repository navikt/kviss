import { Namespace, Socket } from 'socket.io'
import { IncomingEvent, LeaveGameEvent, Player } from './events/incoming'
import * as api from './api'
import { setGameFinished } from './api'
import {
    OutgoingEvent,
    SendAnswerEvent,
    SendQuestionEvent,
    ShowAnswersEvent,
    UpdatePlayerListEvent,
} from './events/outgoing'

export default async function handleEvents(socket: Socket, sockets: Namespace) {
    const { pin, hostId, playerId } = socket.handshake.auth

    if (!pin) {
        console.warn('Pin missing')
        return
    }

    socket.join(pin)

    if (hostId) {
        console.log(`Host (${hostId}) joined room ${pin}`)
    } else {
        console.log(`Player (${playerId}) joined room ${pin}`)
    }

    const game = await api.getGameByPin(pin)

    api.getPlayers(pin).then((players: object[]) => {
        socket.in(pin).emit(OutgoingEvent.PLAYER_JOINED_EVENT, { players })
    })

    socket.once(IncomingEvent.START_GAME_EVENT, async () => {
        console.log('START_GAME_EVENT')
        if (game.hostId === hostId) {
            const quiz = await api.getQuizById(game.quizId)

            const event: SendQuestionEvent = { question: quiz.questions[0] }
            sockets.in(pin).emit(OutgoingEvent.SEND_QUESTION_EVENT, event)
        } else {
            socket.emit(OutgoingEvent.SEND_ERROR_EVENT, { errorMessage: 'Invalid host ID' })
        }
    })

    socket.on(IncomingEvent.NEXT_QUESTION_EVENT, async (arg) => {
        console.log('NEXT_QUESTION_EVENT', arg)
        const { quizId, questionId } = arg

        if (game.hostId === hostId) {
            const question = await api.getQuestionById(quizId, questionId)

            const event: SendQuestionEvent = { question }
            sockets.in(pin).emit(OutgoingEvent.SEND_QUESTION_EVENT, event)
        } else {
            socket.emit(OutgoingEvent.SEND_ERROR_EVENT, { errorMessage: 'Invalid host ID' })
        }
    })

    socket.on(IncomingEvent.LEAVE_GAME_EVENT, async (arg) => {
        console.log('LEAVE_GAME_EVENT')
        const { playerId } = arg as LeaveGameEvent
        await api.deletePlayer(playerId)
    })

    socket.on(IncomingEvent.SELECT_ANSWER_EVENT, async (arg) => {
        console.log('SELECT_ANSWER_EVENT', arg)

        const { alternativeId } = arg

        const result = await api.sendAnswer(alternativeId, pin, playerId)

        console.log('result: ', result)

        const event: SendAnswerEvent = { playerId: result.playerId, correct: result.isCorrect }
        sockets.in(pin).emit(OutgoingEvent.SEND_ANSWER_EVENT, event)
    })

    socket.on(IncomingEvent.END_GAME_EVENT, async () => {
        console.log('END_GAME_EVENT')
        const finished = await api.setGameFinished(pin)
        if (finished) {
            sockets.socketsLeave(pin)
        }
    })

    socket.on(IncomingEvent.TRIGGER_ANSWER_EVENT, () => {
        console.log('TRIGGER_ANSWER_EVENT')
        if (game.hostId === hostId) {
            const event: ShowAnswersEvent = { show: true }
            socket.in(pin).emit(OutgoingEvent.SHOW_ANSWERS_EVENT, event)
        } else {
            socket.emit(OutgoingEvent.SEND_ERROR_EVENT, { errorMessage: 'Invalid host ID' })
        }
    })

    socket.on(IncomingEvent.TRIGGER_UPDATE_PLAYER_LIST_EVENT, async () => {
        console.log('TRIGGER_UPDATE_PLAYER_LIST_EVENT')
        if (game.hostId === hostId) {
            const players = await api.getPlayers(pin)

            const event: UpdatePlayerListEvent = { players: players }
            sockets.in(pin).emit(OutgoingEvent.UPDATE_PLAYER_LIST_EVENT, event)
        } else {
            socket.emit(OutgoingEvent.SEND_ERROR_EVENT, { errorMessage: 'Invalid host ID' })
        }
    })

    socket.on('disconnect', () => {
        if (hostId) {
            console.log(`Host (${hostId}) left room ${pin}`)
        } else {
            console.log(`Player (${playerId}) left room ${pin}`)
        }
        socket.leave(pin)
    })
}
