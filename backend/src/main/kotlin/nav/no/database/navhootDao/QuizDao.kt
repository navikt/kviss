package nav.no.database

import nav.no.database.QuizDao.Queries.POST_QUIZ
import nav.no.database.QuizDao.Queries.SELECT_ALL_QUIZ
import nav.no.database.QuizDao.Queries.SELECT_QUIZ
import nav.no.models.Quiz
import java.sql.ResultSet
import javax.sql.DataSource

class QuizDao(
    private val dataSource: DataSource,
) {
    fun getQuizzes(): List<Quiz> {
        return dataSource.connection.use {
            return it.prepareStatement(SELECT_ALL_QUIZ).executeQuery().toList {
                Quiz(
                    getString("name"), getLong("id"), getString("description"), emptyList()
                )
            }
        }
    }

    fun getQuiz(id: Long): Quiz {
        return dataSource.connection.use {
            val rs = it.prepareStatement(SELECT_QUIZ).apply {
                    setLong(1, id)
                }.executeQuery()
            return if (rs.next()) {
                Quiz(
                    rs.getString("name"), rs.getLong("id"), rs.getString("description"), emptyList()
                )
            } else {
                throw Exception("The quiz does not exist")
            }
        }
    }

    fun postQuiz(quiz: Quiz): Long = dataSource.connection.use {
        return it.prepareStatement(POST_QUIZ).apply {
                setString(1, quiz.name)
                setString(2, quiz.description)
                setBoolean(3, false)
            }.executeQuery().singleOrNull { getLong(1) }!!
    }


    private fun <T> ResultSet.singleOrNull(block: ResultSet.() -> T): T? {
        return if (next()) {
            block().also {
                require(!next()) { "Skal være unik" }
            }
        } else {
            null
        }
    }

    private object Queries {
        val SELECT_ALL_QUIZ = """
       SELECT * FROM quiz;
    """.trimIndent()

        val SELECT_QUIZ = """
           SELECT * 
           FROM quiz
           WHERE id = ?;
    """.trimIndent()

        val POST_QUIZ = """
            insert into quiz
            (name, description, is_draft)
            values (
            ?, ?, ?) returning id
        """.trimIndent()
    }
}