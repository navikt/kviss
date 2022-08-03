import React from 'react'
import { useEffect, useState } from 'react'
import { poster } from '../../api/operations'
import Button from '../../components/common/Button'
import QuestionsPreview from '../../components/quizAdministration/QuestionsPreview'
import QuizInformationForm from '../../components/quizAdministration/QuizInformationForm'
import { IQuestion, IQuiz } from '../../context/QuizContext'
import { IQuizInfo } from '../create'
import { useNavigate, useParams } from 'react-router-dom'
import { createQuestion, getQuizById, updateQuestion, updateQuiz } from '../../api/api'

export default function EditQuiz() {
    const { quizId } = useParams()

    const navigate = useNavigate()

    const [quiz, setQuiz] = useState<IQuiz>()
    const [quizInfo, setQuizInfo] = useState<IQuizInfo>()
    const [questions, setQuestions] = useState<IQuestion[]>([])

    useEffect(() => {
        if (quizId !== undefined) {
            getQuizById(parseInt(quizId))
                .then((quiz: IQuiz) => {
                    setQuiz(quiz)
                    setQuizInfo({
                        ...quiz
                    })
                    setQuestions(quiz.questions || [])
                })
        }
    }, [])

    const onUpdateQuiz = async () => {
        // Update quiz info
        if (questions.length !== 0) {
            await updateQuiz({
                id: parseInt(quizId!),
                name: quizInfo!.name,
                description: quizInfo!.description
            })
            // Check if question is new question or existing being updated
            questions.map(async (question: IQuestion, index: number) => {
                if (question.id === undefined) {
                    question.quizId = parseInt(quizId!)
                    
                    const questionId = await createQuestion(question)

                    const questionsCopy = [...questions]
                    questionsCopy[index] = {...questions[index], id: questionId}
                    setQuestions(questionsCopy)
                } else {
                    await updateQuestion(question, parseInt(quizId!))
                }

            })

            // Check if a question has been deleted
            // quiz?.questions?.filter(x => !questions.includes(x)).map(async (question: IQuestion) => {
            //     if (question.id) {
            //         await fetch(`/api/quiz/${quizId}/questions?questionid=${question.id}`,{
            //             method: 'DELETE'
            //         })
            //     }
            // })
            
            // Get updated quiz, as some questions can have been added

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