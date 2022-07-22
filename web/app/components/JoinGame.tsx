import { useState } from "react"
import { ButtonProps } from "../routes/join/index"
import Button from "./common/Button"
import Input from "./common/Input"


export default function PinCode({ handleClick }: ButtonProps) {
    const [username, setUsername] = useState<string>("")
    const [pincode, setPinCode] = useState<number>(0)

    return (
        <div className="text-center flex flex-col">
            <form>
                <div>
                    <Input
                        label="Brukernavn"
                        name="username"
                        type="text"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div>
                    <Input
                        label="Pinkode"
                        name="pinCode"
                        type="text"
                        onChange={(e) => setPinCode(parseInt(e.target.value))}
                    />
                </div>
                <div>
                    <Button type="submit"
                        onClick={event => handleClick(event, username, pincode)}>
                        Neste
                    </Button>
                </div>
            </form>
        </div>
    )
}