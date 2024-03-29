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
    const [pinError, setPinError] = useState<string>()
    const [usernameError, setUsernameError] = useState<string>()

    const [username, setUsername] = useState<string>()
    const [pin, setPin] = useState<number>(0)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const exists: boolean = await gameExists(pin)
            .catch(ex => {
                return false
            })

        if (!exists) {
            setPinError('Invalid game-PIN!')
            setUsernameError(undefined)
            return
        }
        let player

        if (username?.trim().length !== 0) {
            player = await createPlayer(pin, username!.trim()).catch(ex => {
                // todo
            })
        } else {
            setUsernameError('Username cannot be empty!')
            return
        }


        if (!player?.id) {
            setUsernameError('Username taken!')
        }
        else {
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
        <>
            <div className='mt-4 ml-4'>
                <div className='float-left flex'>
                    <Button
                        onClick={() => navigate('../../')}
                    >
                        <h1 className='text-l my-2 text-white bg-grey'>Return to menu</h1>
                    </Button>
                </div>
                
            </div>
            <div className="flex flex-col h-screen justify-center items-center">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <Input
                        required
                        label="Username"
                        name="username"
                        type="text"
                        autoComplete="off"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <div className='text-white pb-6'>
                        {usernameError}
                    </div>
                    <Input
                        required
                        label="Pin code"
                        name="pinCode"
                        type="tel"
                        autoComplete="off"
                        onChange={(e) => setPin(parseInt(e.target.value))}
                    />
                    <div className='text-white pb-6'>
                        {pinError}
                    </div>
                    <Button type='submit'>
                    Next
                    </Button>
                </form>
            </div>
        </>
        
    )
}
