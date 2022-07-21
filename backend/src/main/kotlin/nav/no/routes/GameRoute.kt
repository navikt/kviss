package nav.no.routes

import io.ktor.http.*
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
                try {
                    val game: Game = gameService.getGame(getPin())
                    call.respond(game)
                } catch (e: Exception) {
                    call.respondText("Game not found", status = HttpStatusCode(404, "Game not found"))
                }
            }
            get("players") {
                try {
                    val players: List<Player> = gameService.getPlayers(getPin())
                    call.respond(players)
                } catch (e: Exception) {
                    call.respondText("Players not found", status = HttpStatusCode(404, "Players not found"))
                }
            }
            get("gamestart") {
                try {
                    val gamePin: Int = gameService.getGamePin(getPin())
                    call.respond(gamePin)
                } catch (e: Exception) {
                    call.respondText("Error generating game", status = HttpStatusCode(500, "Players not found"))
                }
            }
            get("game-exist") {
                try {
                    val gameExist: Boolean = gameService.gameExist(call.parameters["id"]!!.toInt())
                    call.respond(gameExist)
                } catch (e: Exception) {
                    call.respondText("Error checking the the game", status = HttpStatusCode(500, "Game not found"))
                }
            }
        }
    }
}

private fun PipelineContext<Unit, ApplicationCall>.getPin() = call.parameters["pin"]!!.toLong()