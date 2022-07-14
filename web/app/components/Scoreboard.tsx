import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { useQuiz } from '~/context/QuizContext'


export const loader = async ({ params }: { params: any }) => {
    return json({
        quizId: params.quizId
    })
}

export default function scoreBoardSlug() {
    const { quiz } = useQuiz()
    const { quizId } = useLoaderData()

    console.log(quiz)


    return <>
        scoreBoard

    </>
}