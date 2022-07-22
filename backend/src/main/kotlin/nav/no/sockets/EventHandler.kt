package nav.no.sockets

import io.ktor.network.sockets.*
import io.ktor.server.websocket.*
import io.ktor.websocket.serialization.*
import nav.no.models.SocketConnection
import nav.no.models.ConsumerQuestion
import nav.no.services.GameService
import nav.no.services.QuizService
import nav.no.ApplicationContext
import nav.no.sockets.*

class EventHandler(
    val event: Event,
    val connections: MutableSet<SocketConnection>,
    val gamePin: Int,
    val context: ApplicationContext
) {

    suspend fun handle() {
        when (event) {
            is StartGameEvent -> {
                val quiz = context.gameService.getQuizByPin(gamePin)
                SendQuestionEvent(quiz.questions[0])
            }
            is NextQuestionEvent -> {
                val question: ConsumerQuestion = context.quizService.getQuestion(event.questionId)
                connections.sendAllSessionEvent(
                    gamePin,
                    SendQuestionEvent(question)
                )
            }
            is JoinGameEvent -> {
                // val host = context.gameService.createPlayer(event.playerName, gamePin)
                // TODO: context.gameService.setHost(host, gamePin)
            }
            is PlayerJoinedEvent -> {
                context.gameService.createPlayer(event.playerName, gamePin)
                sendPlayers(connections, gamePin)
            }

            is PlayerLeftEvent -> {
                println("${event.playerName} has left the building")
            }
            is SendQuestionEvent -> {
                connections.filter { it.pin == gamePin }.map {
                    (it.session as WebSocketServerSession).sendSerialized(event.question)
                }
            }
        }
    }
}
