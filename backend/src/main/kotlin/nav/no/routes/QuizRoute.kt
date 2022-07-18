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
import lofotenQuiz
import quiz
import worldCupQuiz

fun Route.quizRoute(quizDao: QuizDao, questionDao: QuestionDao) {
    route("quiz") {
        get {
            //TODO: This response is temp, need to take out from db
//            val quiz: List<Quiz> = quizDao.getQuizzes()
            call.respond(mutableListOf(quiz, lofotenQuiz, worldCupQuiz))
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
        get("mock-empty") {
            call.respond(quiz)
        }
        get("mock-lofoten") {
            call.respond(lofotenQuiz)
        }
        get("mock-world-cup") {
            call.respond(worldCupQuiz)
        }
    }
}