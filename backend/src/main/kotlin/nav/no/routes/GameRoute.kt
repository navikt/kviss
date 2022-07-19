package nav.no.routes

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import nav.no.models.Game
import nav.no.models.Player
import nav.no.services.GameService

fun Route.gameRoute(gameService: GameService) {
    route("game") {
        route("{id}") {
            get {
                try {
                    val game: Game = gameService.getGame(call.parameters["id"]!!.toLong())
                    call.respond(game)
                } catch (e: Exception) {
                    call.respondText("Game not found", status = HttpStatusCode(404, "Game not found"))
                }
            }
            get("players") {
                try {
                    val players: List<Player> = gameService.getPlayers(call.parameters["id"]!!.toLong())
                    call.respond(players)
                } catch (e: Exception) {
                    call.respondText("Players not found", status = HttpStatusCode(404, "Players not found"))
                }
            }
            get("game") {
                try {
                    val players: List<Player> = gameService.getPlayers(call.parameters["id"]!!.toLong())
                    call.respond(players)
                } catch (e: Exception) {
                    call.respondText("Players not found", status = HttpStatusCode(404, "Players not found"))
                }
            }
        }

    }
}