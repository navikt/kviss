import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { ScoreboardProps, useQuiz } from '~/context/QuizContext'


export default function Scoreboard(tb: ScoreboardProps): JSX.Element {

    const { quiz } = useQuiz()

    const onNameClick = () => {
        tb.toggleScoreboard(false)
    };

    return <>
        <div className="flex flex-col h-screen justify-center items-center">
            <button
                className="border-1 rounded-3xl my-2 p-1.5 w-40 h-20 bg-nord-grey drop-shadow-lg"
                onClick={() => onNameClick()}>
                Neste spørsmål
            </button>
        </div>
    </>
}