import { ChangeEvent, useState } from 'react'
import { IAlternative, IQuestion } from '~/context/QuizContext'

interface IQuizInfo {
    name: string
    description: string
}

export default function CreateQuiz() {

    const [tempAlternativesArray, setTempAlternativesArray] = useState<IAlternative[] >([
        { id: 1, text: '', isCorrect: false},
        { id: 1, text: '', isCorrect: false},
        { id: 1, text: '', isCorrect: false},
        { id: 1, text: '', isCorrect: false}
    ])
    
    const [quizInfo, setQuizInfo] = useState<IQuizInfo>({
        name: '',
        description: ''
    })

    const [questions, setQuestions] = useState<IQuestion[]>([])

    const handleQuizInfoChange = (event: ChangeEvent<HTMLInputElement>) => {
        setQuizInfo({
            ...quizInfo,
            [event.target.name]: event.target.value
        })
    }

    const replaceAlternativeAtIndex = (index: number, newAlternativeText: string) => {
        const alternatives = [...tempAlternativesArray]
        alternatives[index] = {id: alternatives[index].id, text: newAlternativeText, isCorrect: alternatives[index].isCorrect}
        setTempAlternativesArray(alternatives)
    }

    return (
        <div>
            <h2 className='text-2xl mb-2'>Quiz info</h2>
            <form className='flex flex-col'>
                <label>
                    Name:
                    <input type="text" name="name" onChange={handleQuizInfoChange} />
                </label>
                <label>
                    Descrption:
                    <input type="text" name="description" onChange={handleQuizInfoChange} />
                </label>
            </form>
            <h2 className='text-2xl my-2'>Questions</h2>
            <div>
                {/** PUT ALL FILLED OUT QUESTIONS HERE */}
            </div>
            <form className='flex flex-col'>
                <label className='mb-1'>
                    Description:
                    <input type="text" name="description"/>
                </label>
                {tempAlternativesArray.map((item, i) => {
                    return (
                        <label key={i} className="my-1">
                            {`Alternative ${i + 1}:`}
                            <input type="text" onChange={e => replaceAlternativeAtIndex(i, e.target.value)} />
                        </label>
                    )
                })}
            </form>
            <button className='border mt-2'>Add question</button>
        </div>
    )
}