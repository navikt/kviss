package nav.no.sockets

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import nav.no.database.domain.GamePin

@Serializable
sealed class IncomingEvent

@Serializable
@SerialName("JOIN_GAME_EVENT")
data class JoinGameEvent(
    val playerName: String
) : IncomingEvent()


@Serializable
@SerialName("START_GAME_EVENT")
data class StartGameEvent(
    val hostId: Long,
) : IncomingEvent()

@Serializable
@SerialName("NEXT_QUESTION_EVENT")
data class NextQuestionEvent(
    val questionId: Long
) : IncomingEvent()


@Serializable
@SerialName("SHOW_ALTERNATIVES_EVENT")
data class ShowAlternativesEvent(
    val questionId: Long
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
