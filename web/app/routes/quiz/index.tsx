import { useState } from 'react'
import { Question } from '~/components/Question'
import AnswerView from '~/components/AnswerView'
import CreateQuiz from './createQuiz'


export default function QuizView() {
    const [toggleScoreboard, setToggleScoreboard] = useState<boolean>(false)

    return (
        <CreateQuiz />
    )


}