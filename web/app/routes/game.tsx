import { Outlet } from '@remix-run/react'
import { useEffect, useState } from 'react'
import { ActionTypes, IQuestion } from '~/context/game/game'
import { useGameContext } from '~/context/game/GameContext'
import SocketContextProvider from '~/context/SocketContext'


export default function GameView() {
    const [socket, setSocket] = useState<WebSocket>()
    const { state, dispatch } = useGameContext()

    useEffect(() => {
        const ws = new WebSocket(`ws://localhost:8080/game/${state.pin}`)

        setSocket(ws)
        return () => { ws.close() }
    }, [])

    useEffect(() => {
        if (!socket) return
        socket.onopen = (event) => {
            console.log(event)
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
            }
            }
        }

    }, [socket])

    return (
        <SocketContextProvider socket={socket}>
            <Outlet />
        </SocketContextProvider>
    )
}



