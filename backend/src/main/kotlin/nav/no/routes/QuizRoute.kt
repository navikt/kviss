package nav.no.routes

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import nav.no.models.*
import nav.no.services.QuizService

fun Route.quizRoute(quizService: QuizService) {
    route("quiz") {
        get {
            val quizList = quizService.getQuizzes()
            call.respond(quizList)
        }

        post {
            val source = call.receive<CreateQuizRequest>()
            val id = quizService.createQuiz(source)
            call.respond(id)
        }


        route("{id}") {
            get {
                try {
                    val quiz: Quiz = quizService.getQuiz(call.parameters["id"]!!.toLong())
                    call.respond(quiz)
                } catch (e: Exception) {
                    call.respond(HttpStatusCode(404, "Quiz not found"))
                }
            }

            delete {
                val quizId = call.parameters["id"]!!.toLong()
                quizService.deleteQuiz(quizId)
                call.respond(HttpStatusCode(200, "Quiz deleted successfully"))
            }

            patch {
                val source = call.receive<UpdateQuizRequest>()
                quizService.updateQuiz(source)
                call.respond(HttpStatusCode(200, "Question successfully updated"))
            }

            route("questions") {
                get {
                    try {
                        val questions: List<Question> = quizService
                            .getQuestions(call.parameters["id"]!!.toLong())
                        call.respond(questions)
                    } catch (e: Exception) {
                        call.respond(HttpStatusCode(404, "error getting questions"))
                    }
                }

                get("{id}") {
                    try {
                        val questions = quizService.getQuestion(call.parameters["id"]!!.toLong())
                        call.respond(questions)
                    } catch (e: Exception) {
                        call.respond(HttpStatusCode(404, "error getting questions"))
                    }
                }

                post {
                    val source = call.receive<CreateQuestionAlternative>()
                    val id = quizService.createQuestion(source)
                    call.respond(id)
                }

                patch {
                    val source = call.receive<EditQuestionAlternative>()
                    quizService.updateQuestion(source)
                    call.respond(HttpStatusCode(200, "Question successfully updated"))
                }

                delete() {
                    val questionId = call.request.queryParameters["questionid"]?.toLong()
                    if (questionId != null) {
                        quizService.deleteQuestion(questionId)
                        call.respond(HttpStatusCode(200, "Question deleted successfully"))
                    } else {
                        call.respondText(
                            "Error deleting question",
                            status = HttpStatusCode(404, "question not found")
                        )
                    }
                }
            }
        }
    }
}