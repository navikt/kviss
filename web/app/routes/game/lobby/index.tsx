import Lobby from '~/components/Lobby'
import {useWebSocket} from '~/context/SocketContext'
import {useGameContext} from '~/context/game/GameContext'
import { useEffect } from 'react'
import { ActionTypes } from '~/context/game/game'
import { useNavigate } from 'react-router-dom'

export default function PlayerLobbyIndexRoute() {
    const ws = useWebSocket()
    const {state} = useGameContext()
    const navigate = useNavigate()

    useEffect(() => {
        if(state.lastEvent === ActionTypes.SEND_QUESTION_EVENT) navigate('../')
    },[state.lastEvent])

    return (
        <div className="flex flex-col h-screen justify-center items-center">
            <Lobby></Lobby>
        </div>
    )
}