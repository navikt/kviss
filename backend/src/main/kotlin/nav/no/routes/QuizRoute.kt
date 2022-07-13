package nav.no.routes

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import nav.no.database.DataSourceBuilder
import nav.no.database.NavhootDao
import nav.no.models.Alternative
import nav.no.models.Question
import nav.no.models.Quiz

fun Route.quizRoute(dao: NavhootDao) {
    route("quiz") {
        get {
            val quiz: List<Quiz> = dao.getQuizzes()
            call.respond(quiz)
        }
        get("{id}") {
            val quiz: Quiz = dao.getQuiz(call.parameters["id"]!!.toLong())
            call.respond(quiz)
        }
        get("mock") {
            call.respond(quiz)
        }
    }
}
private val quiz = Quiz(
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
            )
        ),
        Question(
            2,
            "Spørsmål 2",
            listOf(
                Alternative(1, "Alternative 1", true),
                Alternative(2, "Alternative 2", false),
                Alternative(3, "Alternative 3", false),
                Alternative(4, "Alternative 4", false),
            )
        ),
        Question(
            3,
            "Spørsmål 3",
            listOf(
                Alternative(1, "Alternative 1", true),
                Alternative(2, "Alternative 2", false),
                Alternative(3, "Alternative 3", false),
                Alternative(4, "Alternative 4", false),
            )
        ),
        Question(
            4,
            "Spørsmål 4",
            listOf(
                Alternative(1, "Alternative 1", true),
                Alternative(2, "Alternative 2", false),
                Alternative(3, "Alternative 3", false),
                Alternative(4, "Alternative 4", false),
            )
        )
    )
)
