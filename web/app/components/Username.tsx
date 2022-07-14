import { useState } from "react"
import { ButtonProps } from "../routes/join/index"


export default function PinCode({ handleClick }: ButtonProps) {

    const [username, setUsername] = useState<string>("")

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