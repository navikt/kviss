import {Outlet} from '@remix-run/react'
import {useEffect, useState} from 'react'
import {ActionTypes} from '~/context/game/game'
import {useGameContext} from '~/context/game/GameContext'
import { IQuestion } from '~/context/QuizContext'
import SocketContextProvider from '~/context/SocketContext'

export default function GameView() {
    const [socket, setSocket] = useState<WebSocket>()
    const {state, dispatch} = useGameContext()

    useEffect(() => {
        // @ts-ignore
        const ws = new WebSocket(`${window.env.WS_URL}/game/${state.pin}`)

        setSocket(ws)
        return () => {
            console.log('ws.close()')
            ws.close()
        }
    }, [])

    useEffect(() => {
        if (!socket) return
        socket.onopen = (event) => {
            console.log(event)

            if (state.player) {
                socket.send(JSON.stringify({
                    'type': 'JOIN_GAME_EVENT',
                    'playerName': state.player?.name
                }))
            }
        }

        socket.onmessage = (event) => {
            console.log(event.data)

            const type: string = JSON.parse(event.data).type

            switch (type) {
            case ActionTypes.SEND_QUESTION_EVENT: {
                dispatch({
                    type: ActionTypes.SEND_QUESTION_EVENT,
                    payload: JSON.parse(event.data).question as IQuestion
                })
                dispatch({
                    type: ActionTypes.SET_LAST_EVENT,
                    payload: ActionTypes.SEND_QUESTION_EVENT
                })
                break
            }
            case ActionTypes.SET_PINCODE: {
                dispatch({type: ActionTypes.SET_PINCODE, payload: event.data.playerName})
                break
            }
            case ActionTypes.PLAYER_JOINED_EVENT: {
                dispatch({
                    type: ActionTypes.PLAYER_JOINED_EVENT,
                    payload: JSON.parse(event.data).playerName as string
                })
                break
            }
            case ActionTypes.SEND_ANSWER_EVENT: {
                dispatch({
                    type: ActionTypes.SEND_ANSWER_EVENT,
                    payload: JSON.parse(event.data).score as number
                })
                if (!state.hostId) {
                    dispatch({
                        type: ActionTypes.SET_LAST_EVENT,
                        payload: ActionTypes.SEND_ANSWER_EVENT
                    })
                }
                break 
            }
            }
        }

        socket.onclose = () => {
            // do something ... ?
        }

    }, [socket])

    return (
        <SocketContextProvider socket={socket}>
            <Outlet/>
        </SocketContextProvider>
    )
}



