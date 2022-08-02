import { Server } from 'socket.io'
import type { Server as HttpServer } from 'http'
import handleEvents from './event-handler'

export default function initSocket(httpServer: HttpServer) {
    const io = new Server(httpServer, {
        path: '/ws',
        cors: {
            origin: ['https://kviss-vite.dev.intern.nav.no', 'http://127.0.0.1:5173']
        }
    })

    io.on('connection', handleEvents)
}
