package nav.no.services

import nav.no.database.domain.toModel
import nav.no.database.navhootDao.AlternativesDao
import nav.no.database.navhootDao.QuestionDao
import nav.no.database.navhootDao.QuizDao
import nav.no.models.CreateQuizRequest
import nav.no.models.Question

class QuizService(
    private val questionDao: QuestionDao,
    private val quizDao: QuizDao,
    private val alternativesDao: AlternativesDao,
) {
    fun getQuestions(quizId: Long): List<Question> = questionDao.getQuestions(quizId)
        .map {
            val alternatives = alternativesDao.getAlternatives(it.id)
                .map { alternative ->
                    alternative.toModel()
                }
            it.toModel(alternatives)
        }

    fun getQuizzes() = quizDao.getQuizzes()

    fun createQuiz(createQuizRequest: CreateQuizRequest) = quizDao.createQuiz(createQuizRequest)

    fun getQuiz(id: Long) = quizDao.getQuiz(id)

}