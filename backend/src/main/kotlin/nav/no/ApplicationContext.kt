package nav.no

import nav.no.database.DataSourceBuilder
import nav.no.database.navhootDao.AlternativesDao
import nav.no.database.navhootDao.GameDao
import nav.no.database.navhootDao.PlayerDao
import nav.no.database.navhootDao.QuestionDao
import nav.no.database.navhootDao.QuizDao

import nav.no.services.GameService
import nav.no.services.QuizService

class ApplicationContext(private val env: Map<String, String>) {
    val quizService: QuizService
    val gameService: GameService
    init {

        val datasourceBuilder = DataSourceBuilder(System.getenv())
        datasourceBuilder.migrate()
        val dataSource = datasourceBuilder.dataSource

        val playerDao = PlayerDao(dataSource)
        val quizDao = QuizDao(dataSource)
        val gameDao = GameDao(dataSource)
        val questionDao = QuestionDao(dataSource)
        val alternativesDao = AlternativesDao(dataSource)
        quizService = QuizService(questionDao, quizDao, alternativesDao)
        gameService = GameService(alternativesDao, playerDao, gameDao, quizService)
    }
}