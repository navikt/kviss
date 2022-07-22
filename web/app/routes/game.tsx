import { Outlet } from "@remix-run/react";
import { useEffect, useState } from "react";
import { useGameContext } from "~/context/GameContext";
import SocketContextProvider from "~/context/SocketContext";
//import WebSocket from "ws"




export default function GameView() {
    const [socket, setSocket] = useState<WebSocket>()
    const { gameProps } = useGameContext()

    useEffect(() => {
        const ws = new WebSocket(`ws://localhost:8080/game/${gameProps.pincode}`);

        setSocket(ws)
        return () => { ws.close() }
    }, [])

    useEffect(() => {
        if (!socket) return;
        socket.onopen = (event) => {
            console.log(event)
        };
        socket.onmessage = (event) => {
            console.log(event)
        };

    }, [socket])

    return (
        <SocketContextProvider socket={socket}>
            <Outlet />
        </SocketContextProvider>
    )
}



