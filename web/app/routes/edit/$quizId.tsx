import { json, LoaderFunction } from '@remix-run/node'
import { useLoaderData, useNavigate } from '@remix-run/react'
import { useState } from 'react'
import { poster } from '~/api/operations'
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
        // Check if question is new question or existing being updated
        questions.map(async (question: IQuestion) => {
            if (question.id === undefined) {
                // @ts-ignore
                await poster(`${window.env.API_URL}/quiz/${quiz.id}/questions`, question)
            } else {
                // @ts-ignore
                await fetch(`${window.env.API_URL}/quiz/${quiz.id}/questions`, {
                    body: JSON.stringify(question),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: 'PATCH'
                })
            }
        })

        // Check if a question has been deleted
        quiz.questions?.filter(x => !questions.includes(x)).map(async (question: IQuestion) => {
            // @ts-ignore
            if (question.id) {
                // @ts-ignore
                await fetch(`${window.env.API_URL}/quiz/${quiz.id}/questions?questionid=${question.id}`,{
                    method: 'DELETE'
                })
            }
        })

        navigate('../start')

        // questions.map(async (question) => {
        //     // @ts-ignore
        //     await fetch(`${window.env.API_URL}/quiz/${quiz.id}/questions`, {
        //         body: JSON.stringify(question),
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         method: 'PATCH'
        //     })
        // })
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