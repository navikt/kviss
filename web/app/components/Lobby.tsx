import { useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
import { IPlayer, useQuiz } from "~/context/QuizContext";
import { io, Manager } from "socket.io-client";

const initPlayer: IPlayer = {
    "id": 1,
    name: "Hans Solobrus",
    score: 0
}

export default function LobbyView() {

    const navigate = useNavigate()
    const [players, setPlayers] = useState<IPlayer[]>([initPlayer])
    const { pinCode } = useQuiz()
    // TODO: add new players when they join the game

    const startGame = () => {

        //const socket = io.connect(`ws://localhost:8080/game/${pinCode}`)
        //console.log(socket.id)




    }
    useEffect(() => {
        const ws = new WebSocket(`ws://localhost:8080/game/${pinCode}`);
        ws.onopen = (event) => {
            console.log("Hello world")
        };
        ws.onmessage = function (event) {
            console.log(event.data)
        };
    }, [])

    return <>
        <div className={`flex flex-col h-screen justify-center items-center`}>
            {pinCode}
            <div className="flex flex-col h-40">
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
