package nav.no.database

import nav.no.database.Queries.SELECT_GAME
import nav.no.database.Queries.SELECT_QUESTION
import nav.no.database.Queries.SELECT_QUESTIONS
import nav.no.database.Queries.SELECT_QUIZ
import nav.no.models.Game
import nav.no.models.Question
import nav.no.models.Quiz
import java.util.ListResourceBundle
import javax.sql.DataSource

class QuizDao(
    private val dataSource: DataSource,
) {
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

    fun getGame(gameId: Long): Game {
        return dataSource.connection.use {
            val rs = it.prepareStatement(SELECT_GAME)
                .apply {
                    setLong(1, gameId)
                }
                .executeQuery()
            return if (rs.next()) {
                Game(
                    rs.getLong("id"),
                    rs.getLong("quiz_id"),
                    rs.getBoolean("is_active"),
                )
            } else {
                throw Exception("The Game does not exist")
            }
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

    val SELECT_GAME = """
       SELECT * 
       FROM game
       WHERE id = ?;
    """.trimIndent()

}