package nav.no.models

import kotlinx.serialization.Serializable
import java.util.*

@Serializable
data class Game(
    val id: Long,
    val quizId: Long,
    val isActive: Boolean
)
@Serializable
data class Quiz(
    val name: String,
    val id: Long,
    val description: String,
    val questions: List<Question>
)
@Serializable
data class Question(
    val id: Long,
    val description: String,
    val alternative: List<Alternative>
)
@Serializable
data class Alternative(
    val id: Long,
    val text: String,
    val isCorrect: Boolean
)

@Serializable
data class Player(
    val id: Long,
    val name: String,
    val score: Int,
)