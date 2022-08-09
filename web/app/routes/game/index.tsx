import Button from '../../components/common/Button'
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
import logo from '../../public.svg'

export default function QuizView() {

    const { state } = useGameContext()
    const navigate = useNavigate()

    useEffect(() => {
        if (state.pin === undefined) {
            navigate('/join')
        }
    }, [])

    return (
        <div className="justify-center h-full w-full items-center flex font-bold  text-xl font-mono">

            { state.currentQuestion && state.currentQuestion.sortOrder === state.currentQuiz?.questions!.length && state.lastEvent == ActionTypes.FINISH_QUESTION_EVENT ?
                <div className='h-full w-full'>
                    <div className='mt-4 ml-4'>
                        <div className='flex'>
                            <Button 
                                onClick={() => navigate('../../')} 
                            >
                                <h1 className='text-l my-2 text-white'>Return to menu</h1>
                            </Button>
                    </div>
                    <FinalScoreboard/>
                </div>
                
                :
                <>
                    {state.lastEvent === undefined && state.hostId === undefined && 
                        <>
                            <div className="text-white text-xl font-mono text-center"> {state.player?.name} joined the game! <br/> <br/> Do you see your name on the screen?</div>
                            <div className="flex flex-col absolute bottom-7">
                                <span className="animate-bounce">
                                    <img src='/Rød.svg' className="h-40"/>
                                </span>
                            </div>
                        </>
                    }
                    {state.lastEvent === ActionTypes.SEND_QUESTION_EVENT && <Question />}
                    {state.lastEvent === ActionTypes.SHOW_ANSWERS_EVENT && <AnswerView />}
                    {state.lastEvent === ActionTypes.HAS_ANSWERED_EVENT && <WaitingView/>}
                    {state.lastEvent === ActionTypes.FINISH_QUESTION_EVENT && <Scoreboard/>}
                    {state.lastEvent === ActionTypes.LAST_QUESTION_EVENT && 
                    <>
                        <div className='h-full w-full'>
                            <div className='mt-4 ml-4'>
                                <div className='flex'>
                                    <Button 
                                        onClick={() => navigate('../../')} 
                                    >
                                        <h1 className='text-l my-2 text-white'>Return to menu</h1>
                                    </Button>
                                </div>
                            </div>
                            <div className='flex flex-col h-full justify-center items-center -pt-10'>
                                <FinalScoreboard/>
                            </div>
                        </div>
                    </>
                    }
                </>
            }


        </div>
    )
}
