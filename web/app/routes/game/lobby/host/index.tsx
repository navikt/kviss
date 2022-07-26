import Lobby from '~/components/Lobby'
import {useWebSocket} from '~/context/SocketContext'
import LobbyView from '~/components/Lobby'
import Button from '~/components/common/Button'

export default function HostView() {
    const ws = useWebSocket()

    const startGame = () => {
        ws?.send(JSON.stringify({
            'type': 'START_GAME_EVENT',
            'hostId': 40
        }))

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