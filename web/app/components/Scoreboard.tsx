import React from 'react'
import { useEffect, useState } from 'react'
import Button from '../components/common/Button'
import { useGameContext } from '../context/game/GameContext'
import { useWebSocket } from '../context/SocketContext'
import { IPlayer } from '../context/game/game'
import { IAlternative, IQuestion } from '../context/QuizContext'
import AnswerButton from './AnswerButton'

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
            <div className="w-full text-white pb-5">
                <div>
                    Question:
                    {state.currentQuestion?.description}
                </div>
                {state.currentQuestion?.alternatives
                    .map((alternative: IAlternative, i: number) => {
                        if(alternative.text === '') return
                        return <AnswerButton
                            color={isCorrectAnswer(state.currentQuestion?.id, alternative.id)? 'bg-lime-600' : 'bg-rose-700'}
                            key={i}
                            answerText={alternative.text}
                            onButtonClick={() => {return}}
                        />
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
