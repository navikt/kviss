package nav.no.sockets

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import nav.no.models.ConsumerAlternative
import nav.no.models.ConsumerQuestion

@Serializable
sealed class OutgoingEvents

@Serializable
@SerialName("SEND_ALTERNATIVES_EVENT")
data class SendAlternativesEvent(
    val alternatives: List<ConsumerAlternative>
) : OutgoingEvents()

@Serializable
@SerialName("SEND_QUESTION_EVENT")
data class SendQuestionEvent(
    val question: ConsumerQuestion
) : OutgoingEvents()

@Serializable
@SerialName("PLAYER_JOINED_EVENT")
data class PlayerJoinedEvent(
    val playerName: String
) : OutgoingEvents()

@Serializable
@SerialName("SEND_PLAYER_LEFT")
data class SendPlayerLeft(
    val playerName: String
) : OutgoingEvents()