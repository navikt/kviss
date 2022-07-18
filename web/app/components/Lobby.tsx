import { useNavigate } from "@remix-run/react";
import { useState } from "react";
import { IPlayer } from "~/context/QuizContext";

const initPlayer: IPlayer = {
    "id": 1,
    name: "Hans Solobrus",
    score: 0
}

export default function LobbyView() {

    const navigate = useNavigate()
    const [players, setPlayers] = useState<IPlayer[]>([initPlayer])
    // TODO: add new players when they join the game

    return <>
        <div className={`flex flex-col h-screen justify-center items-center`}>
            <div className="flex flex-col h-40">
                {players.map((player) => {
                    return <div key={player.name}>
                        <p className="inline">{player.name}</p>
                    </div>
                })}
            </div>
            <button
                className="border-1 rounded-3xl my-2 p-1.5 w-36 h-20 bg-nord-grey drop-shadow-lg"
                onClick={() => navigate('./start')}>
                Start quiz
            </button>
        </div>
    </>
}