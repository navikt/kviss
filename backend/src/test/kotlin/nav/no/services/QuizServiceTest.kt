package nav.no.services

import io.mockk.*
import nav.no.database.dao.AlternativesDao
import nav.no.database.dao.GameDao
import nav.no.database.dao.QuestionDao
import nav.no.database.dao.QuizDao
import nav.no.database.domain.Quiz
import nav.no.database.domain.toConsumerModel
import nav.no.models.*
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.Test
import kotlin.test.assertEquals
import kotlin.test.assertFails

internal class QuizServiceTest {

    private val alternativesDao = mockk<AlternativesDao>()
    private val questionDao = mockk<QuestionDao>()
    private val quizDao = mockk<QuizDao>()

    private val service = QuizService(questionDao, quizDao, alternativesDao)

    @AfterEach
    fun afterEach() {
        confirmVerified(quizDao)
        clearAllMocks()
    }

    @Test
    fun `No result in database`() {
        every { quizDao.createQuiz(any()) } returns 123

        val id = service.createQuiz(CreateQuizRequest("test", "Description"))

        assertEquals(123, id)

        verify(exactly = 1) { quizDao.createQuiz(any()) }
    }

    @Test
    fun `create question with too few alternatives`() {
        val alternatives = listOf<CreateAlternative>(mockk(), mockk())
        val question = CreateQuestionAlternative("sld", 123, 1, alternatives)
        assertFails {
            service.createQuestion(question)
        }
    }

    @Test
    fun `create question with too many alternatives`() {
        val alternatives = listOf<CreateAlternative>(mockk(), mockk(), mockk(), mockk(), mockk(), mockk())
        val question = CreateQuestionAlternative("sld", 123, 1, alternatives)
        assertFails {
            service.createQuestion(question)
        }
    }

    @Test
    fun `create valid question`() {
        every { questionDao.addQuestion(any()) } returns 123
        every { alternativesDao.addAlternative(any(), any()) } returns 123

        val alternatives = listOf<CreateAlternative>(mockk(), mockk(), mockk(), mockk())
        val question = CreateQuestionAlternative("sld", 123, 1, alternatives)
        service.createQuestion(question)

        verify(exactly = 1) { questionDao.addQuestion(any()) }
    }

    @Test
    fun `Invalid amount of alternatives on question update`() {
        val alternatives = listOf<EditAlternative>(mockk(), mockk(), mockk(), mockk(), mockk())
        val updateQuestion = EditQuestionAlternative(1, "", 1, 1, alternatives)
        assertFails {
            service.updateQuestion(updateQuestion)
        }
    }

    @Test
    fun `valid question update`() {
        justRun { questionDao.updateQuestion(any()) }
        justRun { alternativesDao.updateAlternative(any()) }

        val alternatives = listOf<EditAlternative>(mockk(), mockk(), mockk(), mockk())
        val question = EditQuestionAlternative(1, "", 1, 1, alternatives)
        service.updateQuestion(question)

        verify(exactly = 1) { questionDao.updateQuestion(any()) }
    }


    @Test
    fun `get question with invalid id`() {
        every { alternativesDao.getAlternatives(any()) }.returns(mockk())

        every { questionDao.getQuestion(any()) } returns null

        assertFails {
            service.getQuestion(1)
        }
    }

    @Test
    fun `get question using valid id`(){
//        every { nav.no.database.domain.Alternative.toConsumerModel() } returns mockk()
        every { alternativesDao.getAlternatives(any()) }.returns(
            listOf(nav.no.database.domain.Alternative(123, "", false))
        )
        every { questionDao.getQuestion(any()) }.returns(
            nav.no.database.domain.Question(123,"",1,1)
        )

        service.getQuestion(123)

        verify(exactly = 1) {questionDao.getQuestion(123)}
        verify(exactly = 1) {alternativesDao.getAlternatives(123)}
    }

    @Test
    fun `getting consumer questions`() {
        every { alternativesDao.getAlternatives(any()) }.returns(
            listOf(nav.no.database.domain.Alternative(123, "", false))
        )
        every { questionDao.getQuestions(any()) }.returns(
            listOf(nav.no.database.domain.Question(123,"",1,1),
                nav.no.database.domain.Question(1234,"",1,1))
        )

        service.getQuestions(1)

        verify(exactly = 1) {questionDao.getQuestions(any())}
    }

    @Test
    fun `Test getting quizzes`() {
        every { service.getQuestions(any()) } returns listOf(Question(123,"", alternatives,1,1),
                    Question(1234,"", alternatives,1,1))

        every { questionDao.getQuestions(any()) }.returns(
            listOf(nav.no.database.domain.Question(123,"",1,1),
                nav.no.database.domain.Question(1234,"",1,1))
        )
        every { alternativesDao.getAlternatives(any()) }.returns(
            listOf(nav.no.database.domain.Alternative(123, "", false))
        )

        every { quizDao.getQuizzes() } returns listOf(Quiz("name", 1, "desc"))

        verify(exactly = 1) {quizDao.getQuizzes()}

    }
}