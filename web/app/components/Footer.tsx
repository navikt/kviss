import React from 'react'
import {useGameContext} from '../context/game/GameContext'

export default function Footer() {
    const { state } = useGameContext()
    return (
        <footer className="w-full pb-5 pt-5 border-t border-slate-600 flex justify-between">
            {state.pin &&
                <div className="px-3 text-slate-400 text-left">Pin code: {state.pin}</div>
            }
            <div className="text-center text-slate-400 align-center flex-1">kviss™</div>
            {(state.pin && state.currentQuestion && state.currentQuestion.sortOrder > 0) &&
                <div className="px-3 text-slate-400 text-right">
                    Question
                    {' ' + (state.currentQuestion ? state.currentQuestion?.sortOrder : 0)}
                    {' of ' + state.currentQuiz?.questions?.length}
                </div>
            }

        </footer>
    )
}
