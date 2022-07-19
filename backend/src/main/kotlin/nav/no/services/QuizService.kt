package nav.no.services

import nav.no.database.domain.toConsumerModel
import nav.no.database.domain.toModel
import nav.no.database.navhootDao.AlternativesDao
import nav.no.database.navhootDao.QuestionDao
import nav.no.database.navhootDao.QuizDao
import nav.no.models.ConsumerQuestion
import nav.no.models.ConsumerQuiz
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

    fun getConsumerQuestions(quizId: Long): List<ConsumerQuestion> = questionDao.getQuestions(quizId)
        .map {
            val alternatives = alternativesDao.getAlternatives(it.id)
                .map { alternative ->
                    alternative.toConsumerModel()
                }
            it.toConsumerModel(alternatives)
        }

    fun getQuizzes() = quizDao.getQuizzes().map {
        it.toModel(getQuestions(it.id))
    }

    fun createQuiz(createQuizRequest: CreateQuizRequest) = quizDao.createQuiz(createQuizRequest)

    fun getQuiz(id: Long) = quizDao.getQuiz(id).toModel(getQuestions(id))

    fun getConsumerQuiz(id: Long): ConsumerQuiz {
        return quizDao.getQuiz(id).toConsumerModel(getConsumerQuestions(id))
    }

}