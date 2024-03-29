package nav.no.routes

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import nav.no.models.Player
import nav.no.services.GameService

fun Route.playerRoute(gameService: GameService) {
    route("player") {
        get("{id}") {
            try {
                val player: Player = gameService.getPlayer(call.parameters["id"]!!.toLong())
                call.respond(player)
            } catch (e: Exception) {
                call.respondText(
                        "Error getting player",
                        status = HttpStatusCode(400, "Player not found")
                )
            }
        }

        delete("{id}") {
            val playerId = call.parameters["id"]!!.toLong()
            if (gameService.deletePlayer(playerId) == 1) {
                call.respond(HttpStatusCode.OK)
            } else {
                call.respondText(
                    "Error deleting player",
                    status = HttpStatusCode(400, "Player not found")
                )
            }
        }
    }
}
