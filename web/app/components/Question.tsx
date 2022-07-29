import { ReactElement } from 'react'
import { ActionTypes } from '~/context/game/game'
import { useGameContext } from '~/context/game/GameContext'
import { IAlternative, IQuestion } from '~/context/QuizContext'
import { useWebSocket } from '~/context/SocketContext'
import AnswerButton from './AnswerButton'
import Button from './common/Button'


export function Question(): ReactElement {

    const { state } = useGameContext()
    const ws = useWebSocket()


    const sendAnswer = async (answer: IAlternative) => { 
        ws?.send(JSON.stringify({
            'type': ActionTypes.SELECT_ANSWER_EVENT,
            'alternativeId': answer.id,
            'playerId': state.player?.id
        }))
    }

    const nextQuestion = async () => {
        if (state.hostId) {
            state.currentQuiz?.questions?.map((question: IQuestion) => {
                if (state.currentQuestion?.sortOrder === question.sortOrder - 1) {
                    ws?.send(JSON.stringify({
                        'type': ActionTypes.NEXT_QUESTION_EVENT,
                        'questionId': question.sortOrder,
                        'hostId': state.hostId
                    }))
                }
            })
        }
    }


    return (
        <div className="flex flex-col h-screen justify-center items-center">
            { !state.hostId ? 
                state.currentQuestion?.alternatives?.map((answer: IAlternative, i: number) => {
                    return <AnswerButton
                        key={i}
                        answerText={answer.text}
                        onButtonClick={() => sendAnswer(answer)}
                    />
                })
                :
                <>
                    <h1 className="text-2xl mb-4 text-white">{state.currentQuestion?.description}</h1>
                    <Button 
                        onClick={nextQuestion} 
                    >
                        <h1 className='text-2xl my-2'>Neste spørsmål</h1>
                    </Button>
                </>
            }
            
            
        </div>
    )
}