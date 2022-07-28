import AnswerView from '~/components/AnswerView'
import { Question } from '~/components/Question'
import Scoreboard from '~/components/Scoreboard'
import WaitingView from '~/components/WaitingView'
import { ActionTypes } from '~/context/game/game'
import {useGameContext} from '~/context/game/GameContext'


export default function QuizView() {

    const { state } = useGameContext()

    return (
        <div className="justify-center items-center">

            { state.lastEvent === ActionTypes.SEND_QUESTION_EVENT && <Question />}
            { state.lastEvent === ActionTypes.SEND_ANSWER_EVENT && <AnswerView />}
            { state.lastEvent === ActionTypes.HAS_ANSWERED_EVENT && <WaitingView/>}
            { state.lastEvent === ActionTypes.FINISH_QUESTION_EVENT && <Scoreboard/>}

            {/* Other views... */}
            {/* - Lobby */}
            {/* - Scoreboard */}
        </div>
    )
}