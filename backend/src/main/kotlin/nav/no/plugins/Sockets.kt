package nav.no.plugins

import io.ktor.serialization.kotlinx.*
import io.ktor.server.application.*
import io.ktor.server.routing.*
import io.ktor.server.websocket.*
import io.ktor.websocket.*
import kotlinx.serialization.json.Json
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
        webSocket("/chat/{id}") {
            println("Adding player!")
            val thisConnection = SocketConnection(this, call.parameters["id"]!!.toInt())
            connections += thisConnection
            try {
                send("You are connected to WS ${call.parameters["id"]!!.toInt()}")
                for (frame in incoming) {
                    frame as? Frame.Text ?: continue
                    val receivedText = frame.readText()
                    val textWithUsername = "[${thisConnection.name}]: $receivedText"
                    connections.filter { thisConnection.id == it.id }.forEach {
                        println(frame)
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