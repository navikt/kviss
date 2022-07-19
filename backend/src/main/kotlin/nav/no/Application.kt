package nav.no

import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import io.ktor.server.websocket.*
import nav.no.database.DataSourceBuilder
import nav.no.database.navhootDao.*
import nav.no.plugins.*
import nav.no.services.GameService
import nav.no.services.QuizService
import java.time.Duration

fun main() {
    val datasourceBuilder = DataSourceBuilder(System.getenv())
    datasourceBuilder.migrate()
    val quizService = QuizService(
        QuestionDao(datasourceBuilder.dataSource),
        QuizDao(datasourceBuilder.dataSource),
        AlternativesDao(datasourceBuilder.dataSource)
    )
    val gameService = GameService(
        AlternativesDao(datasourceBuilder.dataSource),
        PlayerDao(datasourceBuilder.dataSource),
        GameDao(datasourceBuilder.dataSource),
        quizService
    )

    embeddedServer(Netty, port = 8080, host = "0.0.0.0") {
        configureRouting(datasourceBuilder.dataSource)
        configureSockets(quizService, gameService)
    }.start(wait = true)
}
