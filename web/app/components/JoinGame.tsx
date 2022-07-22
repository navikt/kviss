import { IGameProps } from "~/context/GameContext"
import { ButtonProps } from "../routes/join/index"


export default function PinCode({ handleClick }: ButtonProps) {

    const joinDetails: IGameProps = {} as IGameProps

    return (
        <div className="text-center flex flex-col">
            <form>
                <div>
                    <label>
                        Brukernavn:
                    </label>
                </div>
                <div>
                    <input
                        name="username"
                        type="text"
                        onChange={(e) => joinDetails.username = e.target.value}
                    />
                </div>
                <label>
                    Pin code:
                </label>
                <div>
                    <input
                        name="pinCode"
                        type="text"
                        onChange={(e) => joinDetails.pincode = parseInt(e.target.value)}
                    />
                </div>
                <div>
                    <button type="submit"
                        onClick={event => handleClick(event, joinDetails)}>
                        Nest
                    </button>
                </div>
            </form>
        </div>
    )
}