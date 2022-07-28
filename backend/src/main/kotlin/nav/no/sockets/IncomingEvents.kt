package nav.no.sockets

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import nav.no.database.domain.GamePin
import nav.no.models.Player

@Serializable
sealed class IncomingEvent

@Serializable
@SerialName("JOIN_GAME_EVENT")
data class JoinGameEvent(
    val player: Player
) : IncomingEvent()


@Serializable
@SerialName("START_GAME_EVENT")
data class StartGameEvent(
    val hostId: String,
) : IncomingEvent()

@Serializable
@SerialName("NEXT_QUESTION_EVENT")
data class NextQuestionEvent(
    val questionId: Long,
    val hostId: String
) : IncomingEvent()


@Serializable
@SerialName("SHOW_ALTERNATIVES_EVENT")
data class ShowAlternativesEvent(
    val questionId: Long
) : IncomingEvent()

@Serializable
@SerialName("LEAVE_GAME_EVENT")
data class LeaveGameEvent(
    val player: Player
) : IncomingEvent()

@Serializable
@SerialName("END_GAME_EVENT")
data class EndGameEvent(
    val gamePin: GamePin
) : IncomingEvent()

@Serializable
@SerialName("SELECT_ANSWER_EVENT")
data class SelectAnswerEvent(
    val alternativeId: Long,
    val playerId: Long
) : IncomingEvent()

@Serializable
@SerialName("TRIGGER_ANSWER_EVENT")
data class TriggerAnswerEvent(
    val hostId: String
) : IncomingEvent()
