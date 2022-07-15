package nav.no.routes

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import nav.no.models.Alternative
import nav.no.models.Question
import nav.no.models.Quiz

fun Route.quizRoute() {
    route("quiz") {
        get {
            val quiz = Quiz(
                "test quiz",
                123,
                "test description",
                listOf(
                    Question(
                        1,
                        "Spørsmål 1",
                        listOf(
                            Alternative(1, "Alternative 1", true),
                            Alternative(2, "Alternative 2", false),
                            Alternative(3, "Alternative 3", false),
                            Alternative(4, "Alternative 4", false),
                        ),
                        123,
                        1
                    ),
                    Question(
                        2,
                        "Spørsmål 2",
                        listOf(
                            Alternative(1, "Alternative 1", true),
                            Alternative(2, "Alternative 2", false),
                            Alternative(3, "Alternative 3", false),
                            Alternative(4, "Alternative 4", false),
                        ),
                        123,
                        2
                    ),
                    Question(
                        3,
                        "Spørsmål 3",
                        listOf(
                            Alternative(1, "Alternative 1", true),
                            Alternative(2, "Alternative 2", false),
                            Alternative(3, "Alternative 3", false),
                            Alternative(4, "Alternative 4", false),
                        ),
                        123,
                        3
                    ),
                    Question(
                        4,
                        "Spørsmål 4",
                        listOf(
                            Alternative(1, "Alternative 1", true),
                            Alternative(2, "Alternative 2", false),
                            Alternative(3, "Alternative 3", false),
                            Alternative(4, "Alternative 4", false),
                        ),
                        123,
                        4
                    )
                ), false
            )
            call.respond(quiz)
        }
        post {
            call.respondText("tmp", status = HttpStatusCode.OK)
        }
        delete {
            call.respondText("tmp", status = HttpStatusCode.OK)
        }
    }
}
