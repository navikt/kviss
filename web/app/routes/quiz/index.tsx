import { useState } from 'react'
import { Question } from '~/components/Question'
import Scoreboard from '~/components/Scoreboard'
import { IQuestion, useQuiz } from '~/context/QuizContext'


export default function QuizView() {
    const { quiz, question } = useQuiz()
    const [toggleScoreboard, setToggleScoreboard] = useState<boolean>(false)

    return (
        <>
            {toggleScoreboard ?
                <Scoreboard toggleScoreboard={setToggleScoreboard}></Scoreboard> :
                <Question toggleScoreboard={setToggleScoreboard}></Question>}
        </>
    )


}
