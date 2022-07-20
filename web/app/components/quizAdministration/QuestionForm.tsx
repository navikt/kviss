import { ChangeEvent, useState } from 'react'
import { IAlternative, IQuestion } from '~/context/QuizContext'

interface IProps {
    questions: IQuestion[]
    setQuestions: (question: IQuestion[]) => void
}

export default function QuestionForm({
    questions,
    setQuestions
}: IProps) {
    
    const [question, setQuestion] = useState<IQuestion>({
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
    })

    // TODO: Check if edit  mode, then load question from list
    const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
        const questionCopy: IQuestion = question
        questionCopy.description = event.target.value
        setQuestion(questionCopy)
    }

    const replaceAlternativeTextAtIndex = (index: number, newAlternativeText: string) => {
        const alternatives: IAlternative[] = question.alternative
        
        alternatives[index] = { 
            id: alternatives[index].id,
            text: newAlternativeText,
            isCorrect: alternatives[index].isCorrect
        }

        const questionCopy = question
        questionCopy.alternative = alternatives
        setQuestion(questionCopy)
    }

    const replaceAlternativeIsCorrectAtIndex = (index: number, newAlternativeIsCorrect: boolean) => {
        const alternatives: IAlternative[] = question.alternative
        
        alternatives[index] = { 
            id: alternatives[index].id,
            text: alternatives[index].text,
            isCorrect: newAlternativeIsCorrect
        }

        const questionCopy = question
        questionCopy.alternative = alternatives
        setQuestion(questionCopy)
    }

    const onQuestionAdd = () => {
        setQuestions([...questions, question])
        // TODO: Wipe data of question
    }

    return (
        <div>
            <form className="flex flex-col">
                <label className="mb-1">
                    Description:
                    <input 
                        type="text" 
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
                                    onChange={e => replaceAlternativeTextAtIndex(i, e.target.value)}
                                />
                            </label>
                            <label className='ml-2'>
                                Correct:?
                                <input 
                                    type="checkbox" 
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