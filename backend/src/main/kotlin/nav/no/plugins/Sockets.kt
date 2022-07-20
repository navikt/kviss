package nav.no.plugins

import io.ktor.serialization.kotlinx.*
import io.ktor.server.application.*
import io.ktor.server.routing.*
import io.ktor.server.websocket.*
import io.ktor.websocket.*
import kotlinx.serialization.json.Json
import nav.no.models.*
import nav.no.services.GameService
import nav.no.services.QuizService
import java.time.Duration
import java.util.*
import kotlin.collections.LinkedHashSet

fun Application.configureSockets(quizService: QuizService, gameService: GameService) {
    install(WebSockets) {
        pingPeriod = Duration.ofSeconds(20)
        timeout = Duration.ofSeconds(20)
        maxFrameSize = Long.MAX_VALUE
        masking = false
        contentConverter = KotlinxWebsocketSerializationConverter(Json)

    }


    routing {
        val connections = Collections.synchronizedSet<SocketConnection?>(LinkedHashSet())
        webSocket("/game/{pin}") {
            println("Adding player!")

            val conPin: Int = call.parameters["pin"]!!.toInt()
            val quiz: ConsumerQuiz = gameService.getQuizByPin(conPin)
            fun isHost (): Boolean = connections.filter {it.pin == conPin}.isEmpty()
            fun host (): SocketConnection = connections.first()
            val thisConnection = SocketConnection(this, conPin, isHost())
            connections += thisConnection
            val consumerPlayer = receiveDeserialized<ConsumerPlayer>()
            if (!thisConnection.isHost) host().session.send(thisConnection.session.incoming.receive())

            try {
                send("You are connected to game ${conPin}")
//                sendSerialized(quizService.getConsumerQuiz(param))

                for (frame in incoming) {
                    frame as? Frame.Text ?: continue
                    val receivedText = frame.readText()
                    val textWithUsername = "[${thisConnection.name}]: $receivedText"
                    connections.filter { it.isHost }.forEach {
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
}