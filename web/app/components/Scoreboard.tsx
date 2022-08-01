import { json, LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { ActionTypes } from '~/context/game/game'
import { useGameContext } from '~/context/game/GameContext'
import { IQuestion } from '~/context/QuizContext'
import { useWebSocket } from '~/context/SocketContext'
import Button from './common/Button'


export default function Scoreboard() {

    // TODO: change tmp json with players from the loader function once we can recieve data from backend
    const { state } = useGameContext()
    const ws = useWebSocket()
    const players = state.players?.sort((a, b) => b.score - a.score)

    const nextQuestion = async () => {
        if (state.hostId) {
            state.currentQuiz?.questions?.map((question: IQuestion) => {
                if (state.currentQuestion?.sortOrder === question.sortOrder - 1) {
                    ws?.send(JSON.stringify({
                        'type': ActionTypes.NEXT_QUESTION_EVENT,
                        'questionId': question.id,
                        'hostId': state.hostId
                    }))
                }
            })
        }
    }

    return (
        <div className="flex flex-col justify-center items-center">
            <h2 className="text-6xl pb-8 text-white">Leaderboard</h2>
            <div className="w-80 text-white">
                {players?.slice(0, 5).map((player, i) => {
                    // Shows top 5 players
                    return (
                        <div key={player.name}>
                            <p className="inline">{i+1}. {player.name}</p>
                            <p className="inline float-right">{player.score}</p>
                        </div>
                    )
                })}
            </div>
            <Button
                onClick={nextQuestion}>
                Neste Spørsmål
            </Button>
        </div>
    )
}
