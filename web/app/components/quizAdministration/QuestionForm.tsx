import { ChangeEvent, useState } from 'react'
import { IAlternative, IQuestion } from '~/context/QuizContext'

interface IProps {
    questions: IQuestion[]
    setQuestions: (question: IQuestion[]) => void
}

const emptyQuestion = {
    quizId: 1,
    id: 1,
    description: '',
    alternative: [
        { id: 1, text: '', isCorrect: false },
        { id: 2, text: '', isCorrect: false },
        { id: 3, text: '', isCorrect: false },
        { id: 4, text: '', isCorrect: false }
    ],
    sortOrder: 1
}

export default function QuestionForm({
    questions,
    setQuestions
}: IProps) {
    
    const [question, setQuestion] = useState<IQuestion>(emptyQuestion)

    // TODO: Check if edit  mode, then load question from list
    const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
        setQuestion({
            ...question, 
            description: event.target.value
        })
    }

    const replaceAlternativeTextAtIndex = (index: number, newAlternativeText: string) => {
        const alternatives: IAlternative[] = [...question.alternative]
        
        alternatives[index] = { 
            id: alternatives[index].id,
            text: newAlternativeText,
            isCorrect: alternatives[index].isCorrect
        }

        setQuestion({
            ...question, 
            alternative: alternatives
        })
    }

    const replaceAlternativeIsCorrectAtIndex = (index: number, newAlternativeIsCorrect: boolean) => {
        const alternatives: IAlternative[] = [...question.alternative]
        
        alternatives[index] = { 
            id: alternatives[index].id,
            text: alternatives[index].text,
            isCorrect: newAlternativeIsCorrect
        }

        setQuestion({
            ...question, 
            alternative: alternatives
        })
    }

    const onQuestionAdd = () => {
        setQuestions([...questions, question])
        // TODO: Wipe data of question
        setQuestion(emptyQuestion)
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
                {question.alternative.map((item, i) => {
                    return(
                        <div key={i} className="my-1">
                            <label>
                                {`Alternative ${i + 1}:`}
                                <input 
                                    type="text"
                                    value={question.alternative[i].text || ''}
                                    onChange={e => replaceAlternativeTextAtIndex(i, e.target.value)}
                                />
                            </label>
                            <label className='ml-2'>
                                Correct:?
                                <input 
                                    type="checkbox"
                                    checked={question.alternative[i].isCorrect || false}
                                    onChange={e => replaceAlternativeIsCorrectAtIndex(i, e.target.checked)}
                                />
                            </label>
                        </div>
                    )
                })}
            </form>
            <button className='border-2 border-black rounded mt-2' onClick={onQuestionAdd}>
                Add question
            </button>
        </div>
    )
}