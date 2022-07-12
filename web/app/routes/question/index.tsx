import React, { useState } from "react";
import AnswerButton from "./answerButton";

interface IAnswer {
    answerText: string
    isCorrectAnswer: boolean
}

export default function QuestionView() {

    const onQuestionAnswered = (answerIndex: number) => {
        if (answers[answerIndex].isCorrectAnswer) {
            // TODO: Route to result screen with displaying that answer is correct
        }
        // TODO: Route to to result screen with displaying that answer is incorrect
    }

    const [answers, setAnswers] = useState<IAnswer[]>([
        {
            answerText: "Answer A",
            isCorrectAnswer: false
        },
        {
            answerText: "Answer B",
            isCorrectAnswer: false
        },
        {
            answerText: "Answer C",
            isCorrectAnswer: true
        },
        {
            answerText: "Answer D",
            isCorrectAnswer: false
        }
    ])

    return (
        <div className="flex flex-col h-screen justify-center items-center">
            {answers.map((answer, i) => {
                return <AnswerButton 
                    key={i}
                    answerText={answer.answerText} 
                    onClick={() => onQuestionAnswered(i)}
                />
            })}
        </div>
    )
}