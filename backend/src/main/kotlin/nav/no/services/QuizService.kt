package nav.no.services

import nav.no.database.navhootDao.AlternativesDao
import nav.no.database.navhootDao.QuestionDao
import nav.no.database.navhootDao.QuizDao
import nav.no.models.Alternative
import nav.no.models.CreateQuizRequest
import nav.no.models.Question

class QuizService(
    private val questionDao: QuestionDao,
    private val quizDao: QuizDao,
    private val alternativesDao: AlternativesDao,
) {
    fun getQuestions(quizId: Long): List<Question> {
        return questionDao.getQuestions(quizId)
            .map {
                val alternatives = alternativesDao.getAlternatives(it.id).map { alternative ->
                    Alternative(alternative.id, alternative.text, alternative.isCorrect)
                }
                Question(
                    it.id, it.description, alternatives, it.quizId, it.sortOrder
                )
            }

    }

    fun getQuizzes() = quizDao.getQuizzes()

    fun createQuiz(createQuizRequest: CreateQuizRequest) = quizDao.createQuiz(createQuizRequest)

    fun getQuiz(id: Long) = quizDao.getQuiz(id)

}