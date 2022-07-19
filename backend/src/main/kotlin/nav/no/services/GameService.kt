package nav.no.services

import nav.no.database.domain.toModel
import nav.no.database.navhootDao.GameDao
import nav.no.database.navhootDao.PlayerDao
import nav.no.models.Game
import nav.no.models.Quiz
import nav.no.database.navhootDao.AlternativesDao

class GameService(
    private val alternativesDao: AlternativesDao,
    private val playerDao: PlayerDao,
    private val gamedao: GameDao
) {
    companion object {
        private const val MAX_RETRIES = 3
    }

    private fun generatePin(times: Int = MAX_RETRIES): Int {
        val generatedPin = (100000..999999).random()
        val pinExist = gamedao.getGamePin(generatedPin) != null

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

    fun isCorrect(alternativeId: Long): Boolean {
        return alternativesDao.getAlternative(alternativeId).isCorrect
    }

    fun increasePoint(playerId: Long): Int{
        return playerDao.updateScore(playerId)
    }

    fun checkAnswer(alternativeId: Long, playerId: Long): Int {
        if (isCorrect(alternativeId)) {
            return increasePoint(playerId)
        } else {
            return getPlayer(playerId).score
        }
    }

    fun getPoints(playerId: Long): Int{
        return playerDao.getPlayer(playerId).score
    }

    fun getGame(id: Long): Game = gamedao.getGame(id).toModel()

    fun getGamePin(id: Int) = gamedao.getGamePin(id)

    fun getPlayers(gameId: Long) = playerDao.getPlayers(gameId)

    fun getPlayer(playerId: Long) = playerDao.getPlayer(playerId)


}

