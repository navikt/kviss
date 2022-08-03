import React from 'react'
import { ReactElement } from 'react'
import { ActionTypes } from '../context/game/game'
import { useGameContext } from '../context/game/GameContext'
import { IAlternative } from '../context/QuizContext'
import { useWebSocket } from '../context/SocketContext'
import AnswerButton from './AnswerButton'
import Button from './common/Button'


export function Question(): ReactElement {

    const { state, dispatch } = useGameContext()
    const ws = useWebSocket()

    const colors = ['bg-[#BF616A]', 'bg-[#5E81AC]', 'bg-[#EBCB8B]', 'bg-[#A3BE8C]']
    const sendAnswer = async (answer: IAlternative) => { 
        ws?.emit('SELECT_ANSWER_EVENT', {
            'alternativeId': answer.id,
            'playerId': state.player?.id
        })
        dispatch({ 
            type: ActionTypes.SET_LAST_EVENT,
            payload: ActionTypes.HAS_ANSWERED_EVENT
        })
    }

    const finishQuestion = async () => {
        dispatch({ 
            type: ActionTypes.SET_LAST_EVENT,
            payload: ActionTypes.FINISH_QUESTION_EVENT
        })
        ws?.emit('TRIGGER_ANSWER_EVENT', {
            'hostId': state.hostId
        })
        ws?.emit(ActionTypes.TRIGGER_UPDATE_PLAYER_LIST_EVENT, {
            'hostId': state.hostId
        })
    }
    


    return (
        <div className="flex flex-col h-full justify-center items-center">
            { !state.hostId ? 
                state.currentQuestion?.alternatives?.map((answer: IAlternative, i: number) => {
                    return <AnswerButton
                        color={colors[i]}
                        key={i}
                        answerText={answer.text}
                        onButtonClick={() => sendAnswer(answer)}
                    />
                })
                :
                <>
                    <h1 className="text-2xl mb-4 text-white">{state.currentQuestion?.description}</h1>
                    <Button 
                        onClick={finishQuestion} 
                    >
                        <h1 className='text-2xl my-2'>Neste</h1>
                    </Button>
                    <div className="text-white">
                        Spillere svart: {state.answeredNumber ? state.answeredNumber : 0} / {state.players?.length}
                    </div>
                </>
            }
            
            
        </div>
    )
}