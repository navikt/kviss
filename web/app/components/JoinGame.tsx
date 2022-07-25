import { IGameProps } from "~/context/GameContext"
import { ButtonProps } from "../routes/join/index"
import Button from "./common/Button"
import Input from "./common/Input"


export default function PinCode({ handleClick }: ButtonProps) {

    const joinDetails: IGameProps = {} as IGameProps

    return (
        <div className="text-center flex flex-col">
            <form>
                <div>
                    <Input
                        label="Brukernavn"
                        name="username"
                        type="text"
                        onChange={(e) => joinDetails.username = e.target.value}
                    />
                </div>
                <div>
                    <Input
                        label="Pinkode:"
                        name="pinCode"
                        type="text"
                        onChange={(e) => joinDetails.pincode = parseInt(e.target.value)}
                    />
                </div>
                <div>
                    <Button
                        onClick={event => handleClick(event, joinDetails)}
                        color="primary">
                        Neste
                    </Button>
                </div>
            </form>
        </div>
    )
}