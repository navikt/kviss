import { Socket } from 'socket.io'
import { IncomingEvent } from './events/incoming'
import * as api from './api'
import { OutgoingEvent, SendAlternativesEvent, SendQuestionEvent, ShowAnswersEvent } from './events/outgoing'

export default async function handleEvents(socket: Socket) {
    const { pin, hostId } = socket.handshake.auth

    if (!pin) {
        console.warn('Pin missing')
        return
    }

    const room = `game:${pin}`
    socket.join(room)

    const game = await api.getGameByPin(pin)

    api.getPlayers(pin)
        .then((players: any[]) => {
            socket.in(room).emit(OutgoingEvent.PLAYER_JOINED_EVENT, { players })
        })

    socket.once(IncomingEvent.START_GAME_EVENT, async () => {
        console.log('START_GAME_EVENT')
        if (game.hostId === hostId) {
            const quiz = await api.getQuizById(game.quizId)

            const event: SendQuestionEvent = { question: quiz.questions[0] }
            socket.to(room).emit(OutgoingEvent.SEND_QUESTION_EVENT, event)
        } else {
            socket.emit(OutgoingEvent.SEND_ERROR_EVENT, { errorMessage: 'Invalid host ID' })
        }
    })

    socket.on(IncomingEvent.NEXT_QUESTION_EVENT, async (arg) => {
        console.log('NEXT_QUESTION_EVENT', arg)
        const { questionId } = JSON.parse(arg)

        if (game.hostId === hostId) {
            const question = await api.getQuestionById(questionId)

            const event: SendQuestionEvent = { question }
            socket.to(room).emit(OutgoingEvent.SEND_QUESTION_EVENT, event)
        } else {
            socket.emit(OutgoingEvent.SEND_ERROR_EVENT, { errorMessage: 'Invalid host ID' })
        }
    })

    socket.on(IncomingEvent.LEAVE_GAME_EVENT, () => {
        // TODO
    })

    socket.on(IncomingEvent.SHOW_ALTERNATIVES_EVENT, async (arg) => {
        console.log('SHOW_ALTERNATIVES_EVENT', arg)
        const { questionId } = JSON.parse(arg)

        const question = await api.getQuestionById(questionId)

        const event: SendAlternativesEvent = { alternatives: question.alternatives }
        socket.to(room).emit(OutgoingEvent.SEND_ALTERNATIVES_EVENT, event)
    })

    socket.on(IncomingEvent.SELECT_ANSWER_EVENT, async (arg) => {
        console.log('SELECT_ANSWER_EVENT', arg)

        // TODO
    })

    socket.on(IncomingEvent.END_GAME_EVENT, () => {
        // TODO
    })

    socket.on(IncomingEvent.TRIGGER_ANSWER_EVENT, () => {
        console.log('TRIGGER_ANSWER_EVENT')
        if (game.hostId === hostId) {
            const event: ShowAnswersEvent = { show: true }
            socket.to(room).emit(OutgoingEvent.SHOW_ANSWERS_EVENT, event)
        } else {
            socket.emit(OutgoingEvent.SEND_ERROR_EVENT, { errorMessage: 'Invalid host ID' })
        }
    })


    // FOR TESTING ONLY
    socket.on('SEND_MESSAGE', (arg) => {
        const event = JSON.parse(arg)

        console.log(event)

        socket.broadcast.to(room).emit('MESSAGE_RECEIVED', JSON.stringify({
            ...event
        }))
    })

    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
}
