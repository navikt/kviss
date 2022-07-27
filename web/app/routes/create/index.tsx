import { ChangeEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCreateQuiz } from '~/api/hooks/useQuiz'
import { poster } from '~/api/operations'
import Button from '~/components/common/Button'
import QuestionForm from '~/components/quizAdministration/QuestionForm'
import QuestionsPreview from '~/components/quizAdministration/QuestionsPreview'
import QuizInformationForm from '~/components/quizAdministration/QuizInformationForm'
import { IAlternative, IQuestion, IQuiz } from '~/context/QuizContext'

export interface IQuizInfo {
    name: string
    description: string
}

export default function CreateQuiz() {

    const navigate = useNavigate()

    const [quizInfo, setQuizInfo] = useState<IQuizInfo>({
        name: '',
        description: ''
    })

    const [questions, setQuestions] = useState<IQuestion[]>([])

    const onCreateQuiz = async () => {
        const {response, error} = await useCreateQuiz({
            name: quizInfo.name,
            description: quizInfo.description,
        })

        Promise.resolve(response).then(async (value) => {
            questions.map(async (item) => {
                item.quizId = value
                await poster(`https://kviss-api.dev.nav.no/quiz/${value as number}/questions`, item)
            })
        }).then(() => navigate('../start'))
    }

    return (
        <div className='flex flex-col h-screen justify-center items-center'>
            <h2 className='text-2xl mb-2 text-gray-900 dark:text-gray-300'>Quiz info</h2>
            <QuizInformationForm quizInfo={quizInfo} setQuizInfo={setQuizInfo} />
            <h2 className='text-2xl my-2 text-gray-900 dark:text-gray-300'>Questions</h2>
            <QuestionsPreview questions={questions} setQuestions={setQuestions}/>
            <Button onClick={onCreateQuiz}>
                <h1 className='text-2xl my-2'>CREATE QUIZ</h1>
            </Button>
        </div>
    )
}