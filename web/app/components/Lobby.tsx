import { useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
import { useGameContext } from "~/context/GameContext";
import { IPlayer, useQuiz } from "~/context/QuizContext";
import { useWebSocket } from "~/context/SocketContext";

const initPlayer: IPlayer = {
    "id": 1,
    name: "Hans Solobrus",
    score: 0
}

export default function LobbyView() {

    const [players, setPlayers] = useState<IPlayer[]>([initPlayer])
    const { gameProps } = useGameContext()

    // TODO: add new players when they join the game

    const startGame = () => {

    }

    return <>
        <div className={`flex flex-col h-screen justify-center items-center`}>
            {gameProps.pincode}
            <div className="flex flex-col h-40 p-60">
                {players.map((player) => {
                    return <div key={player.name}>
                        <p className="inline">{player.name}</p>
                    </div>
                })}
            </div>
            <button
                className="border-1 rounded-3xl my-2 p-1.5 w-36 h-20 bg-nord-grey drop-shadow-lg"
                onClick={() => startGame()}>
                Start quiz
            </button>
        </div>
    </>
}

function socketIOClient(arg0: string) {
    throw new Error("Function not implemented.");
}
