package nav.no.database

import nav.no.database.QueriesQuestions.SELECT_QUESTION
import nav.no.database.QueriesQuestions.SELECT_QUESTIONS
import nav.no.models.Question
import java.sql.ResultSet
import javax.sql.DataSource

class QuestionDao(
    private val dataSource: DataSource,
) {


    fun getQuestion(quizId: Long, id: Long): Question {
        return dataSource.connection.use {
            val rs = it.prepareStatement(SELECT_QUESTION)
                .apply {
                    setLong(1, id)
                }
                .executeQuery()
            return if (rs.next()) {
                Question(
                    rs.getLong("id"),
                    rs.getString("description"),
                    emptyList(),
                    rs.getLong("quiz_id"),
                    rs.getInt("sort_order")
                )
            } else {
                throw Exception("The Question does not exist")
            }
        }
    }


    fun getQuestions(quizId: Long): List<Question> {
        return dataSource.connection.use {
            return it.prepareStatement(SELECT_QUESTIONS)
                .apply {
                    setLong(1, quizId)
                }
                .executeQuery().toList {
                    Question(
                        getLong("id"),
                        getString("description"),
                        emptyList(),
                        getLong("quiz_id"),
                        getInt("sort_order")

                    )
                }
        }
    }

}


private object QueriesQuestions {

    val SELECT_QUESTION = """
       SELECT * 
       FROM question
       WHERE id = ?;
    """.trimIndent()

    val SELECT_QUESTIONS = """
       SELECT * 
       FROM question
       WHERE quiz_id = ?;
    """.trimIndent()

    val INSERT_QUESTIONS = """
       INSERT INTO question(description, quiz_id, sort_order)
       VALUES (?, ?, ?);
    """.trimIndent()

    val DELETE_QUESTIONS = """
        DELETE FROM question WHERE quiz_id = ?;
    """.trimIndent()

    val DELETE_QUESTION = """
        DELETE FROM question WHERE id = ?;
    """.trimIndent()
}