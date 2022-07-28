package nav.no.database.dao

import javax.sql.DataSource
import nav.no.database.dao.QuizDao.Queries.DELETE_QUIZ
import nav.no.database.dao.QuizDao.Queries.POST_QUIZ
import nav.no.database.dao.QuizDao.Queries.SELECT_ALL_QUIZ
import nav.no.database.dao.QuizDao.Queries.SELECT_QUIZ
import nav.no.database.dao.QuizDao.Queries.UPDATE_QUIZ
import nav.no.database.domain.Quiz
import nav.no.database.singleOrNull
import nav.no.database.toList
import nav.no.models.CreateQuizRequest
import nav.no.models.UpdateQuizRequest

class QuizDao(
    private val dataSource: DataSource,
) {
    fun getQuizzes(): List<Quiz> {
        dataSource.connection.use {
            return it.prepareStatement(SELECT_ALL_QUIZ).executeQuery().toList {
                Quiz(
                    getString("name"), getLong("id"), getString("description") ?: ""
                )
            }
        }
    }

    fun getQuiz(id: Long): Quiz {
        dataSource.connection.use {
            val rs = it.prepareStatement(SELECT_QUIZ).apply {
                setLong(1, id)
            }.executeQuery()
            return if (rs.next()) {
                Quiz(
                    rs.getString("name"), rs.getLong("id"), rs.getString("description")
                )
            } else {
                throw Exception("The quiz does not exist")
            }
        }
    }

    fun createQuiz(quiz: CreateQuizRequest): Long = dataSource.connection.use {
        return it.prepareStatement(POST_QUIZ).apply {
            setString(1, quiz.name)
            setString(2, quiz.description)
        }.executeQuery().singleOrNull { getLong(1) }!!
    }


    fun updateQuiz(quiz: UpdateQuizRequest) {
        dataSource.connection.use {
            it.prepareStatement(UPDATE_QUIZ).apply {
                setString(1, quiz.name)
                setString(2, quiz.description)
                setLong(3, quiz.id)
            }.executeUpdate()
        }
    }

    fun deleteQuiz(id: Long) {
        dataSource.connection.use {
            it.prepareStatement(DELETE_QUIZ).apply {
                setLong(1, id)
            }.executeUpdate()
        }
    }

    private object Queries {
        val SELECT_ALL_QUIZ = "SELECT * FROM quiz;"

        val SELECT_QUIZ = "SELECT * FROM quiz WHERE id = ?;"

        val POST_QUIZ = """
            insert into quiz
            (name, description)
            values (
            ?, ?) returning id
        """.trimIndent()

        val UPDATE_QUIZ = """
            UPDATE quiz
            SET name = ?, description = ?
            WHERE id = ?;
        """.trimIndent()

        val DELETE_QUIZ = "DELETE FROM quiz WHERE id = ?;"
    }
}
