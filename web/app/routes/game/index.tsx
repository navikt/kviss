import { Question } from '~/components/Question'
import Scoreboard from '~/components/Scoreboard'
import { ActionTypes } from '~/context/game/game'
import {useGameContext} from '~/context/game/GameContext'


export default function QuizView() {

    const { state } = useGameContext()

    return (
        <div className="flex flex-col justify-center items-center">

            { state.lastEvent === ActionTypes.SEND_QUESTION_EVENT && <Question />}
            { state.lastEvent === ActionTypes.SEND_ANSWER_EVENT && <Scoreboard />}

            {/* Other views... */}
            {/* - Lobby */}
            {/* - Scoreboard */}
        </div>
    )
}