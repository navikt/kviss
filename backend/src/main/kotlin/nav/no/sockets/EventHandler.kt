package nav.no.sockets

import nav.no.models.SocketConnection
import nav.no.models.ConsumerQuestion
import nav.no.ApplicationContext
import nav.no.models.ConsumerAlternative
import java.lang.reflect.Executable

class EventHandler(

    val gamePin: Int,
    val context: ApplicationContext
) {

    fun handle(event: IncomingEvent): OutgoingEvent =

        when (event) {
            is StartGameEvent -> {
                val quiz = context.gameService.getQuizByPin(gamePin)
                SendQuestionEvent(quiz.questions[0])
            }
            is NextQuestionEvent -> {
                val question: ConsumerQuestion = context.quizService.getQuestion(event.questionId)

                SendQuestionEvent(question)
            }
            is JoinGameEvent -> {
                // TODO: This will be moved to an api call
//                context.gameService.createPlayer(event.playerName, gamePin)
//                println("Player ${event.playerName} joined")
                PlayerJoinedEvent(event.playerName)
            }
            is ShowAlternativesEvent -> {
                val alternatives: List<ConsumerAlternative> =
                    context.quizService.getQuestion(event.questionId).alternatives

                SendAlternativesEvent(alternatives)
            }
            is SelectAnswerEvent -> {
//                context.gameService.checkAnswer(event.alternativeId, event.playerId)
                TODO()
            }
            is EndGameEvent -> {
                GameEndedEvent(emptyList())
            }
        }
}

