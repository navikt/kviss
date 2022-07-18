package nav.no.database.navhootDao

import nav.no.database.navhootDao.QueriesQuestions.INSERT_QUESTION
import nav.no.database.navhootDao.QueriesQuestions.SELECT_QUESTION
import nav.no.database.navhootDao.QueriesQuestions.SELECT_QUESTIONS
import nav.no.database.toList
import nav.no.database.domain.Question
import javax.sql.DataSource

class QuestionDao(
    private val dataSource: DataSource,
) {

    fun getQuestion(quizId: Long, id: Long): Question {
        dataSource.connection.use {
            val rs = it.prepareStatement(SELECT_QUESTION)
                .apply {
                    setLong(1, id)
                }
                .executeQuery()
            return if (rs.next()) {
                Question(
                    rs.getLong("id"),
                    rs.getString("description"),
                    rs.getLong("quiz_id"),
                    rs.getInt("sort_order")
                )
            } else {
                throw Exception("The Question does not exist")
            }
        }
    }

    fun getQuestions(quizId: Long): List<Question> {
        dataSource.connection.use {
            return it.prepareStatement(SELECT_QUESTIONS)
                .apply {
                    setLong(1, quizId)
                }
                .executeQuery().toList {
                    Question(
                        getLong("id"),
                        getString("description"),
                        getLong("quiz_id"),
                        getInt("sort_order")
                    )
                }
        }
    }

    fun addQuestions(questions: List<Question>) {
        //TODO: 🤔
        for (question in questions) {
            dataSource.connection.use {
                it.prepareStatement(INSERT_QUESTION).apply {
                    setString(1, question.description)
                    setLong(2, question.quizId)
                    setInt(3, question.sortOrder)
                }.executeQuery()
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

    val INSERT_QUESTION = """
       INSERT INTO question(description, quiz_id, sort_order)
       VALUES (?, ?, ?)
       RETURNING id;
    """.trimIndent()

    val DELETE_QUESTIONS = """
        DELETE FROM question WHERE quiz_id = ?;
    """.trimIndent()

    val DELETE_QUESTION = """
        DELETE FROM question WHERE id = ?;
    """.trimIndent()
}