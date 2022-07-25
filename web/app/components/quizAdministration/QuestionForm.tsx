import { ChangeEvent, useState } from 'react'
import { IAlternative, IQuestion } from '~/context/QuizContext'

interface IProps {
    questions: IQuestion[]
    setQuestions: (question: IQuestion[]) => void
    questionIndex: number
    setEdit: (edit: boolean) => void
}

const emptyQuestion = {
    quizId: 1,
    id: 1,
    description: '',
    alternatives: [
        { text: '', isCorrect: false },
        { text: '', isCorrect: false },
        { text: '', isCorrect: false },
        { text: '', isCorrect: false }
    ],
    sortOrder: 1
}

export default function QuestionForm({
    questions,
    setQuestions,
    questionIndex,
    setEdit
}: IProps) {
    
    const [question, setQuestion] = useState<IQuestion>(questions[questionIndex] || emptyQuestion)

    // TODO: Check if edit  mode, then load question from list
    const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
        setQuestion({
            ...question, 
            description: event.target.value
        })
    }

    const replaceAlternativeTextAtIndex = (index: number, newAlternativeText: string) => {
        const alternatives: IAlternative[] = [...question.alternatives]
        
        alternatives[index] = { 
            ...alternatives[index],
            text: newAlternativeText
        }

        setQuestion({
            ...question, 
            alternatives
        })
    }

    const handleCorrectAnswerChange = (index: number) => {
        const alternatives: IAlternative[] = [...question.alternatives]
            .map((item, i) => {
                if(i === index) return {...item, isCorrect: true}
                else return {...item, isCorrect: false}
            })

        setQuestion({
            ...question,
            alternatives
        })
    }

    const onQuestionSaved = () => {
        const questionsCopy: IQuestion[] = [...questions]
        questionsCopy[questionIndex] = question
        setQuestions(questionsCopy)
        setEdit(true)
    }

    return (
        <div>
            <form className="flex flex-col">
                <label className="mb-1">
                    Description:
                    <input 
                        type="text" 
                        value={question.description || ''}
                        onChange={handleDescriptionChange}
                    />
                </label>
                {question.alternatives.map((item, i) => {
                    return(
                        <div key={i} className="my-1">
                            <label>
                                {`Alternative ${i + 1}:`}
                                <input 
                                    type="text"
                                    value={item.text || ''}
                                    onChange={e => replaceAlternativeTextAtIndex(i, e.target.value)}
                                />
                            </label>
                            <label className='ml-2'>
                                Correct:?
                                <input 
                                    type="radio"
                                    name='alternative'
                                    value={`alt-${i}`}
                                    checked={item.isCorrect}
                                    onChange={() => handleCorrectAnswerChange(i)}
                                />
                            </label>
                        </div>
                    )
                })}
                <button
                    className='border-2 border-black rounded my-2'
                    onClick={onQuestionSaved}
                    type="button"
                >
                    Save question
                </button>
            </form>
        </div>
    )
}