package nav.no.database

import nav.no.database.Queries.SELECT_ALL_QUIZ
import nav.no.database.Queries.SELECT_ALTERNATIVE
import nav.no.database.Queries.SELECT_GAME
import nav.no.database.Queries.SELECT_PLAYER
import nav.no.database.Queries.SELECT_QUESTION
import nav.no.database.Queries.SELECT_QUESTIONS
import nav.no.database.Queries.SELECT_QUIZ
import nav.no.models.Game
import nav.no.models.Alternative
import nav.no.models.Player
import nav.no.models.Question
import nav.no.models.Quiz
import java.sql.ResultSet
import javax.sql.DataSource

class NavhootDao(
    private val dataSource: DataSource,
) {
    fun getQuizzes(id: Long): List<Quiz> {
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

    fun getAlternatives(questionId: Long): List<Alternative> {
        return dataSource.connection.use {
            return it.prepareStatement(SELECT_ALTERNATIVE).apply {
                setLong(1, questionId)
            }.executeQuery().toList {
                Alternative(
                    getLong("id"),
                    getString("description"),
                    getBoolean("isCorrect")
                )
            }
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

    fun getPayer(playerId: Long): Player {
        return dataSource.connection.use {
            val rs = it.prepareStatement(SELECT_PLAYER).apply {
                setLong(1, playerId)
            }.executeQuery()
            return if (rs.next()) {
                Player(
                    rs.getLong("id"),
                    rs.getString("name"),
                    rs.getInt("score")
                )
            } else {
                throw Exception("No valid player found")
            }
        }
    }
}

private fun <T> ResultSet.toList(block: ResultSet.() -> T): List<T> {
    return generateSequence {
        if (next()) block()
        else null
    }.toList()
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

    val SELECT_ALTERNATIVE = """
        select * 
        from alternative
        where question_id = ?;
    """.trimIndent()

    val SELECT_PLAYER = """
        select * 
        from player
        where id = ?;
    """.trimIndent()

}