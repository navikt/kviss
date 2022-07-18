import { useState } from 'react'
import { Question } from '~/components/Question'
import AnswerView from '~/components/AnswerView'


export default function QuizView() {
    const [toggleScoreboard, setToggleScoreboard] = useState<boolean>(false)

    return (
        <>
            {toggleScoreboard ?
                <AnswerView toggleScoreboard={setToggleScoreboard}></AnswerView> :
                <Question toggleScoreboard={setToggleScoreboard}></Question>}
        </>
    )


}