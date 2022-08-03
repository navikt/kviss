package nav.no.models

import kotlinx.serialization.Contextual
import kotlinx.serialization.Serializable
import java.sql.Timestamp

@Serializable
data class Game(
    val id: Long,
    val quizId: Long,
    val isActive: Boolean,
    val gamePin: Int,
    val hostId: String = ""
)

@Serializable
data class CreateQuizRequest(
    val name: String,
    val description: String?,
)

@Serializable
data class Quiz(
    val name: String,
    val id: Long,
    val description: String?,
    val questions: List<Question>,
//    val isDraft: Boolean
)

@Serializable
data class ConsumerQuiz(
    val name: String,
    val id: Long,
    val description: String?,
    val questions: List<ConsumerQuestion>
)

@Serializable
data class ConsumerQuestion(
    val id: Long,
    val description: String,
    val quizId: Long,
    val alternatives: List<ConsumerAlternative>,
    val sortOrder: Int
)

@Serializable
data class ConsumerAlternative(
    val id: Long,
    val text: String,
)

@Serializable
data class UpdateQuizRequest(
    val id: Long,
    val name: String,
    val description: String?,
)

@Serializable
data class Question(
    val id: Long,
    val description: String,
    val alternatives: List<Alternative>,
    val quizId: Long,
    val sortOrder: Int
)

/*

{
    "id": 1,
    "description": "The first question",
    "alternatives": [],
    "quizId": 666,
    "sortOrder": 1
}

* */

@Serializable
data class CreateQuestion(
    val description: String,
    val quizId: Long,
    val sortOrder: Int,
)

fun CreateQuestionAlternative.toCreateQuestion() =
    CreateQuestion(description, quizId, sortOrder)

@Serializable
data class CreateQuestionAlternative(
    val description: String,
    val quizId: Long,
    val sortOrder: Int,
    val alternatives: List<CreateAlternative>
)

@Serializable
data class CreateAlternative(
    val text: String,
    val isCorrect: Boolean,
)

@Serializable
data class EditAlternative(
    val id: Long,
    val text: String,
    val isCorrect: Boolean,
)

@Serializable
data class EditQuestionAlternative(
    val id: Long,
    val description: String,
    val quizId: Long,
    val sortOrder: Int,
    val alternatives: List<EditAlternative>
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
    val score: Int? = null,
)

@Serializable
data class ConsumerPlayer(
    val name: String,
)

@Serializable
data class Scoreboard(
    val gamePin: Int,
    val players: List<Player>,
)

@Serializable
data class PlayerAnswer(
    val playerId: Long,
    @Contextual
    val timeAnswered: Timestamp?
)

@Serializable
data class AnswerResult (
    val playerId: Long,
    val isCorrect: Boolean
)


