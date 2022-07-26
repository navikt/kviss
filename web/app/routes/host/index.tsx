import LobbyView from '~/components/Lobby'
import { useWebSocket } from '~/context/SocketContext'


export default function HostView() {

    const ws = useWebSocket()

    const send = () => {
        ws?.send('Hello')
    }

    return (
        <div className="flex flex-col h-screen justify-center items-center">
            <LobbyView />
            <button onClick={send}>
                send2
            </button>
        </div>
    )
}