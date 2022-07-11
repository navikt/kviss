package nav.no

import io.ktor.server.engine.*
import io.ktor.server.netty.*
import nav.no.database.dbConnect
import nav.no.plugins.*
import java.sql.DriverManager

fun main() {
    embeddedServer(Netty, port = 8080, host = "0.0.0.0") {
        configureRouting()
        configureSerialization()
    }.start(wait = true)
}
