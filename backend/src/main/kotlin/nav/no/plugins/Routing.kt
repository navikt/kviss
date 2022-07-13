package nav.no.plugins

import io.ktor.server.routing.*
import io.ktor.http.*
import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.application.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.server.response.*
import io.ktor.server.request.*
import nav.no.routes.dbRoute
import nav.no.routes.healthAPI
import nav.no.routes.helloWorldRoute
import nav.no.routes.quizRoute

fun Application.configureRouting() {
    install(ContentNegotiation) {
        json()
    }

    routing {
        healthAPI()
        helloWorldRoute()
        dbRoute()
        quizRoute()
    }
}
