package nav.no.sockets

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import nav.no.database.domain.GamePin
import nav.no.models.*

enum class EventType {
    JOIN_GAME_EVENT,
    PLAYER_JOINED_EVENT,
    PLAYER_LEFT_EVENT,
    START_GAME_EVENT,
    NEXT_QUESTION_EVENT,
    SEND_QUESTION_EVENT,
    SHOW_ALTERNATIVES_EVENT,
    SEND_ALTERNATIVES_EVENT,
    SELECT_ANSWER_EVENT,
    END_GAME_EVENT,
}

@Serializable
sealed class Event

@Serializable
@SerialName("JOIN_GAME_EVENT")
data class JoinGameEvent(
    val playerName: String
) : Event()


@Serializable
@SerialName("PLAYER_JOINED_EVENT")
data class PlayerJoinedEvent(
    val playerName: String
) : Event()

@Serializable
@SerialName("PLAYER_LEFT_EVENT")
data class PlayerLeftEvent(
    val playerName: String
) : Event()

@Serializable
@SerialName("START_GAME_EVENT")
data class StartGameEvent(
    val hostId: Long,
) : Event()

@Serializable
@SerialName("NEXT_QUESTION_EVENT")
data class NextQuestionEvent(
    val questionId: Long
) : Event()

@Serializable
@SerialName("SEND_QUESTION_EVENT")
data class SendQuestionEvent(
    val question: ConsumerQuestion
) : Event()

@Serializable
@SerialName("SHOW_ALTERNATIVES_EVENT")
data class ShowAlternativesEvent(
    val questionId: Long
) : Event()

@Serializable
@SerialName("SEND_ALTERNATIVES_EVENT")
data class SendAlternativesEvent(
    val alternatives: List<ConsumerAlternative>
) : Event()



@Serializable
@SerialName("END_GAME_EVENT")
data class EndGameEvent(
    val gamePin: GamePin
) : Event()
@Serializable
@SerialName("SELECT_ANSWER_EVENT")
data class SelectAnswerEvent(
    val alternativeId: Long,
    val playerId: Long
) : Event()
