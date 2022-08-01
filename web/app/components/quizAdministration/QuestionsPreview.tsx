import { useState } from 'react'
import { IQuestion } from '~/context/QuizContext'
import { emptyQuestion } from '~/mock'
import Button from '../common/Button'
import QuestionPreview from './QuestionPreview'

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
        <div className='flex flex-col justify-center items-center'>
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