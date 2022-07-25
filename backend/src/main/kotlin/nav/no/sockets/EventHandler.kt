package nav.no.sockets

import nav.no.models.SocketConnection
import nav.no.models.ConsumerQuestion
import nav.no.ApplicationContext
import nav.no.models.ConsumerAlternative

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
                context.gameService.createPlayer(event.playerName, gamePin)
                println("Player ${event.playerName} joined")
                connections.sendAllSessionEvent(gamePin, PlayerJoinedEvent(event.playerName))

            }
            is PlayerLeftEvent -> {
                println("${event.playerName} has left the building")
                connections.sendAllSessionEvent(gamePin, SendPlayerLeft(event.playerName))
            }
            is ShowAlternativesEvent -> {
                val alternatives: List<ConsumerAlternative> = context.quizService.getQuestion(event.questionId).alternatives

                connections.sendAllSessionEvent(gamePin, SendAlternativesEvent(alternatives))
            }
            is SelectAnswerEvent -> {
                context.gameService.checkAnswer(event.alternativeId, event.playerId)
            } else -> {
                throw Exception("Unknown event")
            }
        }
    }
}
