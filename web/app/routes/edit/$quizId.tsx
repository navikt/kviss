import { json, LoaderFunction } from '@remix-run/node'
import { useLoaderData, useNavigate } from '@remix-run/react'
import { useState } from 'react'
import Button from '~/components/common/Button'
import QuestionsPreview from '~/components/quizAdministration/QuestionsPreview'
import QuizInformationForm from '~/components/quizAdministration/QuizInformationForm'
import { IQuestion, IQuiz } from '~/context/QuizContext'
import { IQuizInfo } from '../create'

export const loader: LoaderFunction = async ({ params }) => {
    const res = await fetch(`${process.env.API_URL}/quiz/${params.quizId}`)
    return json(await res.json())
}

export default function EditQuiz() {

    const navigate = useNavigate()

    const quiz: IQuiz = useLoaderData()
    
    const [quizInfo, setQuizInfo] = useState<IQuizInfo>({
        name: quiz.name,
        description: quiz.description
    })

    const [questions, setQuestions] = useState<IQuestion[]>(quiz.questions || [])

    const onUpdateQuiz = () => {
        questions.map(async (question) => {
            // @ts-ignore
            await fetch(`${window.env.API_URL}/quiz/${quiz.id}/questions`, {
                body: JSON.stringify(question),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'PATCH'
            })
        })
        navigate('../start')
    }

    return (
        <div className='flex flex-col justify-center items-center my-4'>
            <h2 className='text-2xl mb-2 text-gray-900 dark:text-gray-300'>Quiz info</h2>
            <QuizInformationForm quizInfo={quizInfo} setQuizInfo={setQuizInfo}/>
            <h2 className='text-2xl my-2 text-gray-900 dark:text-gray-300'>Questions</h2>
            <QuestionsPreview questions={questions} setQuestions={setQuestions}/>
            <Button onClick={onUpdateQuiz}>
                <h1 className='text-2xl my-2'>SAVE QUIZ</h1>
            </Button>
        </div>
    )
}