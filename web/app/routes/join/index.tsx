import { useNavigate } from 'react-router-dom'
import JoinGame from '~/components/JoinGame'
import { ActionTypes } from '~/context/game/game';
import { useGameContext } from '~/context/game/GameContext';


export type ButtonProps = {
    handleClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, username: string, pincode: number) => void;
};


export default function QuizIndexRoute() {
    const navigate = useNavigate()
    const { state, dispatch } = useGameContext()

    const handleClick = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, username: string, pincode: number) => {
        event.preventDefault()

        const response: boolean = await fetch(`https://navhoot-backend.dev.nav.no/game/${pincode}/exist`
        ).then((res: Response) => {
            return res.json()
        }).catch(ex => {
            alert("Invalid pincode")
            return "bad response"
        });

        //Check if response is good
        console.log(response)
        if (!response) return

        dispatch({
            type: ActionTypes.SET_PINCODE,
            payload: { ...state, pin: pincode }
        })

        dispatch({
            type: ActionTypes.SET_USERNAME,
            payload: { ...state, username: username }
        })

        navigate('../game')
    }

    return (
        <div className="flex flex-col h-screen justify-center items-center">
            <JoinGame handleClick={handleClick} />
        </div>
    )
}
