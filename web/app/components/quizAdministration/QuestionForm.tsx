import { ChangeEvent, useState } from 'react'
import { IAlternative, IQuestion } from '../../context/QuizContext'
import { emptyQuestion } from '../../mock'
import Button from '../common/Button'
import Input from '../common/Input'
import Radio from '../common/Radio'

interface IProps {
    questions: IQuestion[]
    setQuestions: (question: IQuestion[]) => void
    questionIndex: number
    setEdit: (edit: boolean) => void
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
        setEdit(false)
    }

    return (
        <div>
            <form className="flex flex-col">
                <Input 
                    label='Description:'
                    type="text" 
                    value={question.description || ''}
                    onChange={handleDescriptionChange}
                />
                {question.alternatives.map((item, i) => {
                    return(
                        <div key={i} className="flex flex-row my-1">
                            <Input 
                                label={`Alternative ${i + 1}:`}
                                type="text"
                                value={item.text || ''}
                                onChange={e => replaceAlternativeTextAtIndex(i, e.target.value)}
                            />
                            <Radio 
                                label='Correct?:'
                                name='alternative'
                                value={`alt-${i}`}
                                checked={item.isCorrect}
                                onChange={() => handleCorrectAnswerChange(i)}
                            />
                        </div>
                    )
                })}
                <Button onClick={onQuestionSaved} >
                    Save question
                </Button>
            </form>
        </div>
    )
}