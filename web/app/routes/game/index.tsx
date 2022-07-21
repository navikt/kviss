import { useEffect } from "react"
import { useWebSocket } from "~/context/SocketContext"


export default function QuizView() {

    const ws = useWebSocket()

    const send = () => {
        ws?.send("Hello")
    }

    return (
        <div className="flex flex-col h-screen justify-center items-center">
            <button onClick={send}>
                send2
            </button>
        </div>
    )
}