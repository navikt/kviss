import { Question } from '~/components/Question'
import { ActionTypes } from '~/context/game/game'
import {useGameContext} from '~/context/game/GameContext'


export default function QuizView() {

    const { state } = useGameContext()

    return (
        <div className="flex flex-col justify-center items-center">

            { state.lastEvent === ActionTypes.SEND_QUESTION_EVENT && <Question />}
           
            {/*<AnswerView toggleScoreboard={}*/}

            { state.lastEvent }

            {/* Other views... */}
            {/* - Lobby */}
            {/* - Scoreboard */}
        </div>
    )
}