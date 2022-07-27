import { json, LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { IQuiz } from '~/context/QuizContext'

export const loader: LoaderFunction = async ({ params }) => {
    const res = await fetch(`https://kviss-api.dev.nav.no/quiz/${params.quizId}`)
    return json(await res.json())
}

export default function EditQuiz() {

    const quiz: IQuiz = useLoaderData()

    return (
        <div>
            {quiz.name}
        </div>
    )
}