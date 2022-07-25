package nav.no.sockets

import nav.no.models.SocketConnection
import io.ktor.server.websocket.*


suspend fun MutableSet<SocketConnection>.sendAllSessionEvent(pin: Int, event: Event) {
    filter { con: SocketConnection ->
        con.pin == pin
    }.forEach {
        (it.session as WebSocketServerSession).sendSerialized(event)
    }
}

suspend fun sendPlayers(connections: MutableSet<SocketConnection>, pin: Int) {
    val players = connections.filter { it.pin == pin }.map { it.name }
    connections.forEach{
        (it.session as WebSocketServerSession).sendSerialized(players)
    }
}
