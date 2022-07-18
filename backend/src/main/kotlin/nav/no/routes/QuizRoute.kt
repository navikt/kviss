package nav.no.routes

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import nav.no.database.navhootDao.QuestionDao
import nav.no.database.navhootDao.QuizDao
import nav.no.models.Question
import nav.no.models.Quiz

fun Route.quizRoute(quizDao: QuizDao, questionDao: QuestionDao) {
    route("quiz") {
        get {
            val quizList = quizDao.getQuizzes()
            call.respond(quizList)
        }
        post {
            val source = call.receive<Quiz>()
            quizDao.postQuiz(source)
            call.respond(source.id)
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
    }
}