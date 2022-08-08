import { IPlayer } from 'app/context/game/game'
import React from 'react'
import { useGameContext } from '../context/game/GameContext'

export default function AnswerView() {
    const { state } = useGameContext()

    const backroundColor = state.isQuestionCorrect ? 'bg-lime-600' : 'bg-rose-700'
    const feedbackText = state.isQuestionCorrect ? 'Correct answer!' : 'Wrong answer :('

    const players: IPlayer[] = state.players?.sort((a, b) => b.score - a.score) || []

    const position = players.map((player: IPlayer, i: number) => {
        if (player.id === state.player?.id) return i + 1
    })

    const score = players.filter(player => player.id === state.player?.id)[0].score

    return (
        <>
            <div className={`flex flex-col h-full w-full justify-center items-center font-bold  text-xl font-mono  text-white ${backroundColor}`}>
                {feedbackText}
                <div className="absolute bottom-7 pb-40 font-medium">
                    You are currently in {position}. place!
                </div>
                <div className="absolute bottom-0 pb-40 font-medium">
                    Score: {score} points!
                </div>          
            </div>
        </>
    )
}