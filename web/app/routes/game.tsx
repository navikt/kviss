import { Outlet } from "@remix-run/react";
import { useEffect, useState } from "react";
import SocketContextProvider from "~/context/SocketContext";
//import WebSocket from "ws"




export default function GameView() {
    const [socket, setSocket] = useState<WebSocket>()

    useEffect(() => {
        const ws = new WebSocket(`ws://localhost:8080/game/1`);

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



