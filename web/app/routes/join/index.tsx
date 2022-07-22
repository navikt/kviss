import { useNavigate } from 'react-router-dom'
import Button from '~/components/common/Button';
import Input from '~/components/common/Input';
import { ActionTypes } from '~/context/game/game';
import { useGameContext } from '~/context/game/GameContext';



export default function QuizIndexRoute() {
    const navigate = useNavigate()
    const { state, dispatch } = useGameContext()


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const response = await fetch(`https://kviss-api.dev.nav.no/game/${state.pin}/exist`
        ).then((res: Response) => {
            return res.json()
        }).catch(ex => {
            return false
        });

        //Check if response is good
        console.log(response)
        if (!response) {
            alert("Spill ikke funnet")
            return
        }

        navigate('../game')
    }

    return (
        <div className="flex flex-col h-screen justify-center items-center">
            <form onSubmit={handleSubmit}>
                <Input
                    label="Brukernavn"
                    name="username"
                    type="text"
                    onChange={(e) => dispatch({
                        type: ActionTypes.SET_USERNAME,
                        payload: e.target.value
                    })}
                />

                <Input
                    label="Pinkode"
                    name="pinCode"
                    type="text"
                    onChange={(e) => dispatch({
                        type: ActionTypes.SET_PINCODE,
                        payload: e.target.value
                    })}
                />

                <Button>
                    Neste
                </Button>
            </form>
        </div>
    )
}
