package nav.no.routes

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Route.healthAPI(){
    get("/isalive") {
        call.respond(HttpStatusCode.OK)
    }
    get("/isready") {
        call.respond(HttpStatusCode.OK)
    }
}