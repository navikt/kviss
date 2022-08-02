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
    
    const onUpdateQuiz = async () => {
        // Update quiz info
        if (questions.length !== 0) {
            // @ts-ignore
            await fetch(`${window.env.API_URL}/quiz/${quiz.id}`, {
                body: JSON.stringify({
                    id: quiz.id,
                    name: quizInfo.name,
                    description: quizInfo.description
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'PATCH'
            })

            // Check if question is new question or existing being updated
            questions.map(async (question: IQuestion) => {
                console.log(question)
                if (question.id === undefined) {
                    //await poster(`${window.env.API_URL}/quiz/${quiz.id}/questions`, question)
                    console.log('got here')
                    // @ts-ignore
                    await fetch(`${window.env.API_URL}/quiz/${quiz.id}/questions`, {
                        body: JSON.stringify(question),
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        method: 'POST'
                    }).then(res => console.log(res.json()))
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
            // TODO: FIX, ends up deleting questions
            // quiz.questions?.filter(x => !questions.includes(x)).map(async (question: IQuestion) => {
            //     if (question.id) {
            //     // @ts-ignore
            //         await fetch(`${window.env.API_URL}/quiz/${quiz.id}/questions?questionid=${question.id}`, {
            //             method: 'DELETE'
            //         })
            //     }
            // })

            navigate('../start')
        }
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