import { IPlayer } from 'app/context/game/game'
import React from 'react'
import { useGameContext } from '../context/game/GameContext'

export default function AnswerView() {
    const { state } = useGameContext()

    const backroundColor = state.isQuestionCorrect ? 'bg-lime-500' : 'bg-rose-500'
    const feedbackText = state.isQuestionCorrect ? 'Correct answer!' : 'Wrong answer :('

    const players: IPlayer[] = state.players?.sort((a, b) => b.score - a.score) || []

    const position = players.map((player: IPlayer, i: number) => {
        if (player.id === state.player?.id) return i + 1
    })

    const score = players.filter(player => player.id === state.player?.id)[0].score

    return (
        <>
            <div className={`flex flex-col h-full justify-center items-center ${backroundColor}`}>
                {feedbackText}
                <div>
                    You are currently in {position}.st place!
                </div>
                <div>
                    You have {score} points!
                </div>          
            </div>
        </>
    )
}