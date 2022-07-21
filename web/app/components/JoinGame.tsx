import { useEffect, useState } from "react"
import { IJoinProps } from "~/context/JoinContext"
import { useQuiz } from "~/context/QuizContext"
import { ButtonProps } from "../routes/join/index"


export default function PinCode({ handleClick }: ButtonProps) {

    const joinDetails: IJoinProps = {} as IJoinProps


    return (
        <div className="text-center ">
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
                <br />
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
                <br />
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