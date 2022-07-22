package nav.no.services

import nav.no.database.domain.GamePin
import nav.no.database.domain.toModel
import nav.no.database.kvissDao.GameDao
import nav.no.database.kvissDao.PlayerDao
import nav.no.models.Game
import nav.no.models.Quiz
import nav.no.database.kvissDao.AlternativesDao
import nav.no.models.Player

class GameService(
    private val alternativesDao: AlternativesDao,
    private val playerDao: PlayerDao,
    private val gamedao: GameDao,
    private val quizService: QuizService
) {
    companion object {
        private const val MAX_RETRIES = 3
    }

    private fun generatePin(times: Int = MAX_RETRIES): Int {
        val generatedPin = (100000..999999).random()
        val pinExist = gamedao.checkGamePin(generatedPin) != null

        return if (pinExist) {
            if (times > 1) generatePin(times - 1)
            else throw Exception("max number of retries")
        } else generatedPin
    }

    fun createGamePin(): Int = generatePin()

    fun newGame(quiz: Quiz): Game {
//        val game = Game()
        //TODO: generate pin and check if it exists and the game is inactive
        //TODO: add game to DB and return Game object
        //TODO: Start socket session
        return TODO()
    }

    fun gameExist(pin: Int): Boolean = gamedao.getGameByPin(pin)?.isActive ?: false


    fun isCorrect(alternativeId: Long): Boolean {
        return alternativesDao.getAlternative(alternativeId).isCorrect
    }

    fun increasePoint(playerId: Long): Int{
        return playerDao.updateScore(playerId)
    }

    fun checkAnswer(alternativeId: Long, playerId: Long): Int? {
        return if (isCorrect(alternativeId)) {
            increasePoint(playerId)
        } else {
            getPlayer(playerId).score
        }
    }

    fun getPoints(playerId: Long): Int? {
        return playerDao.getPlayer(playerId).score
    }

    fun getGame(id: Long): Game = gamedao.getGame(id).toModel()

    fun getGameByPin(pin: Int): Game = gamedao.getGameByPin(pin)!!.toModel()


    fun getPlayers(gamePin: Int) = playerDao.getPlayers(gamePin)

    fun getPlayer(playerId: Long) = playerDao.getPlayer(playerId)

    fun createPlayer(playerName: String, gamePin: GamePin): Player {
        val game = gamedao.getGameByPin(gamePin)
        if (game?.isActive == true) {
            val playerId = playerDao.insertPlayer(playerName, game.id)
            return Player(playerId, playerName)
        } else throw Exception("Cannot add player to non-existing game")
    }

    fun getQuizByPin(pin: Int) = quizService.getConsumerQuiz(getGameByPin(pin).quizId)

    fun createGame(quizId: Long) : Game {
        val pin = generatePin()
        val id = gamedao.insertGame(quizId, pin)
        return Game(id, quizId, true, pin)
    }

}

