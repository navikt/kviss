package nav.no.database.domain

import kotlinx.serialization.Serializable

data class Game(
    val id: Long,
    val quizId: Long,
    val isActive: Boolean,
    val gamePin: Long
)
data class Quiz(
    val name: String,
    val id: Long,
    val description: String?,
    val isDraft: Boolean
)
data class DatabaseQuiz(
    val name: String,
    val id: Long,
    val description: String?,
    val questions: List<Question>,
    val isDraft: Boolean
)
data class Question(
    val id: Long,
    val description: String,
    val quizId: Long,
    val sortOrder: Int
)

fun Question.toModel(alternatives: List<nav.no.models.Alternative>) =
    nav.no.models.Question(id, description, alternatives, quizId, sortOrder)

data class Alternative(
    val id: Long,
    val text: String,
    val isCorrect: Boolean
)
fun Alternative.toModel() =
    nav.no.models.Alternative(id, text, isCorrect)
data class Player(
    val id: Long,
    val name: String,
    val score: Int,
)

data class ScoreBoard(
    val scores: List<Player>,
)