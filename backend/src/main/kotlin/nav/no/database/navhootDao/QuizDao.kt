package nav.no.database.navhootDao

import nav.no.database.navhootDao.QuizDao.Queries.POST_QUIZ
import nav.no.database.navhootDao.QuizDao.Queries.SELECT_ALL_QUIZ
import nav.no.database.navhootDao.QuizDao.Queries.SELECT_QUIZ
import nav.no.database.navhootDao.QuizDao.Queries.DELETE_QUIZ
import nav.no.database.navhootDao.QuizDao.Queries.UPDATE_QUIZ
import nav.no.database.toList
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
                    getString("name"), getLong("id"), getString("description"), emptyList(), false
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
                    rs.getString("name"), rs.getLong("id"), rs.getString("description"), emptyList(), false
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
    fun updateQuiz(quiz: Quiz) {
        dataSource.connection.use {
            it.prepareStatement(UPDATE_QUIZ).apply {
                setString(1, quiz.name)
                setString(2, quiz.description)
                setBoolean(3, quiz.isDraft)
            }.executeQuery()
        }
    }

    fun deleteQuiz(id: Long) {
        dataSource.connection.use {
            it.prepareStatement(DELETE_QUIZ).apply {
                setLong(1, id)
            }.executeQuery()
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

        val UPDATE_QUIZ = """
        UPDATE quiz
        SET name = ?, description = ?, is_draft = ?
        WHERE id = ?;
    """.trimIndent()

        val INSERT_QUIZ = """
       INSERT INTO quiz(name, description, is_draft)
       VALUES (?, ?, ?);
    """.trimIndent()

        val DELETE_QUIZ = """
        DELETE FROM quiz WHERE id = ?;
    """.trimIndent()
    }
}