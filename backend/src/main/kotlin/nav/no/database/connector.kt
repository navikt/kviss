package nav.no.database

import com.zaxxer.hikari.HikariConfig
import com.zaxxer.hikari.HikariDataSource
import org.flywaydb.core.Flyway
import javax.sql.DataSource


class DataSourceBuilder(private val env: Map<String, String>) {

private val hikariConfig = HikariConfig().apply {
    fun getEnvVar(varName: String, defaultValue: String? = null) =
        System.getenv(varName)
            ?: defaultValue ?: throw RuntimeException("Missing required variable [$varName]")

    jdbcUrl = getEnvVar("DB_JDBC_URL", "jdbc:postgresql://localhost:5432/kviss")
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