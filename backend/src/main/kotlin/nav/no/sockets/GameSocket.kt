package nav.no.sockets

import io.ktor.server.routing.*
import io.ktor.server.websocket.*
import io.ktor.websocket.*
import kotlinx.serialization.decodeFromString
import kotlinx.serialization.json.Json
import nav.no.ApplicationContext
import nav.no.models.SocketConnection

fun Routing.gameSocket(
    connections: MutableSet<SocketConnection>,
    context: ApplicationContext
) {
    webSocket("/game/{pin}") {
        println("Adding player!")
        val gamePin = call.parameters["pin"]!!.toInt()
        val thisConnection = SocketConnection(this, gamePin)
        connections += thisConnection

        try {
            send("You are connected to WS ${gamePin}")
            sendPlayers(connections, gamePin)

            val eventHandler = EventHandler(gamePin, context)
            for (frame in incoming) {
                frame as? Frame.Text ?: continue
                val event = Json.decodeFromString<IncomingEvent>(frame.readText())
                connections.sendAllSessionEvent(gamePin, eventHandler.handle(event))
            }
        } catch (e: Exception) {
            println(e.localizedMessage)
        } finally {
            println("Removing $thisConnection!")
            connections -= thisConnection
            connections.sendAllSessionEvent(gamePin, SendPlayerLeft(thisConnection.name))
        }
    }
}