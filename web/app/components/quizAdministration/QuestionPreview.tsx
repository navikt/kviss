import { useState } from 'react'
import { IQuestion } from '~/context/QuizContext'

export default function QuestionPreview({ question }: { question: IQuestion }) {

    const [edit, setEdit] = useState<boolean>(false)

    return (
        <div>
            {edit
                ? <div>
                    Hello
                </div>
                : <div className='flex flex-col my-2'>
                    <p>Question: {question.description}</p>
                    {question.alternative.map((alt, i) => {
                        return <p key={i}>{`Alternative ${i + 1}: ${alt.text}. Correct?: ${alt.isCorrect}`}</p>
                    })}
                    <button 
                        className='border-2 border-black rounded my-2'
                        onClick={() => setEdit(true)}
                    >
                        Edit question
                    </button>
                </div>
            }
        </div>
    )
}