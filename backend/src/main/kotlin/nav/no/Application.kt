package nav.no

import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import io.ktor.server.websocket.*
import nav.no.database.dao.*
import nav.no.plugins.*

fun main() {
    val context = ApplicationContext(System.getenv())
    embeddedServer(Netty, port = 8080, host = "0.0.0.0") {
                configureRouting(context)
            }
            .start(wait = true)
}
