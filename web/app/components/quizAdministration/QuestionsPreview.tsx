import { useState } from 'react'
import { IQuestion } from '~/context/QuizContext'
import Button from '../common/Button'
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
            <Button
                onClick={onAddQuestion}
            >
                Add question
            </Button>
        </div>
    )
}