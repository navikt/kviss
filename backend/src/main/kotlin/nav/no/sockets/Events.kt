package nav.no.sockets

import kotlinx.serialization.Serializable
import nav.no.database.domain.GamePin
import nav.no.models.ConsumerQuestion
import nav.no.models.Game
import nav.no.models.Player
import nav.no.models.Question

enum class EventType {
    JOIN_GAME_EVENT,
    PLAYER_JOINED_EVENT,
    PLAYER_LEFT_EVENT,
    START_GAME_EVENT,
    NEXT_QUESTION_EVENT,
    SEND_QUESTION_EVENT,
    SHOW_ALTERNATIVES_EVENT,
    SELECT_ANSWER_EVENT,
    END_GAME_EVENT,
}

interface Event {
    val type: EventType
}

@Serializable
data class JoinGameEvent(
    val playerName: String
) : Event {
    override val type = EventType.JOIN_GAME_EVENT
}


@Serializable
data class PlayerJoinedEvent(
    val playerName: String
) : Event {
    override val type = EventType.PLAYER_JOINED_EVENT
}

@Serializable
data class PlayerLeftEvent(
    val playerName: String
) : Event {
    override val type = EventType.PLAYER_LEFT_EVENT
}

@Serializable
data class StartGameEvent(
    val hostId: Long,
) : Event {
    override val type = EventType.START_GAME_EVENT
}

@Serializable
data class NextQuestionEvent(
    val questionId: Long
): Event {
    override val type = EventType.NEXT_QUESTION_EVENT
}

@Serializable
data class SendQuestionEvent(
    val question: ConsumerQuestion
): Event {
    override val type = EventType.SEND_QUESTION_EVENT
}

@Serializable
data class SelectAnswerEvent(
    val alternativeId: Long,
    val playerId: Long
) : Event{
    override val type = EventType.SELECT_ANSWER_EVENT
}

@Serializable
data class EndGameEvent(
    val gamePin: GamePin
) : Event {
    override val type = EventType.END_GAME_EVENT
}
