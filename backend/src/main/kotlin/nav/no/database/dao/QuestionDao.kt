package nav.no.database.dao

import javax.sql.DataSource
import nav.no.database.dao.QueriesQuestions.INSERT_QUESTION
import nav.no.database.dao.QueriesQuestions.SELECT_QUESTION
import nav.no.database.dao.QueriesQuestions.SELECT_QUESTIONS
import nav.no.database.domain.Question
import nav.no.database.singleOrNull
import nav.no.database.toList
import nav.no.models.CreateQuestion

class QuestionDao(
        private val dataSource: DataSource,
) {

    fun getQuestion(id: Long): Question? {
        dataSource.connection.use {
            return it.prepareStatement(SELECT_QUESTION)
                    .apply { setLong(1, id) }
                    .executeQuery()
                    .singleOrNull {
                        Question(
                                getLong("id"),
                                getString("description"),
                                getLong("quiz_id"),
                                getInt("sort_order")
                        )
                    }
        }
    }

    fun getQuestions(quizId: Long): List<Question> {
        dataSource.connection.use {
            return it.prepareStatement(SELECT_QUESTIONS)
                    .apply { setLong(1, quizId) }
                    .executeQuery()
                    .toList {
                        Question(
                                getLong("id"),
                                getString("description") ?: "",
                                getLong("quiz_id"),
                                getInt("sort_order")
                        )
                    }
        }
    }

    fun addQuestion(question: CreateQuestion): Long =
            dataSource.connection.use {
                return it.prepareStatement(INSERT_QUESTION)
                        .apply {
                            setString(1, question.description)
                            setLong(2, question.quizId)
                            setInt(3, question.sortOrder)
                        }
                        .executeQuery()
                        .singleOrNull { getLong("id") }!!
            }
}

private object QueriesQuestions {

    val SELECT_QUESTION = "SELECT * FROM question WHERE id = ?;"

    val SELECT_QUESTIONS = "SELECT * FROM question WHERE quiz_id = ?;"

    val INSERT_QUESTION = """
       INSERT INTO question(description, quiz_id, sort_order)
       VALUES (?, ?, ?)
       RETURNING id;
    """.trimIndent()

    val DELETE_QUESTIONS = "DELETE FROM question WHERE quiz_id = ?;"

    val DELETE_QUESTION = "DELETE FROM question WHERE id = ?;"

}
