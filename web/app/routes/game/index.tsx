import Button from '~/components/common/Button'
import { useGameContext } from '~/context/game/GameContext'
import { useWebSocket } from '~/context/SocketContext'


export default function QuizView() {

    const { state } = useGameContext()
    const ws = useWebSocket()

    const joinGameEvent = {
        type: 'JOIN_GAME_EVENT',
        playerName: state.username
    }

    const startGameEvent = {
        type: 'START_GAME_EVENT',
        hostId: 420
    }

    return (
        <div className="flex flex-col h-screen justify-center items-center">
            <Button onClick={() => ws?.send(JSON.stringify(joinGameEvent))}>
                Join game
            </Button>
            <Button onClick={() => ws?.send(JSON.stringify(startGameEvent))}>
                Start game
            </Button>
            {state.currentQuestion?.description}
        </div>
    )
}