import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import { ActionTypes } from '../../context/game/game'
import { useGameContext } from '../../context/game/GameContext'
import { createPlayer, gameExists } from '../../api/api'

export default function QuizIndexRoute() {
    const navigate = useNavigate()
    const {state, dispatch} = useGameContext()
    const [error, setError] = useState<string>()

    const [username, setUsername] = useState<string>()
    const [pin, setPin] = useState<number>(0)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const exists: boolean = await gameExists(pin)
            .catch(ex => {
                setError(ex.message)
                return false
            })

        if (!exists) return

        const player = await createPlayer(pin, username!).catch(ex => {
            // todo
        })

        if (player?.id) {
            dispatch({
                type: ActionTypes.SET_PLAYER,
                payload: player
            })
            dispatch({
                type: ActionTypes.SET_PINCODE,
                payload: pin
            })
            navigate('/game')
        }
    }

    return (
        <div className="flex flex-col h-screen justify-center items-center">
            <form onSubmit={(e) => handleSubmit(e)}>
                <Input
                    required
                    label="Brukernavn"
                    name="username"
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                />

                <Input
                    required
                    label="Pinkode"
                    name="pinCode"
                    type="tel"
                    onChange={(e) => setPin(parseInt(e.target.value))}
                />

                <Button type='submit'>
                    Neste
                </Button>
            </form>
        </div>
    )
}
