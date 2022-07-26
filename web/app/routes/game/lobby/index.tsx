import {useEffect} from 'react'
import Lobby from '~/components/Lobby'
import {useWebSocket} from '~/context/SocketContext'
import {useGameContext} from '~/context/game/GameContext';


export default function PlayerLobbyIndexRoute() {

    const ws = useWebSocket()
    const {state} = useGameContext()

    useEffect(() => {
        console.log(`ws?.readyState: ${ws?.readyState}`)
        console.log(state.player?.name)
        if (ws?.readyState === 1) {
            ws?.send(JSON.stringify({
                'type': 'JOIN_GAME_EVENT',
                'playerName': state.player?.name
            }))
        }
    }, [ws?.readyState])

    return (
        <div className="flex flex-col h-screen justify-center items-center">
            <Lobby></Lobby>
        </div>
    )
}