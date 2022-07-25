import { useState } from 'react'
import { IQuestion } from '~/context/QuizContext'
import QuestionPreview from './QuestionPreview'

const emptyQuestion = {
    quizId: 1,
    description: '',
    alternatives: [
        { id: 1, text: '', isCorrect: false },
        { id: 2, text: '', isCorrect: false },
        { id: 3, text: '', isCorrect: false },
        { id: 4, text: '', isCorrect: false }
    ],
    sortOrder: 1
}

export default function QuestionsPreview({ 
    questions,
    setQuestions, 
}: { 
    questions: IQuestion[],
    setQuestions: (questions: IQuestion[]) => void
}) {

    const onAddQuestion = () => {
        setQuestions([...questions, {
            ...emptyQuestion, sortOrder: questions.length+1
        }])
    }

    return(
        <div>
            {questions.map((question, i) => {
                return <QuestionPreview 
                    key={i} 
                    questions={questions} 
                    setQuestions={setQuestions}
                    questionIndex={i}
                />
            })}
            <button 
                className='border-2 border-black rounded my-2'
                onClick={onAddQuestion}
            >
                Add question
            </button>
        </div>
    )
}