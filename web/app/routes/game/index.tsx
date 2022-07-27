import {useGameContext} from '~/context/game/GameContext'


export default function QuizView() {

    const { state } = useGameContext()

    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className={'text-2xl text-white'}>game view</h1>

            {/*<AnswerView toggleScoreboard={}*/}
        </div>
    )
}