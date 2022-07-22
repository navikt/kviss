import { useNavigate } from 'react-router-dom'
import JoinGame from '~/components/JoinGame'
import { IGameProps, useGameContext } from '~/context/GameContext'

export type ButtonProps = {
    handleClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, joinDetails: IGameProps) => void
}

export default function QuizIndexRoute() {
    const navigate = useNavigate()
    const { setGameProps } = useGameContext()

    const handleClick = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, joinDetails: IGameProps) => {
        event.preventDefault()

        const response = await fetch(`https://kviss-backend.dev.nav.no/game/${joinDetails.pincode}/`, {
            body: JSON.stringify(joinDetails),
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
        })
            .then((res: Response) => {
                return res.json()
            })
            .catch((ex) => {
                alert('Invalid pincode')
                return 'bad response'
            })

        //Check if response is good
        console.log(response)
        if (response == 'bad response') return

        setGameProps(joinDetails)

        navigate('../game')
    }

    return (
        <div className="flex flex-col h-screen justify-center items-center">
            <JoinGame handleClick={handleClick} />
        </div>
    )
}
