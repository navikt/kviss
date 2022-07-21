package nav.no.plugins

import io.ktor.serialization.kotlinx.*
import io.ktor.server.application.*
import io.ktor.server.routing.*
import io.ktor.server.websocket.*
import kotlinx.serialization.json.Json
import nav.no.models.SocketConnection
import nav.no.services.QuizService
import nav.no.sockets.gameSocket
import java.time.Duration
import java.util.*
import kotlin.collections.LinkedHashSet

fun Application.configureSockets(quizService: QuizService) {
    install(WebSockets) {
        pingPeriod = Duration.ofSeconds(20)
        timeout = Duration.ofSeconds(20)
        maxFrameSize = Long.MAX_VALUE
        masking = false
        contentConverter = KotlinxWebsocketSerializationConverter(Json)

    }

    routing {
        val connections = Collections.synchronizedSet<SocketConnection?>(LinkedHashSet())
        gameSocket(connections, quizService)
    }
}