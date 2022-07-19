package nav.no.database.navhootDao

import nav.no.database.navhootDao.QueriesGame.CHECK_GAME_PIN
import nav.no.database.navhootDao.QueriesGame.SELECT_GAME
import nav.no.database.domain.Game
import nav.no.database.navhootDao.QueriesGame.INSERT_GAME
import nav.no.database.singleOrNull
import javax.sql.DataSource

class GameDao(
    private val dataSource: DataSource,
) {

    fun getGame(id: Long): Game {
        return dataSource.connection.use {
            val rs = it.prepareStatement(SELECT_GAME).apply {
                    setLong(1, id)
                }.executeQuery()
            return if (rs.next()) {
                Game(
                    rs.getLong("id"),
                    rs.getLong("quiz_id"),
                    rs.getBoolean("is_active"),
                    rs.getLong("pin"),
                )
            } else {
                throw Exception("The Game does not exist")
            }
        }
    }

    fun insertGame(quizId: Long, pin: Int): Int {
        dataSource.connection.use {
            return it.prepareStatement(INSERT_GAME).apply {
                setLong(1, quizId)
                setBoolean(2, true)
                setInt(3, pin)
            }.executeQuery().singleOrNull { getInt("pin") }!!
        }
    }

    fun checkGamePin(pin: Int): Long {
        dataSource.connection.use {
            return it.prepareStatement(CHECK_GAME_PIN).apply {
                    setInt(1, pin)
                }.executeQuery().singleOrNull { getLong("pin") }!!
        }
    }
}


private object QueriesGame {

    val SELECT_GAME = """
       SELECT * 
       FROM game
       WHERE id = ?;
    """.trimIndent()

    val CHECK_GAME_PIN = """
       SELECT pin 
       FROM game
       WHERE pin = ? AND is_active = True;
    """.trimIndent()

    val INSERT_GAME = """
       INSERT INTO GAME(quiz_id, is_active, pin)
       VALUES (?, ?, ?)
       returning pin;
    """.trimIndent()

}