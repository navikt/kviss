import { deleteQuestion } from '../../api/api'
import React from 'react'
import { useState } from 'react'
import { IQuestion } from '../../context/QuizContext'
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

    const [edit, setEdit] = useState<boolean>(true)

    const onDeleteQuestion = () => {
        if (questions[questionIndex].id && questions[questionIndex].quizId) {
            deleteQuestion(questions[questionIndex].id!, questions[questionIndex].quizId!)
        }
        const questionsCopy = [...questions]
        questionsCopy.splice(questionIndex, 1)
        setQuestions(questionsCopy)
    }

    return (
        <div>
            {!edit
                ? <div className='flex flex-col my-2 items-center'>
                    <h2 className='text-xl text-gray-300 dark:text-gray-300 w-1/2 mb-5'>
                        Description: {questions[questionIndex].description}
                    </h2>
                    {questions[questionIndex].alternatives.map((alt, i) => {
                        // TODO: replace with grid
                        return (
                            <div key={i} className='flex flex-row mb-2 justify-center items-center'>
                                <p className='text-gray-300 dark:text-gray-300 mr-3'>
                                    {`Alternative ${i + 1}: ${alt.text}`}
                                </p>
                                <p className='text-gray-300 dark:text-gray-300 ml-3'>
                                    {/* {`Correct?: ${alt.isCorrect}`} */}
                                    {alt.isCorrect ?
                                        <img src='/correct.png' className="w-5"/> :
                                        <img src='/incorrect.png' className="w-5"/>}
                                </p>
                            </div>
                        )
                    })}
                    <div className="pt-5">
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