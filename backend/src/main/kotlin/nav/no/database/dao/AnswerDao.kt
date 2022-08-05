package nav.no.database.dao

import javax.sql.DataSource

class AnswerDao (
    private val dataSource: DataSource,
) {

    fun insertPlayerAnswer(alternativeId: Long, gameId: Long, playerId: Long) {
        dataSource.connection.use {
            it.prepareStatement(QueriesAnswer.INSERT_PLAYER_ANSWER).apply {
                setLong(1, alternativeId)
                setLong(2, gameId)
                setLong(3, playerId)
            }.executeUpdate()
        }
    }
}

private object QueriesAnswer {

    val INSERT_PLAYER_ANSWER = """
       INSERT INTO player_answer(alternative_id, game_id, player_id, time_answered)
       VALUES (?, ?, ?, NOW())
    """.trimIndent()

}