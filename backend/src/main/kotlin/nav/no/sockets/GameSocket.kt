package nav.no.sockets

import io.ktor.network.sockets.*
import io.ktor.server.routing.*
import io.ktor.server.websocket.*
import io.ktor.websocket.*
import kotlinx.serialization.decodeFromString
import kotlinx.serialization.json.Json
import nav.no.ApplicationContext
import nav.no.database.domain.GamePin
import nav.no.models.Game
import nav.no.models.Player
import nav.no.models.SocketConnection
import nav.no.models.Question
import nav.no.services.QuizService
import java.util.UUID

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

//            val event = receiveDeserialized<Event>()

            for (frame in incoming) {
                frame as? Frame.Text ?: continue
                val event = Json.decodeFromString<Event>(frame.readText())
                val eventHandler = EventHandler(event, connections, gamePin, context)
                eventHandler.handle()
                connections.filter { thisConnection.pin == it.pin }.forEach {
//                    it.session.send(textWithUsername)
                }
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