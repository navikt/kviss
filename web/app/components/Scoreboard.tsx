import React from 'react'
import { useEffect, useState } from 'react'
import Button from './common/Button'
import { useGameContext } from '../context/game/GameContext'
import { useWebSocket } from '../context/SocketContext'
import { IPlayer } from '../context/game/game'
import { IQuestion } from '../context/QuizContext'

export default function Scoreboard() {

    const { state } = useGameContext()
    const ws = useWebSocket()
    const [players, setPlayers] = useState<IPlayer[]>()

    useEffect(() => {
        if (!state.players) return
        setPlayers(state.players?.sort((a, b) => b.score - a.score))
    },[state.players])

    const nextQuestion = async () => {
        if (state.hostId) {
            state.currentQuiz?.questions?.map((question: IQuestion) => {
                if (state.currentQuestion?.sortOrder === question.sortOrder - 1) {
                    ws?.emit('NEXT_QUESTION_EVENT', {
                        'quizId': state.currentQuiz?.id,
                        'questionId': question.id,
                        'hostId': state.hostId
                    })
                }
            })
        }
    }

    function isCorrectAnswer(questionId: number | undefined, alternativeId: number | undefined): boolean | undefined {
        if (!questionId) return undefined
        if (!alternativeId) return undefined
        return state.currentQuiz?.questions?.filter((question) => question.id === questionId)[0]
            .alternatives.filter((alternative) => alternative.id === alternativeId)[0].isCorrect
    }

    return (
        <div className="flex flex-col justify-center h-full items-center">
            <h2 className="text-6xl pb-8 text-white">Leaderboard</h2>
            <div className="w-80 text-white pb-40">
                {players?.slice(0, 5).map((player, i) => {
                    // Shows top 5 players
                    return (
                        <div key={player.name}>
                            <p className="inline">{i+1}. {player.name}</p>
                            <p className="inline float-right">{player.score}</p>
                        </div>
                    )
                })}
            </div>
            <div className="w-full text-white pb-40">
                <div>
                    Question:
                    {state.currentQuestion?.description}
                </div>
                <div className={'text-white pt-4'}>
                    Correct answer:
                </div>
                {state.currentQuestion?.alternatives
                    .map((alternative) => {
                        if(alternative.text === '') return
                        if(!isCorrectAnswer(state.currentQuestion?.id, alternative.id)) return
                        return <div className={'text-white'} key={alternative.id}>
                            {alternative.text}
                        </div>
                    })
                }
                <div className={'text-gray-700 dark:text-gray-600 pt-4'}>
                    Other answers:
                </div>
                {state.currentQuestion?.alternatives
                    .map((alternative) => {
                        if(alternative.text === '') return
                        if(isCorrectAnswer(state.currentQuestion?.id, alternative.id)) return
                        return <div className={'text-gray-700 dark:text-gray-600'} key={alternative.id}>{alternative.text}</div>
                    })
                }
            </div>
            <Button
                onClick={nextQuestion}>
                Next Question
            </Button>
        </div>
    )
}
