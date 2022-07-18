import { json, LoaderFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { useQuiz } from "~/context/QuizContext"


export const loader: LoaderFunction = async () => {

    const { quiz } = useQuiz()
    const res = await fetch(`https://navhoot-backend.dev.nav.no/game/${quiz.id}/players`)

    return json(await res.json())
}

const tmp = (
    [
        {
            "id": 1,
            "name": "Benjamin Dover",
            "score": 69
        },
        {
            "id": 3,
            "name": "Lukas Himmelvandrer",
            "score": 1337
        },
        {
            "id": 2,
            "name": "Hans Solobrus",
            "score": 420
        },
        {
            "id": 4,
            "name": "Lena Himmelvandrer",
            "score": 999
        },
        {
            "id": 2,
            "name": "Ole-Mann Kennedy",
            "score": 22
        },
        {
            "id": 2,
            "name": "Daniel Vedum",
            "score": 9
        }
    ]
)

export default function Scoreboard() {

    const players = useLoaderData()

    // TODO: change tmp json with players from the loader function once we can recieve data from backend
    tmp.sort((a, b) => b.score - a.score);

    return (
        <>
            <div className="flex flex-col h-screen justify-center items-center">
                <h2 className="text-6xl pb-8">Leaderboard</h2>
                <div className="w-80">
                    {tmp.slice(0, 5).map((player, i) => { // Shows top 5 players
                        return <div key={player.name}>
                            <p className="inline">{player.name}</p>
                            <p className="inline float-right">{player.score}</p>
                        </div>
                    })}
                </div>
            </div>
        </>
    )
}