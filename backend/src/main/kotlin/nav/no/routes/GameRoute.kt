package nav.no.routes

import io.ktor.http.HttpStatusCode
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.ktor.util.pipeline.*
import nav.no.models.Game
import nav.no.models.Player
import nav.no.services.GameService

fun Route.gameRoute(gameService: GameService) {
    route("game") {
        route("{pin}") {

            get {
                val game = gameService.getGameByPin(getPin())
                if (game != null) call.respond(game)
                else call.respond(HttpStatusCode.NotFound)
            }

            get("players") {
                val players: List<Player> = gameService.getPlayers(getPin())
                call.respond(players)
            }

            get("exist") {
                val gameExist: Boolean = gameService.gameExist(call.parameters["pin"]!!.toInt())

                if (gameExist) call.respond(HttpStatusCode.OK)
                else call.respond(HttpStatusCode.NotFound)
            }

            patch("finished") {
                if (gameService.setGameFinished(getPin()) == 1) call.respond(HttpStatusCode.OK)
                else call.respond(HttpStatusCode.NotFound)
            }

            post("player") {
                val player = gameService.createPlayer(
                    playerName = call.request.queryParameters["playername"]!!,
                    gamePin = getPin()
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

private fun PipelineContext<Unit, ApplicationCall>.getPin() = call.parameters["pin"]!!.toInt()