package nav.no.database.dao

import javax.sql.DataSource
import nav.no.database.dao.QueriesGame.CHECK_GAME_PIN
import nav.no.database.dao.QueriesGame.INSERT_GAME
import nav.no.database.dao.QueriesGame.SELECT_GAME
import nav.no.database.dao.QueriesGame.SELECT_GAME_BY_PIN
import nav.no.database.dao.QueriesGame.UPDATE_TO_FINISHED
import nav.no.database.domain.Game
import nav.no.database.singleOrNull
import java.util.*

class GameDao(
    private val dataSource: DataSource,
) {

    fun getGame(id: Long): Game {
        dataSource.connection.use {
            val rs = it.prepareStatement(SELECT_GAME).apply {
                setLong(1, id)
            }.executeQuery()
            return if (rs.next()) {
                Game(
                    rs.getLong("id"),
                    rs.getLong("quiz_id"),
                    rs.getBoolean("is_active"),
                    rs.getInt("pin")
                )
            } else {
                throw Exception("The Game does not exist")
            }
        }
    }

    fun getGameByPin(pin: Int): Game? {
        dataSource.connection.use {
            return it.prepareStatement(SELECT_GAME_BY_PIN).apply {
                setInt(1, pin)
            }.executeQuery()
                .singleOrNull {
                    Game(
                        getLong("id"),
                        getLong("quiz_id"),
                        getBoolean("is_active"),
                        getInt("pin"),
                    )
                }
        }
    }

    fun insertGame(quizId: Long, pin: Int, hostId: String): Long {
        dataSource.connection.use {
            return it.prepareStatement(INSERT_GAME).apply {
                setLong(1, quizId)
                setBoolean(2, true)
                setInt(3, pin)
            }.executeQuery().singleOrNull { getLong("id") }!!
        }
    }

    fun checkGamePin(pin: Int): Long? {
        dataSource.connection.use {
            return it.prepareStatement(CHECK_GAME_PIN).apply {
                setInt(1, pin)
            }.executeQuery().singleOrNull { getLong("pin") }
        }
    }

    fun setGameFinished(pin: Int) {
        dataSource.connection.use {
            it.prepareStatement(UPDATE_TO_FINISHED).apply {
                setInt(1, pin)
            }.executeQuery()
        }
    }
}


private object QueriesGame {

    val SELECT_GAME = """
       SELECT * 
       FROM game
       WHERE id = ?;
    """.trimIndent()

    val SELECT_GAME_BY_PIN = """
       SELECT * 
       FROM game
       WHERE pin = ?;
    """.trimIndent()

    val CHECK_GAME_PIN = """
       SELECT pin 
       FROM game
       WHERE pin = ? AND is_active = True;
    """.trimIndent()

    val INSERT_GAME = """
       INSERT INTO game(quiz_id, is_active, pin, host_id)
       VALUES (?, ?, ?, ?)
       returning id;
    """.trimIndent()

    val UPDATE_TO_FINISHED = """
       UPDATE game
       SET is_active = FALSE
       WHERE pin = ?
    """.trimIndent()
}
