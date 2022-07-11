package nav.no.plugins

import io.ktor.server.routing.*
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.request.*
import nav.no.database.dbConnect
import nav.no.routes.dbRoute
import nav.no.routes.healthAPI
import nav.no.routes.helloWorldRoute

fun Application.configureRouting() {
    val text = dbConnect()
    val text2 = "hello world"

    routing {
//        route("/") {
//           get {
//               call.respondText(text2)
//           }
//        }
//       route("/db-test/") {
//           get {
//               call.respondText(text)
//           }
//       }
        healthAPI()
        helloWorldRoute()
        dbRoute()
    }
}
