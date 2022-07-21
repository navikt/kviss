package nav.no.services

import nav.no.database.domain.toConsumerModel
import nav.no.database.domain.toModel
import nav.no.database.navhootDao.AlternativesDao
import nav.no.database.navhootDao.QuestionDao
import nav.no.database.navhootDao.QuizDao
import nav.no.models.*

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
    fun getQuizzes(): List<Quiz> = quizDao.getQuizzes().map {
        val questions = getQuestions(it.id)
        it.toModel(questions)
    }

    fun createQuiz(createQuizRequest: CreateQuizRequest) = quizDao.createQuiz(createQuizRequest)


    fun createQuestion(createQuestion: CreateQuestionAlternative) {
        val id = questionDao.addQuestion(createQuestion.toCreateQuestion())

        createQuestion.alternatives.map {
            alternativesDao.addAlternative(id, it)
        }
    }

    fun getQuiz(id: Long) = quizDao.getQuiz(id).toModel(getQuestions(id))

    fun getConsumerQuiz(id: Long): ConsumerQuiz {
        return quizDao.getQuiz(id).toConsumerModel(getConsumerQuestions(id))
    }

}