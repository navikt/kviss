import { useState } from 'react'
import { IQuestion } from '~/context/QuizContext'
import QuestionForm from './QuestionForm'

export default function QuestionPreview({ 
    questions,
    setQuestions,
    questionIndex
}: { 
    questions: IQuestion[],
    setQuestions: (questions: IQuestion[]) => void
    questionIndex: number
}) {

    const [edit, setEdit] = useState<boolean>(false)

    return (
        <div>
            {edit
                ? <div>
                    <QuestionForm 
                        questions={questions} 
                        setQuestions={setQuestions} 
                        questionIndex={questionIndex}
                        setEdit={setEdit}
                    />
                </div>
                : <div className='flex flex-col my-2'>
                    <p>Question: {questions[questionIndex].description}</p>
                    {questions[questionIndex].alternative.map((alt, i) => {
                        return <p key={i}>{`Alternative ${i + 1}: ${alt.text}. Correct?: ${alt.isCorrect}`}</p>
                    })}
                    <button 
                        className='border-2 border-black rounded my-2'
                        onClick={() => {setEdit(true)}}
                    >
                        Edit question
                    </button>
                </div>
            }
            
        </div>
    )
}