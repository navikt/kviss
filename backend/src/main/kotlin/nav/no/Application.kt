package nav.no

import io.ktor.server.engine.*
import io.ktor.server.netty.*
import nav.no.database.DataSourceBuilder
import nav.no.plugins.*
import java.sql.DriverManager

fun main() {
    val datasourceBuilder = DataSourceBuilder(System.getenv())
    datasourceBuilder.migrate()
//    val db = datasourceBuilder.dataSource

    embeddedServer(Netty, port = 8080, host = "0.0.0.0") {
        configureRouting()
    }.start(wait = true)
}
