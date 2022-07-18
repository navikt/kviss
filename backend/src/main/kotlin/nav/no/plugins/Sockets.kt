package nav.no.plugins

import io.ktor.serialization.kotlinx.*
import io.ktor.server.application.*
import io.ktor.server.routing.*
import io.ktor.server.websocket.*
import io.ktor.util.reflect.*
import io.ktor.websocket.*
import io.ktor.websocket.serialization.*
import kotlinx.serialization.json.Json
import nav.no.database.domain.Quiz
import nav.no.database.domain.SendAlternative
import nav.no.database.domain.SendQuestion
import nav.no.models.Alternative
import nav.no.models.CreateQuizRequest
import nav.no.models.SocketConnection
import java.time.Duration
import java.util.*
import kotlin.collections.LinkedHashSet

fun Application.configureSockets() {
    install(WebSockets) {
        pingPeriod = Duration.ofSeconds(20)
        timeout = Duration.ofSeconds(20)
        maxFrameSize = Long.MAX_VALUE
        masking = false
        contentConverter = KotlinxWebsocketSerializationConverter(Json)

    }

    routing {
        val connections = Collections.synchronizedSet<SocketConnection?>(LinkedHashSet())
        webSocket("/chat") {
            println("Adding player!")
            val thisConnection = SocketConnection(this)
            connections += thisConnection
            try {
                send("You are connected! There are ${connections.count()} players here.")
                for (frame in incoming) {
                    frame as? Frame.Text ?: continue
                    val receivedText = frame.readText()
                    val textWithUsername = "[${thisConnection.name}]: $receivedText"
                    connections.forEach {
                        it.session.send(textWithUsername)
                        sendSerialized(CreateQuizRequest("test Quiz", "test description"))
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

//val alternatives: List<SendAlternative> = [SendAlternative(1, "alt 1")
//, SendAlternative(1, "alt 1")
//, SendAlternative(1, "alt 1") ]
//fun mockQuestion(): SendQuestion {
//    val tmp: SendQuestion = SendQuestion(
//        1234,
//        "test",
//        List<SendAlternative> = )
//    )
//    return tmp
//}
