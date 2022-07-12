import React, { useState } from "react";
import AnswerButton from "./answerButton";

interface IAnswer {
    answerText: string
    isCorrectAnswer: boolean
}

export default function QuestionView() {

    const onQuestionAnswered = () => {
        console.log("Hei")
    }

    const [answers, setAnswers] = useState<IAnswer[]>([
        {
            answerText: "Question A",
            isCorrectAnswer: false
        },
        {
            answerText: "Question B",
            isCorrectAnswer: false
        },
        {
            answerText: "Question C",
            isCorrectAnswer: true
        },
        {
            answerText: "Question D",
            isCorrectAnswer: false
        }
    ])

    return (
        <div>
            {answers.map((answer, i) => {
                return <AnswerButton 
                    key={i} 
                    answerText={answer.answerText} 
                    onAnswerClicked={onQuestionAnswered}
                />
            })}
        </div>
    )
}