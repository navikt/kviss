package nav.no.routes

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import nav.no.database.QuestionDao
import nav.no.database.QuizDao
import nav.no.models.Alternative
import nav.no.models.Question
import nav.no.models.Quiz

fun Route.quizRoute(quizDao: QuizDao, questionDao: QuestionDao) {
    route("quiz") {
        get {
            val quiz: List<Quiz> = quizDao.getQuizzes()
            call.respond(quiz)
        }
        post {
            val source = call.receive<Quiz>()
            quizDao.postQuiz(source)
            call.respond(source.id)
//            val gucci = quizDao.postQuiz(source.)
        }

        route("{id}") {
            get {
                try {
                    val quiz: Quiz = quizDao.getQuiz(call.parameters["id"]!!.toLong())
                    call.respond(quiz)
                } catch (e: Exception) {
                    call.respond(HttpStatusCode(404, "Quiz not found"))                }
            }
            get("questions") {
                try {
                    val questions: List<Question> = questionDao
                        .getQuestions(call.parameters["id"]!!.toLong())
                    call.respond(questions)
                } catch (e: Exception) {
                    call.respond(HttpStatusCode(404, "error getting questions"))
                }
            }
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
