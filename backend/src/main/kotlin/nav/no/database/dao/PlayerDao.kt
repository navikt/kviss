package nav.no.database.dao

import nav.no.database.domain.GamePin
import nav.no.database.dao.QueriesPlayer.INSERT_PLAYER
import nav.no.database.dao.QueriesPlayer.SELECT_PLAYER
import nav.no.database.dao.QueriesPlayer.SELECT_PLAYERS
import nav.no.database.dao.QueriesPlayer.UPDATE_PLAYER_SCORE
import nav.no.database.singleOrNull
import nav.no.models.Player
import javax.sql.DataSource

class PlayerDao(
    private val dataSource: DataSource,
) {
    fun getPlayer(playerId: Long): Player {
        dataSource.connection.use {
            val rs = it.prepareStatement(SELECT_PLAYER).apply {
                setLong(1, playerId)
            }.executeQuery()
            return if (rs.next()) {
                Player(
                    rs.getLong("id"),
                    rs.getString("name"),
                    rs.getInt("score")
                )
            } else {
                throw Exception("No valid player found")
            }
        }
    }
    fun getPlayers(gameId: Int): List<Player> {
        dataSource.connection.use {
            val rs = it.prepareStatement(SELECT_PLAYERS).apply {
                setInt(1, gameId)
            }.executeQuery()
            return generateSequence {
                if (rs.next()) {
                    Player(
                        rs.getLong("id"),
                        rs.getString("name"),
                        rs.getInt("score")
                    )
                } else {
                    throw Exception("No valid player found")
                }
            }.toList()
        }
    }

    fun updateScore(playerId: Long): Int{
        dataSource.connection.use {
            return it.prepareStatement(UPDATE_PLAYER_SCORE).apply {
                setLong(1, playerId)
            }.executeQuery().singleOrNull { getInt("score") }!!
        }
    }

    fun insertPlayer(playerName: String, gameId: Long): Long {
        dataSource.connection.use {
            return it.prepareStatement(INSERT_PLAYER).apply {
                setString(1, playerName)
                setLong(2, gameId)
            }.executeQuery().singleOrNull { getLong("id") }!!
        }
    }
}


private object QueriesPlayer {

    val SELECT_PLAYER = """
        select * 
        from player
        where id = ?;
    """.trimIndent()

    val SELECT_PLAYERS = """
        select * 
        from player
        where pin = ?
    """.trimIndent()

    val UPDATE_PLAYER_SCORE = """
        UPDATE player 
        SET score = score + 1
        WHERE id = ?
        RETURNING score;
    """.trimIndent()

    val INSERT_PLAYER = """
        INSERT INTO player(name, game_id)
        VALUES (?, ?)
        RETURNING id;
    """.trimIndent()


}
