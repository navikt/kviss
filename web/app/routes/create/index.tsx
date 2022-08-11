import React from 'react'
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
        if (questions.length < 1) {
            alert('Please create at least one question before saving')
            return
        }

        if (quizInfo.name.length < 1) {
            alert('Please give the kviss a name before saving')
            return
        }

        if (quizInfo.name.length > 100) {
            alert('Please do not use a kviss name with over 100 characters')
            return
        }

        if (quizInfo.description.length > 350) {
            alert('Please do not use a kviss description with over 350 characters')
            return
        }
        
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
        <div className='flex flex-col justify-center items-center pb-5'>
            <h2 className='text-3xl mb-2 text-gray-300 dark:text-gray-300 pt-3'>Quiz info</h2>
            <QuizInformationForm quizInfo={quizInfo} setQuizInfo={setQuizInfo} />
            {questions.length !== 0 && <h2 className='text-3xl my-2 text-gray-300 dark:text-gray-300'>Questions</h2>}
            <QuestionsPreview questions={questions} setQuestions={setQuestions}/>
            <br/>
            <Button onClick={onCreateQuiz}>
                <h1 className='text-2xl my-2'>CREATE KVISS</h1>
            </Button>
        </div>
    )
}