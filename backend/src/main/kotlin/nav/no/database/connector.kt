package nav.no.database

import io.ktor.network.sockets.*
import java.sql.DriverManager


val dbUrl = System.getenv("NAIS_DATABASE_NAVHOOT_DB_URL")

public fun dbConnect(): String {
    val jdbcUrl = dbUrl

    val connection = DriverManager.getConnection(jdbcUrl)

    if (connection.isValid(5000)) {
        return "connection is good"
    } else {
        return "connection is bad"
    }
}