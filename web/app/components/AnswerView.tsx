import { useState } from 'react'
import { ScoreboardProps } from '~/context/QuizContext'


export default function AnswerView(tb: ScoreboardProps): JSX.Element {
    const [correct, setCorrect] = useState<Boolean>(true)
    const [score, setScore] = useState<number>(69)

    const onNameClick = () => {
        tb.toggleScoreboard(false)
    };

    const backroundColor = correct ? "bg-lime-500" : "bg-rose-500"
    const feedbackText = correct ? "Correct answer!" : "Wrong answer :("

    return <>
        <div className={`flex flex-col h-screen justify-center items-center ${backroundColor}`}>
            {feedbackText}
            <button
                className="border-1 rounded-3xl my-2 p-1.5 w-40 h-20 bg-nord-grey drop-shadow-lg"
                onClick={() => onNameClick()}>
                Neste spørsmål
            </button>
            Your score: {score}
        </div>
    </>
}