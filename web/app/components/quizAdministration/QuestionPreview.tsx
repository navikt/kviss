import { useState } from 'react'
import { IQuestion } from '~/context/QuizContext'
import Button from '../common/Button'
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

    const onDeleteQuestion = () => {
        const questionsCopy = [...questions]
        questionsCopy.splice(questionIndex, 1)
        setQuestions(questionsCopy)
    }

    return (
        <div>
            {!edit
                ? <div className='flex flex-col my-2 items-center'>
                    <h2 className='text-xl text-gray-900 dark:text-gray-300 w-1/2'>
                        Description: {questions[questionIndex].description}
                    </h2>
                    {questions[questionIndex].alternatives.map((alt, i) => {
                        return (
                            <div key={i} className='flex flex-row'>
                                <p className='text-gray-900 dark:text-gray-300 mr-3'>
                                    {`Alternative ${i + 1}: ${alt.text}`}
                                </p>
                                <p className='text-gray-900 dark:text-gray-300 ml-3'>
                                    {`Correct?: ${alt.isCorrect}`}
                                </p>
                            </div>
                        )
                    })}
                    <div>
                        <Button onClick={() => {setEdit(true)}}>
                            Edit question
                        </Button>
                        <Button onClick={onDeleteQuestion}>
                            Delete
                        </Button>
                    </div>
                </div>
                : <div>
                    <QuestionForm 
                        questions={questions} 
                        setQuestions={setQuestions} 
                        questionIndex={questionIndex}
                        setEdit={setEdit}
                    />
                </div>
            }
            
        </div>
    )
}