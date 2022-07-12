package nav.no.routes

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import nav.no.database.dbConnect

fun Route.dbRoute() {
    route("/db-test") {
        get {
            call.respondText(dbConnect(), status = HttpStatusCode.OK)
        }
    }
}
