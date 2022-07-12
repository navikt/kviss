package nav.no.database

import io.ktor.network.sockets.*
import java.sql.DriverManager


val dbUrl = System.getenv("NAIS_DATABASE_NAVHOOT_BACKEND_NAVHOOT_DB_URL")
fun dbConnect(): String {
    val connection = DriverManager.getConnection(dbUrl)?: String.format(
        "jdbc:postgresql://%s:%s/%s%s",
        requireNotNull(System.getenv("NAIS_DATABASE_NAVHOOT_BACKEND_NAVHOOT_DB_HOST")) { "database host must be set if jdbc url is not provided" },
        requireNotNull(System.getenv("NAIS_DATABASE_NAVHOOT_BACKEND_NAVHOOT_DB_PORT")) { "database port must be set if jdbc url is not provided" },
        requireNotNull(System.getenv("NAIS_DATABASE_NAVHOOT_BACKEND_NAVHOOT_DB_URL")) { "database name must be set if jdbc url is not provided" },
        System.getenv("DB_USERNAME")?.let { "?user=$it" } ?: "")
    return connection.toString()
}