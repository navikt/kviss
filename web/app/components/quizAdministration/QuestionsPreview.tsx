import { useState } from 'react'
import { IQuestion } from '~/context/QuizContext'
import QuestionPreview from './QuestionPreview'

const emptyQuestion: IQuestion = {
    quizId: 1,
    description: '',
    alternatives: [
        { text: '', isCorrect: false },
        { text: '', isCorrect: false },
        { text: '', isCorrect: false },
        { text: '', isCorrect: false }
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