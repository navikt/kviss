package nav.no

import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import io.ktor.server.websocket.*
import nav.no.database.DataSourceBuilder
import nav.no.database.kvissDao.*
import nav.no.plugins.*
import nav.no.services.GameService
import nav.no.services.QuizService
import java.time.Duration

fun main() {
    val context = ApplicationContext(System.getenv())
    embeddedServer(Netty, port = 8080, host = "0.0.0.0") {
        configureRouting(context)
        configureSockets(context)
    }.start(wait = true)
}
