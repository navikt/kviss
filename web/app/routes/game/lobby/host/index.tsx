import React from 'react'
import LobbyView from '../../../../components/Lobby'
import { useWebSocket } from '../../../../context/SocketContext'
import Button from '../../../../components/common/Button'
import { useGameContext } from '../../../../context/game/GameContext'
import { useNavigate } from 'react-router-dom'
import { ActionTypes } from '../../../../context/game/game'

export default function HostView() {
    const ws = useWebSocket()

    const { state } = useGameContext()
    const navigate = useNavigate()

    const startGame = () => {
        ws?.emit(ActionTypes.START_GAME_EVENT, {
            'hostId': state.hostId
        })
        navigate('/game')
    }

    return (
        <>
            <div className={'flex flex-col justify-center items-center'}>
                <LobbyView/>
                <Button
                    onClick={() => startGame()}>
                    Start Kviss
                </Button>
            </div>
        </>
    )
}