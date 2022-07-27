import {useNavigate} from 'react-router-dom'
import Button from '~/components/common/Button'
import Input from '~/components/common/Input'
import {ActionTypes, IPlayer} from '~/context/game/game'
import {useGameContext} from '~/context/game/GameContext'
import {useState} from 'react'

export default function QuizIndexRoute() {
    const navigate = useNavigate()
    const {state, dispatch} = useGameContext()
    const [error, setError] = useState<string>()

    const [username, setUsername] = useState<string>()
    const [pin, setPin] = useState<number>(0)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const gameExists: boolean = await fetch(`http://kviss.dev.intern.nav.no/game/${pin}/exist`
        ).then((res: Response) => res.json())
            .then(exists => JSON.parse(exists))
            .catch(ex => {
                setError(ex.message)
                return false
            })

        if (!gameExists) return

        const player: IPlayer = await fetch(`http://kviss.dev.intern.nav.no/game/${pin}/player?playername=${username}`, {
            method: 'POST'
        }).then((res: Response) => {
            if (res.status === 200) {
                return res.json()
            } else {
                setError('Brukernavn ikke gyldig, e.l.')
            }
        }).catch(ex => {
            // todo
        })

        if (player) {
            dispatch({
                type: ActionTypes.SET_PLAYER,
                payload: player
            })
            dispatch({
                type: ActionTypes.SET_PINCODE,
                payload: pin
            })
            navigate('../game/lobby')
        }
    }

    return (
        <div className="flex flex-col h-screen justify-center items-center">
            <form onSubmit={((e) => handleSubmit(e))}>
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
