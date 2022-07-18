package nav.no.plugins

import io.ktor.server.routing.*
import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.application.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.server.plugins.cors.routing.*
import nav.no.database.navhootDao.GameDao
import nav.no.database.navhootDao.PlayerDao
import nav.no.database.navhootDao.QuestionDao
import nav.no.database.navhootDao.QuizDao
import nav.no.routes.*
import java.time.Duration
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

    routing {
        healthAPI()
        helloWorldRoute()
        dbRoute()
        quizRoute(quizDao, questionDao)
        playerRoute(playerDao)
        gameRoute(gameDao, playerDao)
    }
}
