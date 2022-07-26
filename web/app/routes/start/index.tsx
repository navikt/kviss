import { json, LoaderFunction } from '@remix-run/node'

import { useLoaderData, useNavigate } from '@remix-run/react'
import { ActionTypes } from '~/context/game/game'
import { useGameContext } from '~/context/game/GameContext'
import { IQuiz } from '~/context/QuizContext'


export const loader: LoaderFunction = async () => {
    const res = await fetch('http://0.0.0.0:8080/quiz/')
    return json(await res.json())
}

export default function StartQuizIndexRoute() {

    const { dispatch } = useGameContext()
    const quizes: IQuiz[] = useLoaderData()
    const navigate = useNavigate()


    const startQuiz = async (quizId: number | undefined) => {
        fetch(`http://0.0.0.0:8080//game?quizid=${quizId}`, {
            method: 'POST'
        })
            .then(res => res.json())
            .then(res => {
                const pin = res.gamePin
                dispatch({ type: ActionTypes.SET_PINCODE, payload: pin })
            })
            .finally(() => navigate('../host'))


        // To do: set pin to context
    }

    return (
        <div className="flex flex-col">
            <table className="border-separate border-spacing-2 border border-slate-500 text-white">
                <thead>
                    <tr className="text-left">
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