package nav.no.sockets

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import nav.no.models.ConsumerAlternative
import nav.no.models.ConsumerQuestion

@Serializable
sealed class OutgoingEvent

@Serializable
@SerialName("SEND_ALTERNATIVES_EVENT")
data class SendAlternativesEvent(
    val alternatives: List<ConsumerAlternative>
) : OutgoingEvent()

@Serializable
@SerialName("SEND_QUESTION_EVENT")
data class SendQuestionEvent(
    val question: ConsumerQuestion
) : OutgoingEvent()

@Serializable
@SerialName("PLAYER_JOINED_EVENT")
data class PlayerJoinedEvent(
    val playerName: String
) : OutgoingEvent()

@Serializable
@SerialName("PLAYER_LEFT_EVENT")
data class PlayerLeftEvent(
    val playerName: String
) : OutgoingEvent()