package nav.no.plugins

import io.ktor.server.routing.*
import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.application.*
import io.ktor.server.plugins.contentnegotiation.*
import nav.no.database.GameDao
import nav.no.database.PlayerDao
import nav.no.database.QuestionDao
import nav.no.database.QuizDao
import nav.no.routes.*
import javax.sql.DataSource

fun Application.configureRouting(dataSource: DataSource) {
    install(ContentNegotiation) {
        json()
    }
    install(IgnoreTrailingSlash)

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
