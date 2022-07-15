package nav.no.database

import nav.no.database.QueriesGame.SELECT_GAME
import nav.no.models.Game
import javax.sql.DataSource

class GameDao(
    private val dataSource: DataSource,
) {
    fun getGame(gameId: Long): Game {
        return dataSource.connection.use {
            val rs = it.prepareStatement(SELECT_GAME)
                .apply {
                    setLong(1, gameId)
                }
                .executeQuery()
            return if (rs.next()) {
                Game(
                    rs.getLong("id"),
                    rs.getLong("quiz_id"),
                    rs.getBoolean("is_active"),
                )
            } else {
                throw Exception("The Game does not exist")
            }
        }
    }

}


private object QueriesGame {

    val SELECT_GAME = """
       SELECT * 
       FROM game
       WHERE id = ?;
    """.trimIndent()
}