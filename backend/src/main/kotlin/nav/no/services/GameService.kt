package nav.no.services

import nav.no.database.dao.AlternativesDao
import nav.no.database.dao.AnswerDao
import nav.no.database.dao.GameDao
import nav.no.database.dao.PlayerDao
import nav.no.database.domain.GamePin
import nav.no.database.domain.toModel
import nav.no.models.Game
import nav.no.models.Player
import nav.no.models.Scoreboard
import java.util.UUID

class GameService(
    private val alternativesDao: AlternativesDao,
    private val playerDao: PlayerDao,
    private val gameDao: GameDao,
    private val quizService: QuizService,
    private val answerDao: AnswerDao
) {
    companion object {
        private const val MAX_RETRIES = 3
    }

    private fun generatePin(times: Int = MAX_RETRIES): Int {
        val generatedPin = (100000..999999).random()
        val pinExist = gameDao.checkGamePin(generatedPin) != null

        return if (pinExist) {
            if (times > 1) generatePin(times - 1) else throw Exception("max number of retries")
        } else generatedPin
    }

    fun createGamePin(): Int = generatePin()

    fun gameExist(pin: Int): Boolean = gameDao.getGameByPin(pin)?.isActive ?: false

    fun setGameFinished(gamePin: GamePin) = gameDao.setGameFinished(gamePin)

    private fun isCorrect(alternativeId: Long): Boolean {
        return alternativesDao.getAlternative(alternativeId).isCorrect
    }



    fun checkAnswer(alternativeId: Long, gameId: Long, playerId: Long): Boolean {
        if (isCorrect(alternativeId)) {
            answerDao.insertPlayerAnswer(alternativeId, gameId, playerId)
            val currentAnswers = gameDao.getPlayerAnswers(alternativeId, gameId)
            currentAnswers.forEachIndexed{ i, answer ->
                run {
                    if (answer.playerId === playerId) {
                        if (i < 15) {
                            println("Giving score to player: " + answer.playerId + " Index is: " + i )
                            playerDao.updateScore(1000 - (i * 50), playerId)
                        } else {
                            playerDao.updateScore(1000 - (15 * 50), playerId)
                        }
                    }
                }
            }
            return true
        }
        return false
    }

    fun getPoints(playerId: Long): Int? {
        return playerDao.getPlayer(playerId).score
    }

    fun getGameByPin(pin: Int): Game? = gameDao.getGameByPin(pin)?.toModel()

    fun getPlayers(gamePin: Int) = playerDao.getPlayersByPin(gamePin)

    fun getPlayer(playerId: Long) = playerDao.getPlayer(playerId)

    fun createPlayer(playerName: String, gamePin: GamePin): Player {
        if (getPlayers(gamePin).any { it.name == playerName })
            throw Exception("Playername is taken")

        val game = gameDao.getGameByPin(gamePin)

        if (game?.isActive == true) {
            val playerId = playerDao.insertPlayer(playerName, game.id)
            return Player(playerId, playerName)
        } else throw Exception("Cannot add player to non-existing game")
    }

    fun deletePlayer(playerId: Long): Int {
        return playerDao.deletePlayer(playerId)
    }

    fun getQuizByPin(pin: Int) = quizService.getConsumerQuiz(getGameByPin(pin)!!.quizId)

    fun createGame(quizId: Long): Game {
        val pin = generatePin()
        val hostId = UUID.randomUUID().toString()
        val id = gameDao.insertGame(quizId, pin, hostId)
        return Game(id, quizId, true, pin, hostId)
    }


    fun getScoreboard(gamePin: GamePin): Scoreboard {
        return Scoreboard(gamePin, playerDao.getPlayersByPin(gamePin))
    }
}
