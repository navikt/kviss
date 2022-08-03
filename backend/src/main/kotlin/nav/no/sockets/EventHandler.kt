package nav.no.sockets

import nav.no.models.ConsumerQuestion
import nav.no.ApplicationContext
import nav.no.models.ConsumerAlternative

class EventHandler(

    val gamePin: Int,
    val context: ApplicationContext
) {
    val quiz = context.gameService.getQuizByPin(gamePin)
    val game = context.gameService.getGameByPin(gamePin)

    fun handle(event: IncomingEvent): OutgoingEvent =

        when (event) {
            is StartGameEvent -> {
                if (event.hostId == game!!.hostId) {
                    SendQuestionEvent(quiz.questions[0])
                } else SendErrorEvent("Invalid host ID")
            }
            is NextQuestionEvent -> {
                val question: ConsumerQuestion = context.quizService.getQuestion(event.questionId)

                if (event.hostId == game!!.hostId) {
                    SendQuestionEvent(question)
                } else SendErrorEvent("Invalid host ID")
            }
            is JoinGameEvent -> {
                // TODO: This will be moved to an api call
//                context.gameService.createPlayer(event.playerName, gamePin)
//                println("Player ${event.playerName} joined")
                PlayerJoinedEvent(event.player)
            }
            is LeaveGameEvent -> {
                context.gameService.deletePlayer(event.player.id)
                PlayerLeftEvent(event.player)
            }
            is ShowAlternativesEvent -> {
                val alternatives: List<ConsumerAlternative> =
                    context.quizService.getQuestion(event.questionId).alternatives

                SendAlternativesEvent(alternatives)
            }
            is SelectAnswerEvent -> {
                val isCorrect = context.gameService.checkAnswer(event.alternativeId, game!!.id, event.playerId)
                SendAnswerEvent(event.playerId, isCorrect)
            }
            is EndGameEvent -> {
                context.gameService.setGameFinished(gamePin)
                GameEndedEvent(context.gameService.getPlayers(gamePin))
            }
            is TriggerAnswerEvent -> {
                if (event.hostId == game!!.hostId) {
                    ShowAnswersEvent(true)
                } else SendErrorEvent("Invalid host id")
            }
            is TriggerUpdatePlayerListEvent -> {
                if (event.hostId == game!!.hostId) {
                    UpdatePlayerListEvent(context.gameService.getPlayers(gamePin))
                } else SendErrorEvent("Invalid host id")
            }
        }
}

