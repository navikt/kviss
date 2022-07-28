package nav.no.sockets

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import nav.no.models.ConsumerAlternative
import nav.no.models.ConsumerQuestion
import nav.no.models.Player

@Serializable
sealed class OutgoingEvent

@Serializable
@SerialName("SEND_ALTERNATIVES_EVENT")
data class SendAlternativesEvent(
    val alternatives: List<ConsumerAlternative>
) : OutgoingEvent()

@Serializable
@SerialName("SEND_ERROR_EVENT")
data class SendErrorEvent(
    val errorMessage: String
) : OutgoingEvent()

@Serializable
@SerialName("SEND_QUESTION_EVENT")
data class SendQuestionEvent(
    val question: ConsumerQuestion
) : OutgoingEvent()

@Serializable
@SerialName("PLAYER_JOINED_EVENT")
data class PlayerJoinedEvent(
    val player: Player
) : OutgoingEvent()

@Serializable
@SerialName("PLAYER_LEFT_EVENT")
data class PlayerLeftEvent(
    val player: Player
) : OutgoingEvent()

@Serializable
@SerialName("GAME_ENDED_EVENT")
data class GameEndedEvent(val scores: List<Player>) : OutgoingEvent()

@Serializable
@SerialName("SEND_ANSWER_EVENT")
data class SendAnswerEvent(
    val playerId: Long,
    val score: Int,
    val correct: Boolean
) : OutgoingEvent()

@Serializable
@SerialName("SHOW_ANSWERS_EVENT")
data class ShowAnswersEvent(
    val show: Boolean
) : OutgoingEvent()