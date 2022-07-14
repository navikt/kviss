package nav.no.database

import nav.no.database.QuizDao.Queries.SELECT_ALL_QUIZ
import nav.no.database.QuizDao.Queries.SELECT_QUIZ
import nav.no.models.Quiz
import javax.sql.DataSource

class QuizDao(
    private val dataSource: DataSource,
) {
    fun getQuizzes(): List<Quiz> {
        return dataSource.connection.use {
            return it.prepareStatement(SELECT_ALL_QUIZ).executeQuery().toList {
                Quiz(
                    getString("name"),
                    getLong("id"),
                    getString("description"),
                    emptyList()
                )
            }
        }
    }

    fun getQuiz(id: Long): Quiz {
        return dataSource.connection.use {
            val rs = it.prepareStatement(SELECT_QUIZ)
                .apply {
                    setLong(1, id)
                }
                .executeQuery()
            return if (rs.next()) {
                Quiz(
                    rs.getString("name"),
                    rs.getLong("id"),
                    rs.getString("description"),
                    emptyList()
                )
            } else {
                throw Exception("The quiz does not exist")
            }
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
    }
}