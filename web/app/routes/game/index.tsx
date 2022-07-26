import Button from '~/components/common/Button'
import { useGameContext } from '~/context/game/GameContext'
import { useWebSocket } from '~/context/SocketContext'
import AnswerView from "~/components/AnswerView";


export default function QuizView() {

    const { state } = useGameContext()

    return (
        <div className="flex flex-col h-screen justify-center items-center">
            {/*<AnswerView toggleScoreboard={}*/}
        </div>
    )
}