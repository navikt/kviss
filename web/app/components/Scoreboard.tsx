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
            <Button
                onClick={nextQuestion}>
                Next Question
            </Button>
        </div>
    )
}
