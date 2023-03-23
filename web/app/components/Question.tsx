import React from 'react'
import { ReactElement } from 'react'
import { ActionTypes } from '../context/game/game'
import { useGameContext } from '../context/game/GameContext'
import { IAlternative } from '../context/QuizContext'
import { useWebSocket } from '../context/SocketContext'
import AnswerButton from './AnswerButton'
import Button from './common/Button'
import SmallButton from './common/SmallButton'


export function Question(): ReactElement {

    const { state, dispatch } = useGameContext()
    const ws = useWebSocket()
    const ventemusikk = new Audio('/KvissSang_nr1.mp3')

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
        ventemusikk.pause()
        dispatch({
            type: ActionTypes.SET_LAST_EVENT,
            payload: ActionTypes.FINISH_QUESTION_EVENT
        })
        ws?.emit(ActionTypes.TRIGGER_ANSWER_EVENT, {
            'hostId': state.hostId
        })
        ws?.emit(ActionTypes.TRIGGER_UPDATE_PLAYER_LIST_EVENT, {
            'hostId': state.hostId
        })

        if (state.currentQuiz?.questions?.slice(-1)[0].id === state.currentQuestion?.id) {
            ws?.emit(ActionTypes.TRIGGER_LAST_QUESTION_EVENT)
        }
    }


    function startVentemusikk() {
        ventemusikk.play()
    }

    return (
        <>
            { !state.hostId ?
                <div className="justify-center items-center flex flex-col w-full">
                    {state.currentQuestion?.alternatives?.map((answer: IAlternative, i: number) => {
                        if(answer.text === '') return
                        return <AnswerButton
                            color={colors[i]}
                            key={i}
                            answerText={answer.text}
                            onButtonClick={() => sendAnswer(answer)}
                        />
                    })}
                </div>
                :
                <div className="flex flex-col justify-center items-center">
                    <h1 className="text-2xl mb-4 text-white">{state.currentQuestion?.description}</h1>
                    <Button
                        onClick={finishQuestion}
                    >
                        <h1 className='text-2xl my-2'>Next</h1>
                    </Button>
                    <SmallButton
                        onClick={startVentemusikk}
                    >
                        Ventemusikk
                    </SmallButton>
                    <div className="pb-2">
                        Pin code: {state.pin}
                    </div>
                    <div className="pb-2">
                        Question
                        {' ' + (state.currentQuestion ? state.currentQuestion?.sortOrder : 0)}
                        {' of ' + state.currentQuiz?.questions?.length}
                    </div>
                    <div className="text-white absolute bottom-40">
                        Players answered: {state.answeredNumber ? state.answeredNumber : 0} / {state.players?.length}
                    </div>
                </div>
            }

        </>
    )
}
