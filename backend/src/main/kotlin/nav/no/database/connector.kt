package nav.no.database

import com.zaxxer.hikari.HikariConfig
import com.zaxxer.hikari.HikariDataSource
import io.ktor.network.sockets.*
import org.flywaydb.core.Flyway
import java.sql.DriverManager
import javax.sql.DataSource


class DataSourceBuilder(private val env: Map<String, String>) {

private val hikariConfig = HikariConfig().apply {
    jdbcUrl = String.format(
        "jdbc:postgresql://%s:%s/%s%s",
        requireNotNull(env["NAIS_DATABASE_NAVHOOT_BACKEND_NAVHOOT_DB_HOST"]) { "database host must be set if jdbc url is not provided" },
        requireNotNull(env["NAIS_DATABASE_NAVHOOT_BACKEND_NAVHOOT_DB_PORT"]) { "database port must be set if jdbc url is not provided" },
        requireNotNull(env["NAIS_DATABASE_NAVHOOT_BACKEND_NAVHOOT_DB_DATABASE"]) { "database name must be set if jdbc url is not provided" },
        env["NAIS_DATABASE_NAVHOOT_BACKEND_NAVHOOT_DB_USERNAME"]?.let { "?user=$it" } ?: "")

    env["NAIS_DATABASE_NAVHOOT_BACKEND_NAVHOOT_DB_USERNAME"]?.let { this.username = it }
    env["NAIS_DATABASE_NAVHOOT_BACKEND_NAVHOOT_DB_PASSWORD"]?.let { this.password = it }
}
    val dataSource: DataSource
    init {
        dataSource = HikariDataSource(hikariConfig)
    }
    fun migrate() =  runMigration(dataSource)


    private fun runMigration(dataSource: DataSource) =
        Flyway.configure()
            .dataSource(dataSource)
            .load()
            .migrate()
}
