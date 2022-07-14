import { useState } from 'react'
import { Question } from '~/components/Question'
import { IQuestion, useQuiz } from '~/context/QuizContext'


export default function QuizView() {
    const { quiz, question } = useQuiz()


    return (
        <>
            <Question description={question?.description} id={question.id} alternative={question?.alternative}></Question>
        </>
    )


}
