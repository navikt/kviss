import React from 'react'
import { ActionTypes } from '../../context/game/game'
import { useGameContext } from '../../context/game/GameContext'
import { IQuiz } from '../../context/QuizContext'
import { useEffect, useState } from 'react'
import EditIcon from '../../components/common/icons/EditIcon'
import DeleteIcon from '../../components/common/icons/DeleteIcon'
import { useNavigate } from 'react-router-dom'
import { createGameWithQuizId, deleteQuizById, getAllQuizes, getQuizById } from '../../api/api'

export default function StartQuizIndexRoute() {
    const { dispatch } = useGameContext()
    const [quizes, setQuizes] = useState<IQuiz[]>([])

    const navigate = useNavigate()

    useEffect(() => {
        getAllQuizes()
            .then((res: IQuiz[]) => setQuizes(res.sort((a, b) => a.id! - b.id!))) // Mulig skummel dersom quiz ikke har id?
    }, [])

    const startQuiz = async (quizId: number) => {
        getQuizById(quizId)
            .then(res => {
                console.log(res)
                dispatch({ type: ActionTypes.SET_CURRENT_QUIZ, payload: res as IQuiz })
            })

        createGameWithQuizId(quizId)
            .then(res => {
                dispatch({ type: ActionTypes.SET_PINCODE, payload: res.gamePin })
                dispatch({ type: ActionTypes.SET_HOST_ID, payload: res.hostId })
            })
            .finally(() => navigate('/game/lobby/host'))
    }

    const onEditQuiz = (quizId: number | undefined) => {
        navigate(`/edit/${quizId}`)
    }

    const onDeleteQuiz = async (quizId: number) => {
        deleteQuizById(quizId)
            .then((success: boolean) => {
                if (success) {
                    const newQuizList = [...quizes].filter(quiz => quiz.id !== quizId)
                    setQuizes(newQuizList)
                } else {
                    throw Error('Feil ved sletting av quiz')
                }
            })
    }

    return (
        <div className="flex flex-col justify-center items-center">
            <table className="border-separate border-spacing-2 border border-slate-500 text-white">
                <thead>
                    <tr className="text-left">
                        <th>Quiz name</th>
                        <th>Description</th>
                        <th className='text-center'>Questions</th>
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
                            <td className='text-center'>
                                {quiz.questions ? quiz.questions?.length : 0}
                            </td>
                            <td className='flex flex-row'>
                                <button
                                    onClick={() => startQuiz(quiz.id!)}
                                    className="bg-lime-600 text-black font-bold py-2 px-4 rounded"
                                >
                                        Start Kviss
                                </button>
                            </td>
                            <td>
                                <button className='ml-4' onClick={() => onEditQuiz(quiz.id)}>
                                    <EditIcon />
                                </button>
                                <button className='ml-4' onClick={() => onDeleteQuiz(quiz.id!)}>
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
