package nav.no.database

import java.sql.DriverManager


val dbUser = System.getenv("NAIS_DATABASE_NAVHOOT_BACKEND_USERNAME")
val dbPassword = System.getenv("NAIS_DATABASE_NAVHOOT_BACKEND_PASSWORD")
val dbUrl = System.getenv("NAIS_DATABASE_NAVHOOT_BACKEND_URL")

public fun dbConnect(): Boolean {
    val jdbcUrl = dbUrl

    val connection = DriverManager.getConnection(jdbcUrl)

    return connection.isValid(0)
}