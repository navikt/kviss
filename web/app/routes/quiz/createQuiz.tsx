import axios, { AxiosError } from 'axios'
import { ChangeEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IAlternative, IQuestion, IQuiz } from '~/context/QuizContext'

interface IQuizInfo {
    name: string
    description: string
}

export default function CreateQuiz() {

    const [tempAlternativesArray, setTempAlternativesArray] = useState<IAlternative[] >([
        { text: '', isCorrect: false},
        { text: '', isCorrect: false},
        { text: '', isCorrect: false},
        { text: '', isCorrect: false}
    ])
    
    const [quizInfo, setQuizInfo] = useState<IQuizInfo>({
        name: '',
        description: ''
    })

    const [questionDescription, setQuestionDescription] = useState<string>('')

    const [questions, setQuestions] = useState<IQuestion[]>([])

    const navigate = useNavigate()

    const handleQuizInfoChange = (event: ChangeEvent<HTMLInputElement>) => {
        setQuizInfo({
            ...quizInfo,
            [event.target.name]: event.target.value
        })
    }

    const handleQuestionDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
        setQuestionDescription(event.target.value)
    }

    const replaceAlternativeTextAtIndex = (index: number, newAlternativeText: string) => {
        const alternatives = [...tempAlternativesArray]
        alternatives[index] = {id: alternatives[index].id, text: newAlternativeText, isCorrect: alternatives[index].isCorrect}
        setTempAlternativesArray(alternatives)
    }

    const replaceAlternativeIsCorrectAtIndex = (index: number, newAlternativeIsCorrect: boolean) => {
        const alternatives = [...tempAlternativesArray]
        alternatives[index] = {id: alternatives[index].id, text: alternatives[index].text, isCorrect: newAlternativeIsCorrect}
        setTempAlternativesArray(alternatives)
    }

    const onAddQuestion = () => {
        setQuestions(questions.concat({
            description: questionDescription,
            alternative: tempAlternativesArray,
            sortOrder: questions.length
        }))
    }
    
    const onCreateQuiz = async () => {
        const quiz = {
            name: quizInfo.name,
            description: quizInfo.description,
        }

        // Post quiz before routing
        
        const quizId = await fetch('https://navhoot-backend.dev.nav.no/quiz', {
            body: JSON.stringify(quiz),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then((res: Response) => {
            return res.json()
        })
        console.log(quizId)
        // axios.post('https://navhoot-backend.dev.nav.no/question', {
        //     quizId,
        //     questions
        // })
        //navigate('../')
        
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
                {questions.map((item, i) => {
                    return (
                        <div key={i}className='flex flex-col my-2'>
                            <p>Question: {item.description}</p>
                            {item.alternative.map((alt, j) => {
                                return <p key={j}>{`Alternative ${j + 1}: ${alt.text}. Correct?: ${alt.isCorrect}`}</p>
                            })}
                        </div>
                    )
                })}
            </div>
            <form className='flex flex-col'>
                <label className='mb-1'>
                    Description:
                    <input type="text" onChange={handleQuestionDescriptionChange}/>
                </label>
                {tempAlternativesArray.map((item, i) => {
                    return (
                        <div key={i} className="my-1">
                            <label>
                                {`Alternative ${i + 1}:`}
                                <input type="text" onChange={e => replaceAlternativeTextAtIndex(i, e.target.value)} />
                            </label>
                            <label className='ml-2'>
                                Correct?:
                                <input type="checkbox" onChange={e => replaceAlternativeIsCorrectAtIndex(i, e.target.checked)} />
                            </label>
                        </div>
                    )
                })}
            </form>
            <button className='border-2 border-black rounded mt-2' onClick={onAddQuestion}>Add question</button>
            <button className='flex flex-col border-2 border-black rounded mt-2' onClick={onCreateQuiz}>
                <h1 className='text-2xl my-2'>CREATE QUIZ</h1>
            </button>
        </div>
    )
}