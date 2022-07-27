import {useNavigate} from '@remix-run/react'
import {ActionTypes} from '~/context/game/game'
import {useGameContext} from '~/context/game/GameContext'
import {IQuiz} from '~/context/QuizContext'
import {useEffect, useState} from 'react'
import UnlikeIcon from '~/components/common/icons/UnlikeIcon'
import LikeIcon from '~/components/common/icons/LikeIcon'
import EditIcon from '~/components/common/icons/EditIcon'
import DeleteIcon from '~/components/common/icons/DeleteIcon'

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

    return (
        <div className="flex flex-col">
            <table className="border-separate border-spacing-2 border border-slate-500 text-white">
                <thead>
                    <tr className="text-left">
                        <th>Quiz name</th>
                        <th>Description</th>
                        <th>Utkast</th>
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
                            <td className=''>
                                {!quiz.isDraft 
                                    ? <UnlikeIcon />
                                    : <LikeIcon />
                                }
                            </td>
                            <td className='flex flex-row'>
                                {!quiz.isDraft 
                                    ? <button
                                        onClick={e => startQuiz(quiz.id)}
                                        className="bg-lime-600 text-black font-bold py-2 px-4 rounded">
                                        Start Quiz
                                    </button>
                                    : <button
                                        className="bg-lime-600 cursor-not-allowed text-black font-bold py-2 px-4 rounded opacity-50">
                                        Start Quiz
                                    </button>
                                }
                                <button className='ml-4'>
                                    <EditIcon />
                                </button>
                                <button className='ml-4'>
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