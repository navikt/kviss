package nav.no.plugins

import io.ktor.server.routing.*
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.request.*
import nav.no.database.dbConnect

fun Application.configureRouting() {

    routing {
        route("/") {
           get {
               call.respondText("Hello World!")
           }
        }
       route("/db-test/") {
           get {
               call.respondText("db test is working")
           }
       }
    }
}
