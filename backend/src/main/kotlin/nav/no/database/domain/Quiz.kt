package nav.no.database.domain

typealias GameId = Long
typealias GamePin = Int

data class Game(
    val id: GameId,
    val quizId: Long,
    val isActive: Boolean,
    val gamePin: GamePin
)
data class Quiz(
    val name: String,
    val id: Long,
    val description: String?,
    val isDraft: Boolean
)

fun Quiz.toModel(questions: List<nav.no.models.Question>) =
    nav.no.models.Quiz(name, id, description, questions, isDraft)

fun Quiz.toConsumerModel(questions: List<nav.no.models.ConsumerQuestion>) =
    nav.no.models.ConsumerQuiz(name, id, description, questions)

data class Question(
    val id: Long,
    val description: String,
    val quizId: Long,
    val sortOrder: Int
)

fun Question.toModel(alternatives: List<nav.no.models.Alternative>) =
    nav.no.models.Question(id, description, alternatives, quizId, sortOrder)

fun Question.toConsumerModel(alternatives: List<nav.no.models.ConsumerAlternative>) =
    nav.no.models.ConsumerQuestion(id, description, quizId, alternatives)

data class Alternative(
    val id: Long,
    val text: String,
    val isCorrect: Boolean
)
fun Alternative.toModel() =
    nav.no.models.Alternative(id, text, isCorrect)

fun Alternative.toConsumerModel() =
    nav.no.models.ConsumerAlternative(id, text)
data class Player(
    val id: Long,
    val name: String,
    val score: Int,
)

data class ScoreBoard(
    val scores: List<Player>,
)

fun Game.toModel() =
    nav.no.models.Game(id, quizId, isActive, gamePin)