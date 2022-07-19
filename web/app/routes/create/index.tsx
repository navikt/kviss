import { ChangeEvent, useState } from 'react'
import QuestionForm from '~/components/quizAdministration/QuestionForm'
import QuizInformationForm from '~/components/quizAdministration/QuizInformationForm'
import { IAlternative, IQuestion, IQuiz } from '~/context/QuizContext'

interface IQuizInfo {
    name: string
    description: string
}

export default function CreateQuiz() {

    const [quizInfo, setQuizInfo] = useState<IQuizInfo>({
        name: '',
        description: ''
    })

    const [questions, setQuestions] = useState<IQuestion[]>([])

    const [quiz, setQuiz] = useState<IQuiz>()

    const onCreateQuiz = () => {
        setQuiz({
            id: 1,
            name: quizInfo.name,
            description: quizInfo.description,
            questions,
            isDraft: false
        })
    }

    return (
        <div className='flex items-center h-screen flex-col'>
            <h2 className='text-2xl mb-2'>Quiz info</h2>
            <QuizInformationForm quizInfo={quizInfo} setQuizInfo={setQuizInfo} />
            <h2 className='text-2xl my-2'>Questions</h2>
            <div>
                {questions.map((item, i) => {
                    return (
                        <div key={i} className='flex flex-col my-2'>
                            <p>Question: {item.description}</p>
                            {item.alternative.map((alt, j) => {
                                return <p key={j}>{`Alternative ${j + 1}: ${alt.text}. Correct?: ${alt.isCorrect}`}</p>
                            })}
                        </div>
                    )
                })}
            </div>
            <QuestionForm 
                questions={questions}
                setQuestions={setQuestions}
            />
            <button className='flex flex-col border-2 border-black rounded mt-2' onClick={onCreateQuiz}>
                <h1 className='text-2xl my-2'>CREATE QUIZ</h1>
            </button>
        </div>
    )
}