import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AnswerView from '../../components/AnswerView'
import FinalScoreboard from '../../components/FinalScoreboard'
import { Question } from '../../components/Question'
import Scoreboard from '../../components/Scoreboard'
import WaitingView from '../../components/WaitingView'
import { ActionTypes } from '../../context/game/game'
import { useGameContext } from '../../context/game/GameContext'

export default function QuizView() {

    const { state } = useGameContext()
    const navigate = useNavigate()

    useEffect(() => {
        if (state.pin === undefined) {
            navigate('/join')
        }
    }, [])

    return (
        <div className="justify-center h-full q-full items-center flex">

            { state.currentQuestion && state.currentQuestion.sortOrder === state.currentQuiz?.questions!.length && state.lastEvent == ActionTypes.FINISH_QUESTION_EVENT ?
                <FinalScoreboard/>
                :
                <>
                    {state.lastEvent === undefined && state.hostId === undefined && <div className="text-white"> {state.player?.name} have joined! Do you see your name on the screen? </div>}
                    {state.lastEvent === ActionTypes.SEND_QUESTION_EVENT && <Question />}
                    {state.lastEvent === ActionTypes.SHOW_ANSWERS_EVENT && <AnswerView />}
                    {state.lastEvent === ActionTypes.HAS_ANSWERED_EVENT && <WaitingView/>}
                    {state.lastEvent === ActionTypes.FINISH_QUESTION_EVENT && <Scoreboard/>}
                </>
            }


        </div>
    )
}