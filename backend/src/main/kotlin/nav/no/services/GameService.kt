package nav.no.services

import nav.no.database.navhootDao.PlayerDao
import nav.no.database.domain.Game
import nav.no.database.domain.Quiz
import nav.no.database.navhootDao.AlternativesDao

class GameService(
    private val alternativesDao: AlternativesDao,
    private val playerDao: PlayerDao
) {

    fun genGamePin(): Int {
        return (10000..99999).random()
    }

    fun checkGamePin(): Boolean {
        return TODO()
    }

    fun newGame(quiz: Quiz): Game {
        //TODO: generate pin and check if it exists and the game is active
        //TODO: add game to DB and return Game object
        //TODO: Start socket session
        return TODO()
    }

    fun isCorrect(alternativeId: Long): Boolean {
        return alternativesDao.getAlternative(alternativeId).isCorrect
    }

    //TODO: If correct, increase the point of the player
    fun getPoints(plauerId: Long): Int{
        return playerDao.getPlayer(plauerId).score
    }
}

