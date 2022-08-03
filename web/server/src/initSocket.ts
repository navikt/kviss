import { Server } from 'socket.io'
import type { Server as HttpServer } from 'http'
import handleEvents from './event-handler'

export default function initSocket(httpServer: HttpServer) {
    const io = new Server(httpServer, {
        path: '/ws',
        cors: {
            // origin: ['https://kviss-vite.dev.intern.nav.no', 'http://127.0.0.1:5173', 'http://localhost:8081'],
            origin: '*', // TODO: Fix before app goes into production
        },
    })

    io.on('connection', (socket) => handleEvents(socket, io.sockets))
}
