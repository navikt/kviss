import { Namespace, Socket } from 'socket.io'
import { IncomingEvent, LeaveGameEvent, Player } from './events/incoming'
import * as api from './api'
import {
    OutgoingEvent,
    PlayerLeftEvent,
    SendAnswerEvent,
    SendQuestionEvent,
    ShowAnswersEvent,
    UpdatePlayerListEvent,
} from './events/outgoing'
import { parseAzureUserToken, validateToken } from '@navikt/oasis'

export default async function handleEvents(socket: Socket, sockets: Namespace) {
    const { pin, hostId, playerId } = socket.handshake.auth
    const authHeader = socket.handshake.headers.authorization

    if (!pin) {
        console.warn('Pin missing')
        return
    }

    const token = getToken(socket.handshake.headers.authorization);
    if (!token) {
        throw new Error('Token is missing');
    }
    
    const validation = await validateToken(token);
    if (!validation.ok) {
        throw new Error('Token is not valid');
    }
    
    const parse = parseAzureUserToken(token);
    if (parse.ok) {
      console.log(`Bruker: ${parse.preferred_username} (${parse.NAVident})`);
    }

    socket.join(pin)

    if (hostId) {
        console.log(`Host (${hostId}) joined room ${pin}`)
    } else {
        console.log(`Player (${playerId}) joined room ${pin}`)
    }

    const game = await api.getGameByPin(pin)

    api.getPlayers(pin).then((players: object[]) => {
        sockets.in(pin).emit(OutgoingEvent.PLAYER_JOINED_EVENT, { players })
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

    socket.on(IncomingEvent.TRIGGER_LAST_QUESTION_EVENT, () => {
        console.log('TRIGGER_LAST_QUESTION_EVENT')
        sockets.in(pin).emit(OutgoingEvent.LAST_QUESTION_EVENT, { last: true })
    })

    socket.on('disconnect', async () => {
        if (hostId) {
            console.log(`Host (${hostId}) left room ${pin}`)
        } else {
            console.log(`Player (${playerId}) left room ${pin}`)
            await api.deletePlayer(playerId)
            const event: PlayerLeftEvent = { playerId: playerId }
            sockets.in(pin).emit(OutgoingEvent.PLAYER_LEFT_EVENT, event)
        }
        socket.leave(pin)
    })
}

function getToken(authHeader: string | undefined) {
    if (!authHeader) return null;
    return authHeader.replace('Bearer ', '');
}

