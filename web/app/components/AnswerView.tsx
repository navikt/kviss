import React from 'react'
import { useGameContext } from '../context/game/GameContext'

export default function AnswerView() {
    const { state } = useGameContext()

    const backroundColor = state.isQuestionCorrect ? 'bg-lime-500' : 'bg-rose-500'
    const feedbackText = state.isQuestionCorrect ? 'Correct answer!' : 'Wrong answer :('

    return <>
        <div className={`flex flex-col w-full h-full justify-center items-center ${backroundColor}`}>
            {feedbackText}
        </div>
    </>
}