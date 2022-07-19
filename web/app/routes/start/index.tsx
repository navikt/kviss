import { json, LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { IQuiz } from '~/context/QuizContext'


export const loader: LoaderFunction = async () => {
    const res = await fetch('https://navhoot-backend.dev.nav.no/quiz/5/questions')
    return json(await res.json())
}

export default function StartQuizIndexRoute() {


    const quizes: IQuiz[] = useLoaderData()

    const startQuiz = (quizId: number) => {
        console.log(quizId)
        // To do: Start quiz post request
    }

    return (
        <div className="flex flex-col h-screen justify-center items-center">
            <table className="border-separate border-spacing-2 border border-slate-500 bg-amber-100 md:border-spacing-4">
                <thead>
                    <tr>
                        <th>Quiz name</th>
                        <th>Description</th>
                        <th>Er utkast</th>
                        <th className="mt-3">Start</th>
                    </tr>
                </thead>
                <tbody>
                    {quizes.map((quiz: IQuiz, i: number) => {
                        return <tr key={`${i}`}>
                            <td>
                                {quiz.name}
                            </td>
                            <td>
                                {quiz.description}
                            </td>

                            <td>
                                {`${quiz.isDraft}`}
                            </td>
                            <td>
                                {!quiz.isDraft ?
                                    <button
                                        onClick={e => startQuiz(quiz.id)}
                                        className="bg-lime-600 text-black font-bold py-2 px-4 rounded">
                                        Start Quiz
                                    </button>
                                    : <button
                                        className="bg-lime-600 cursor-not-allowed text-black font-bold py-2 px-4 rounded opacity-50">
                                        Start Quiz
                                    </button>
                                }
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}