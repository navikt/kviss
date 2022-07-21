import { useEffect, useState } from "react"
import { useQuiz } from "~/context/QuizContext"
import { ButtonProps } from "../routes/join/index"


export default function PinCode({ handleClick }: ButtonProps) {

    const [username, setUsername] = useState<string>("")
    const { pinCode } = useQuiz()

    useEffect(() => {
        const ws = new WebSocket(`ws://localhost:8080/game/${pinCode}`);
        ws.onopen = (event) => {
            console.log("Hello world")
        };
        ws.onmessage = function (event) {
            console.log(event.data)
        };
    }, [])

    return (
        <div className="text-center ">
            <form>
                <div>
                    <label>
                        Brukernavn:{" "}
                    </label>
                </div>
                <div>
                    <input
                        name="username"
                        type="text"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <button type="submit"
                        onClick={event => handleClick(event, username)}>
                        Neste
                    </button>
                </div>
            </form>
        </div>

    )

}