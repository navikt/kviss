package nav.no.sockets

import io.ktor.server.routing.*
import io.ktor.server.websocket.*
import io.ktor.websocket.*
import nav.no.models.Game
import nav.no.models.Player
import nav.no.models.SocketConnection
import nav.no.services.QuizService
import java.util.UUID

fun Routing.gameSocket(connections: MutableSet<SocketConnection>, quizService: QuizService) {
    webSocket("/game/{id}") {
        println("Adding player!")
        val thisConnection = SocketConnection(this, call.parameters["id"]!!.toInt())
        val param = call.parameters["id"]!!.toInt()
        connections += thisConnection
        try {
            send("You are connected to WS ${call.parameters["id"]!!.toLong()}")
            sendPlayers(connections, param)
//            sendSerialized(quizService.getConsumerQuiz(param.toLong()))
            for (frame in incoming) {
                frame as? Frame.Text ?: continue
                val receivedText = frame.readText()
                val textWithUsername = "[${thisConnection.name}]: $receivedText"
                connections.filter { thisConnection.pin == it.pin }.forEach {
                    it.session.send(textWithUsername)
                }
            }
        } catch (e: Exception) {
            println(e.localizedMessage)
        } finally {
            println("Removing $thisConnection!")
            connections -= thisConnection
        }
    }
}

suspend fun sendPlayers(connections: MutableSet<SocketConnection>, pin: Int) {
    val players = connections.filter { it.pin == pin }.map { it.name }
    connections.forEach{
        (it.session as WebSocketServerSession).sendSerialized(players)
    }
}


interface IncomingEvent {
    val player: Player
}

interface OutgoingEvent {
    val game: Game
}

data class JoinGameEvent(
    override val player: Player,
    val pin: Int,
) : IncomingEvent

data class ReceiveAnswerEvent(
    val answerId: Long, // Alternative ID
    override val player: Player
) : IncomingEvent