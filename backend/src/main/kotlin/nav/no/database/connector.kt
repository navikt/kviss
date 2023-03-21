package nav.no.database

import com.zaxxer.hikari.HikariConfig
import com.zaxxer.hikari.HikariDataSource
import org.flywaydb.core.Flyway
import javax.sql.DataSource


class DataSourceBuilder(private val env: Map<String, String>) {

private val hikariConfig = HikariConfig().apply {
    jdbcUrl = String.format(
        "jdbc:postgresql://%s:%s/%s%s",
        requireNotNull(env["DB_HOST"]) { "database host must be set if jdbc url is not provided" },
        requireNotNull(env["DB_PORT"]) { "database port must be set if jdbc url is not provided" },
        requireNotNull(env["DB_DATABASE"]) { "database name must be set if jdbc url is not provided" },
        env["DB_USERNAME"]?.let { "?user=$it" } ?: "?user=postgres")

    this.username = "postgres"
    env["DB_USERNAME"]?.let { this.username = it }
    env["DB_PASSWORD"]?.let { this.password = it }
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
