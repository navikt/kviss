package nav.no.routes

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Route.helloWorldRoute() {
    route("/") {
        get {
            call.respondText("Hello World2", status = HttpStatusCode.OK)
        }
    }
}
