package nav.no.database

import io.ktor.network.sockets.*
import java.sql.DriverManager


val dbUrl = System.getenv("NAIS_DATABASE_NAVHOOT_BACKEND_NAVHOOT_DB_URL")
fun dbConnect(): String {
    val jdbcUrl = dbUrl

    val connection = DriverManager.getConnection(jdbcUrl)

    return if (connection.isValid(5000)) {
        "connection is good"
    } else {
        "connection is bad"
    }
}