import { ChangeEvent } from 'react'
import { IAlternative, IQuestion } from '~/context/QuizContext'

interface IProps {
    questions: IQuestion[]
    setQuestions: (question: IQuestion[]) => void
    questionIndex: number
    onQuestionAdd: () => void
}

export default function QuestionForm({
    questions,
    setQuestions,
    questionIndex,
    onQuestionAdd,
}: IProps) {
    
    const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
        const questionCopy: IQuestion = questions[questionIndex]
        questionCopy.description = event.target.value
        setQuestions(questions.concat(questionCopy))
    }

    const replaceAlternativeTextAtIndex = (index: number, newAlternativeText: string) => {
        const alternatives: IAlternative[] = questions[questionIndex].alternative
        
        alternatives[index] = { 
            id: alternatives[index].id,
            text: newAlternativeText,
            isCorrect: alternatives[index].isCorrect
        }

        const questionCopy = questions[questionIndex]
        questionCopy.alternative = alternatives
        setQuestions(questions.concat(questionCopy))
    }

    const replaceAlternativeIsCorrectAtIndex = (index: number, newAlternativeIsCorrect: boolean) => {
        const alternatives: IAlternative[] = questions[questionIndex].alternative
        
        alternatives[index] = { 
            id: alternatives[index].id,
            text: alternatives[index].text,
            isCorrect: newAlternativeIsCorrect
        }

        const questionCopy = questions[questionIndex]
        questionCopy.alternative = alternatives
        setQuestions(questions.concat(questionCopy))
    }

    return (
        <div>
            <form className="flex flex-col">
                <label className="mb-1">
                    Description:
                    <input 
                        type="text" 
                        value={questions[questionIndex].description || ''}
                        onChange={handleDescriptionChange}
                    />
                </label>
                {questions[questionIndex].alternative.map((item, i) => {
                    return(
                        <div key={i} className="my-1">
                            <label>
                                {`Alternative ${i + 1}:`}
                                <input 
                                    type="text" 
                                    value={questions[questionIndex].alternative[i].text || ''}
                                    onChange={e => replaceAlternativeTextAtIndex(i, e.target.value)}
                                />
                            </label>
                            <label className='ml-2'>
                                Correct:?
                                <input 
                                    type="checkbox" 
                                    checked={questions[questionIndex].alternative[i].isCorrect || false}
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