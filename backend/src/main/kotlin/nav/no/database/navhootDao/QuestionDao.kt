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
                    emptyList()
                )
            } else {
                throw Exception("The Question does not exist")
            }
        }
    }


    fun getQuestions(quizId: Long): List<Question> {
        return dataSource.connection.use {
            val rs = it.prepareStatement(SELECT_QUESTIONS)
                .apply {
                    setLong(1, quizId)
                }
                .executeQuery()

            return generateSequence {
                if (rs.next())
                    Question(
                        rs.getLong("id"),
                        rs.getString("description"),
                        emptyList()
                    )
                else null
            }.toList()
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
}