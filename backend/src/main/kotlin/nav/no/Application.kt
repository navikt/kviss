package nav.no

import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import io.ktor.server.websocket.*
import nav.no.database.DataSourceBuilder
import nav.no.plugins.*
import java.time.Duration

fun main() {
//    val datasourceBuilder = DataSourceBuilder(System.getenv())
//    datasourceBuilder.migrate()

    embeddedServer(Netty, port = 8080, host = "0.0.0.0") {
//        configureRouting(datasourceBuilder.dataSource)
        configureSockets()
    }.start(wait = true)
}
