import Lobby from '~/components/Lobby'
import {useWebSocket} from '~/context/SocketContext'
import LobbyView from '~/components/Lobby'
import Button from '~/components/common/Button'
import { useGameContext } from '~/context/game/GameContext'
import { useNavigate } from 'react-router-dom'
import { ActionTypes } from '~/context/game/game'

export default function HostView() {
    const ws = useWebSocket()

    const { state } = useGameContext()
    const navigate = useNavigate()

    const startGame = () => {
        ws?.send(JSON.stringify({
            'type': ActionTypes.START_GAME_EVENT,
            'hostId': state.hostId
        }))
        navigate('../')

    }

    return (
        <>
            <div className={'flex flex-col h-screen justify-center items-center'}>
                <LobbyView/>
                <Button
                    onClick={() => startGame()}>
                    Start quiz
                </Button>
            </div>
        </>
    )
}