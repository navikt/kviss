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
    webSocket("/chat/{id}") {
        println("Adding player!")
        val thisConnection = SocketConnection(this, call.parameters["id"]!!.toInt())
        val param = call.parameters["id"]!!.toInt()
        val isHost = connections.singleOrNull { it.pin == param }
        connections += thisConnection
        try {
            send("You are connected to WS ${call.parameters["id"]!!.toLong()}")
//            sendSerialized(quizService.getConsumerQuiz(param.toLong()))
            sendPlayer(this, connections, param)

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

fun generateHostId(gamePin: Int): Int {
    val hostid = (100000..999999).random()


    return hostid
}

suspend fun sendPlayer(session: DefaultWebSocketServerSession, connections: MutableSet<SocketConnection>, pin: Int) {
    connections.filter { it.pin == pin }.forEach {
        session.send(it.name)
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