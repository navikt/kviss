package nav.no.plugins

import io.ktor.server.routing.*
import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.application.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.server.plugins.cors.routing.*
import nav.no.database.navhootDao.*
import nav.no.routes.*
import java.time.Duration
import nav.no.services.QuizService
import javax.sql.DataSource

fun Application.configureRouting(dataSource: DataSource) {
    install(ContentNegotiation) {
        json()
    }
    install(IgnoreTrailingSlash)
    install(CORS) {
        anyHost()
    }

    val playerDao = PlayerDao(dataSource)
    val quizDao = QuizDao(dataSource)
    val gameDao = GameDao(dataSource)
    val questionDao = QuestionDao(dataSource)
    val alternativesDao = AlternativesDao(dataSource)
    val quizService = QuizService(questionDao, quizDao, alternativesDao)

    routing {
        healthAPI()
        helloWorldRoute()
        dbRoute()
        quizRoute(quizService)
        playerRoute(playerDao)
        gameRoute(gameDao, playerDao)
    }
}
