import React from 'react'
import { useEffect, useState } from 'react'
import { ActionTypes, IAnswerEvent, IPlayer } from '../context/game/game'
import { useGameContext } from '../context/game/GameContext'
import { IQuestion } from '../context/QuizContext'
import SocketContextProvider from '../context/SocketContext'
import { Outlet } from 'react-router-dom'
import { io, Socket } from 'socket.io-client'

const getUrl = () => {
    if (process.env.NODE_ENV === 'production') return `${location.protocol}//${location.host}`
    else return process.env.WS_URL || `${location.protocol}//${location.host}`
}

export default function GameView() {
    const [socket, setSocket] = useState<Socket>()
    const { state, dispatch } = useGameContext()

    useEffect(() => {
        if (!!socket || !state.pin) return

        const url = getUrl()

        const ws = io(url, {
            path: '/ws',
            auth: {
                pin: state.pin,
                hostId: state.hostId,
                playerId: state.player?.id,
            },
            transports: ['polling'],
        })

        setSocket(ws)

        return () => {
            ws.close()
        }
    }, [setSocket])

    useEffect(() => {
        if (!socket) return

        socket.on('connect', () => {
            console.log('user connected')
        })

        socket.on('SEND_QUESTION_EVENT', (arg) => {
            console.log('SEND_QUESTION_EVENT: ', arg)

            dispatch({
                type: ActionTypes.SEND_QUESTION_EVENT,
                payload: arg.question as IQuestion,
            })

            dispatch({
                type: ActionTypes.SET_LAST_EVENT,
                payload: ActionTypes.SEND_QUESTION_EVENT,
            })
        })

        socket.on('PLAYER_JOINED_EVENT', (arg) => {
            console.log('PLAYER_JOINED_EVENT: ', arg)
            dispatch({
                type: ActionTypes.PLAYER_JOINED_EVENT,
                payload: arg.players as IPlayer[],
            })
        })

        socket.on('SEND_ANSWER_EVENT', (arg) => {
            console.log('SEND_ANSWER_EVENT: ', arg)
            if (state.hostId) {
                dispatch ({
                    type: ActionTypes.PLAYER_ANSWERED_EVENT,
                    payload: true,
                })
            }
            if (state.player?.id === (arg.playerId as number)) {
                dispatch({
                    type: ActionTypes.IS_QUESTION_CORRECT,
                    payload: arg.correct as boolean,
                })
                if (!state.hostId) {
                    dispatch({
                        type: ActionTypes.SET_LAST_EVENT,
                        payload: ActionTypes.HAS_ANSWERED_EVENT,
                    })
                }
            }
        })

        socket.on('SHOW_ANSWERS_EVENT', (arg) => {
            console.log('SHOW_ANSWERS_EVENT: ', arg)
            if (!state.hostId) {
                dispatch({
                    type: ActionTypes.SET_LAST_EVENT,
                    payload: ActionTypes.SHOW_ANSWERS_EVENT,
                })
            }
        })

        socket.on('UPDATE_PLAYER_LIST_EVENT', (arg) => {
            console.log('UPDATE_PLAYER_LIST_EVENT: ', arg)
            dispatch({
                type: ActionTypes.UPDATE_PLAYER_LIST_EVENT,
                payload: arg.players as IPlayer[]
            })
        })

        socket.on('PLAYER_LEFT_EVENT', (arg) => {
            console.log('PLAYER_LEFT_EVENT: ', arg)
            dispatch({
                type: ActionTypes.PLAYER_LEFT_EVENT,
                payload: arg as number,
            })
            dispatch({
                type: ActionTypes.PLAYER_ANSWERED_EVENT,
                payload: true
            })
            if (state.hostId) {
                socket.emit(ActionTypes.TRIGGER_UPDATE_PLAYER_LIST_EVENT, {
                    'hostId': state.hostId
                })
            }
        })

        socket.on('LAST_QUESTION_EVENT', (arg) => {
            console.log('LAST_QUESTION_EVENT: ', arg)

            if (!state.hostId) {
                dispatch({
                    type: ActionTypes.SET_LAST_EVENT,
                    payload: ActionTypes.LAST_QUESTION_EVENT,
                })
            }
        })

        socket.on('disconnect', () => {
            console.log('user disconnected')
        })
    }, [socket])

    return (
        <SocketContextProvider socket={socket}>
            <Outlet />
        </SocketContextProvider>
    )
}
