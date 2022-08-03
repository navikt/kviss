import React from 'react'
import { useEffect, useState } from 'react'
import { poster } from '../../api/operations'
import Button from '../../components/common/Button'
import QuestionsPreview from '../../components/quizAdministration/QuestionsPreview'
import QuizInformationForm from '../../components/quizAdministration/QuizInformationForm'
import { IQuestion, IQuiz } from '../../context/QuizContext'
import { IQuizInfo } from '../create'
import { useNavigate, useParams } from 'react-router-dom'
import { getQuizById } from '../../api/api'

export default function EditQuiz() {
    const { quizId } = useParams()

    const navigate = useNavigate()

    const [quiz, setQuiz] = useState<IQuiz>()
    const [quizInfo, setQuizInfo] = useState<IQuizInfo>()
    const [questions, setQuestions] = useState<IQuestion[]>([])

    useEffect(() => {
        getQuizById(parseInt(quizId!))
            .then((quiz: IQuiz) => {
                setQuiz(quiz)
                setQuizInfo({
                    ...quiz
                })
                setQuestions(quiz.questions || [])
            })
    }, [])


    const onUpdateQuiz = async () => {
        // Update quiz info
        if (questions.length !== 0) {
            // @ts-ignore
            await fetch(`${window.env.API_URL}/quiz/${quiz.id}`, {
                body: JSON.stringify({
                    id: quizId,
                    name: quizInfo!.name,
                    description: quizInfo!.description
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'PATCH'
            })

            // Check if question is new question or existing being updated
            questions.map(async (question: IQuestion) => {
                if (question.id === undefined) {
                // @ts-ignore
                    await poster(`/api/quiz/${quiz.id}/questions`, question)
                } else {
                // @ts-ignore
                    await fetch(`/api/quiz/${quiz.id}/questions`, {
                        body: JSON.stringify(question),
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        method: 'PATCH'
                    })
                }
            })


            // Check if a question has been deleted
            quiz?.questions?.filter(x => !questions.includes(x)).map(async (question: IQuestion) => {
                if (question.id) {
                    await fetch(`/api/quiz/${quizId}/questions?questionid=${question.id}`,{
                        method: 'DELETE'
                    })
                }
            })

            navigate('/start')
        }
    }

    return (
        <div className='flex flex-col justify-center items-center my-4'>
            <h2 className='text-2xl mb-2 text-gray-900 dark:text-gray-300'>Quiz info</h2>
            {quizInfo && (
                <QuizInformationForm quizInfo={quizInfo} setQuizInfo={setQuizInfo}/>
            )}
            <h2 className='text-2xl my-2 text-gray-900 dark:text-gray-300'>Questions</h2>
            <QuestionsPreview questions={questions} setQuestions={setQuestions}/>

            <Button onClick={onUpdateQuiz}>
                <h1 className='text-2xl my-2'>SAVE QUIZ</h1>
            </Button>
        </div>
    )
}