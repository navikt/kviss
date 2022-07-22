import { useGameContext } from "~/context/game/GameContext"


export default function QuizView() {

    const { state, dispatch } = useGameContext()


    return (
        <div className="flex flex-col h-screen justify-center items-center">
            <button>
                {state.username}
            </button>
        </div>
    )
}