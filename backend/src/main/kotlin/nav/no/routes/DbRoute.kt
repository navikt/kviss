package nav.no.routes

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Route.dbRoute() {
    route("/db-test") {
        get {
            call.respondText("tmp", status = HttpStatusCode.OK)
        }
    }
}
