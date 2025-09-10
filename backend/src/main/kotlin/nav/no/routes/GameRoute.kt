package nav.no.routes

import io.ktor.http.HttpStatusCode
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import nav.no.models.AnswerResult
import nav.no.models.Player
import nav.no.services.GameService

fun Route.gameRoute(gameService: GameService) {
    route("game") {
        route("{pin}") {

            get {
                val game = gameService.getGameByPin(call.parameters["pin"]!!.toInt())
                if (game != null) call.respond(game)
                else call.respond(HttpStatusCode.NotFound)
            }

            get("players") {
                val players: List<Player> = gameService.getPlayers(call.parameters["pin"]!!.toInt())
                call.respond(players)
            }

            get("exist") {
                val gameExist: Boolean = gameService.gameExist(call.parameters["pin"]!!.toInt())

                if (gameExist) call.respond(HttpStatusCode.OK)
                else call.respond(HttpStatusCode.ServiceUnavailable)
            }

            patch("started") {
                if (gameService.setGameStarted(call.parameters["pin"]!!.toInt()) == 1) call.respond(HttpStatusCode.OK)
                else call.respond(HttpStatusCode.InternalServerError)
            }

            patch("finished") {
                if (gameService.setGameFinished(call.parameters["pin"]!!.toInt()) == 1) call.respond(HttpStatusCode.OK)
                else call.respond(HttpStatusCode.InternalServerError)
            }

            get("checkAnswer") {
                val alternativeId = call.request.queryParameters["alternativeId"]!!
                val playerId = call.request.queryParameters["playerId"]!!
                val game = gameService.getGameByPin(call.parameters["pin"]!!.toInt())

                val isCorrect = gameService.checkAnswer(alternativeId.toLong(), game!!.id, playerId.toLong())
                val result = AnswerResult(playerId.toLong(), isCorrect)

                call.respond(result)
            }

            post("player") {
                val player = gameService.createPlayer(
                    playerName = call.request.queryParameters["playername"]!!,
                    gamePin = call.parameters["pin"]!!.toInt()
                )
                call.respond(player)
            }
        }

        post {
            val game = gameService.createGame(call.request.queryParameters["quizid"]!!.toLong())
            call.respond(game)
        }
    }
}
