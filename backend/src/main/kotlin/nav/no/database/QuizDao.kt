package nav.no.database

import nav.no.database.Queries.SELECT_QUIZ
import nav.no.models.Question
import nav.no.models.Quiz
import java.util.ListResourceBundle
import javax.sql.DataSource

class QuizDao(
    private val dataSource: DataSource,
) {
    fun getQuiz(id: Long) : Quiz{
        return dataSource.connection.use {
            val rs = it.prepareStatement(SELECT_QUIZ).executeQuery()
            return if (rs.next()){
                Quiz(rs.getString("name"),
                    rs.getLong("id"),
                    rs.getString("description"),
                    emptyList()
                    )
            } else {
                throw Exception("The quiz does not exist")
            }
        }
    }

    fun getQuestions(quizId: Long): List<Question> {
        TODO()
    }

    fun get(quizId: Long): List<Question> {
        TODO()
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