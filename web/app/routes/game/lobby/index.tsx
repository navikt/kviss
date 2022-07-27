import Lobby from '~/components/Lobby'
import {useWebSocket} from '~/context/SocketContext'
import {useGameContext} from '~/context/game/GameContext';

export default function PlayerLobbyIndexRoute() {
    const ws = useWebSocket()
    const {state} = useGameContext()

    return (
        <div className="flex flex-col h-screen justify-center items-center">
            <Lobby></Lobby>
        </div>
    )
}