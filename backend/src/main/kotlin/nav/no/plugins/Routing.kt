package nav.no.plugins

import io.ktor.http.*
import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.application.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.server.plugins.cors.routing.*
import io.ktor.server.routing.*
import javax.sql.DataSource
import nav.no.database.navhootDao.GameDao
import nav.no.database.navhootDao.PlayerDao
import nav.no.database.navhootDao.QuestionDao
import nav.no.database.navhootDao.QuizDao
import nav.no.database.navhootDao.*
import nav.no.routes.*

import nav.no.services.GameService
import nav.no.services.QuizService


fun Application.configureRouting(dataSource: DataSource) {
    install(ContentNegotiation) { json() }
    install(IgnoreTrailingSlash)
    install(CORS) {
        anyHost()
        allowHeader(HttpHeaders.ContentType)
    }

    val playerDao = PlayerDao(dataSource)
    val quizDao = QuizDao(dataSource)
    val gameDao = GameDao(dataSource)
    val questionDao = QuestionDao(dataSource)
    val alternativesDao = AlternativesDao(dataSource)
    val quizService = QuizService(questionDao, quizDao, alternativesDao)
    val gameService = GameService(alternativesDao, playerDao, gameDao, quizService)

    routing {
        healthAPI()
        helloWorldRoute()
        dbRoute()
        quizRoute(quizService)
        playerRoute(gameService)
        gameRoute(gameService)
    }
}
