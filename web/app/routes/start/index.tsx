import {useNavigate} from '@remix-run/react'
import {ActionTypes} from '~/context/game/game'
import {useGameContext} from '~/context/game/GameContext'
import {IQuiz} from '~/context/QuizContext'
import {useEffect, useState} from 'react'
import EditIcon from '~/components/common/icons/EditIcon'
import DeleteIcon from '~/components/common/icons/DeleteIcon'
import { fetcher } from '~/api/operations'

export default function StartQuizIndexRoute() {
    const { dispatch } = useGameContext()
    const [quizes, setQuizes] = useState<IQuiz[]>([])

    const navigate = useNavigate()

    useEffect(() => {
        // @ts-ignore
        fetch(`${window.env.API_URL}/quiz`)
            .then(res => res.json())
            .then((res: IQuiz[]) => setQuizes(res))
    }, [])

    const startQuiz = async (quizId: number | undefined) => {
        // @ts-ignore
        fetcher(`${window.env.API_URL}/quiz/${quizId}`)
            .then(res => {
                console.log(res)
                dispatch({ type: ActionTypes.SET_CURRENT_QUIZ, payload: res as IQuiz })
            })
        // @ts-ignore
        fetch(`${window.env.API_URL}/game?quizid=${quizId}`, {
            method: 'POST'
        })
            .then(res => res.json())
            .then(res => {
                dispatch({ type: ActionTypes.SET_PINCODE, payload: res.gamePin })
                dispatch({ type: ActionTypes.SET_HOST_ID, payload: res.hostId })
            })
            .finally(() => navigate('../game/lobby/host'))
    }

    const onEditQuiz = (quizId: number | undefined) => {
        navigate(`../edit/${quizId}`)
    }

    const onDeleteQuiz = async (quizId: number | undefined) => {
        // @ts-ignore
        await fetch(`${window.env.API_URL}/quiz/${quizId}`, {
            method: 'DELETE'
        }).then(async () => {
            // @ts-ignore
            await fetch(`${window.env.API_URL}/quiz`)
                .then(res => res.json())
                .then((res: IQuiz[]) => setQuizes(res))
        })
    }

    return (
        <div className="flex flex-col">
            <table className="border-separate border-spacing-2 border border-slate-500 text-white">
                <thead>
                    <tr className="text-left">
                        <th>Quiz name</th>
                        <th>Description</th>
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
                            <td className='flex flex-row'>
                                <button
                                    onClick={() => startQuiz(quiz.id)}
                                    className="bg-lime-600 text-black font-bold py-2 px-4 rounded"
                                >
                                        Start Quiz
                                </button>
                            </td>
                            <td>
                                <button className='ml-4' onClick={() => onEditQuiz(quiz.id)}>
                                    <EditIcon />
                                </button>
                                <button className='ml-4' onClick={() => onDeleteQuiz(quiz.id)}>
                                    <DeleteIcon />
                                </button>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}