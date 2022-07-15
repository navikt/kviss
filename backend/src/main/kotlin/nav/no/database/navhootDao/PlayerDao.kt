package nav.no.database

import nav.no.database.QueriesPlayer.SELECT_PLAYER
import nav.no.models.Player
import javax.sql.DataSource

class PlayerDao(
    private val dataSource: DataSource,
) {
    fun getPayer(playerId: Long): Player {
        return dataSource.connection.use {
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
}


private object QueriesPlayer {

    val SELECT_PLAYER = """
        select * 
        from player
        where id = ?;
    """.trimIndent()




}
