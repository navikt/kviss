import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/common/Button'
import QuestionsPreview from '../../components/quizAdministration/QuestionsPreview'
import QuizInformationForm from '../../components/quizAdministration/QuizInformationForm'
import { IQuestion, IQuiz } from '../../context/QuizContext'
import { createQuestion, createQuiz } from '../../api/api'

export interface IQuizInfo {
    name: string
    description: string
}

export default function CreateQuiz() {

    const navigate = useNavigate()

    const [quizInfo, setQuizInfo] = useState<IQuizInfo>({
        name: '',
        description: ''
    })

    const [questions, setQuestions] = useState<IQuestion[]>([])

    const onCreateQuiz = async () => {
        const newQuizId = await createQuiz({ name: quizInfo.name, description: quizInfo.description })

        if (newQuizId) {
            questions.forEach(question => {
                createQuestion({
                    ...question,
                    quizId: newQuizId
                })
            })
        }

        navigate('/start')
    }

    return (
        <div className='flex flex-col justify-center items-center'>
            <h2 className='text-2xl mb-2 text-gray-900 dark:text-gray-300'>Quiz info</h2>
            <QuizInformationForm quizInfo={quizInfo} setQuizInfo={setQuizInfo} />
            <h2 className='text-2xl my-2 text-gray-900 dark:text-gray-300'>Questions</h2>
            <QuestionsPreview questions={questions} setQuestions={setQuestions}/>
            <Button onClick={onCreateQuiz}>
                <h1 className='text-2xl my-2'>CREATE QUIZ</h1>
            </Button>
        </div>
    )
}