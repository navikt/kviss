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
                    onClick={() => onQuestionAnswered(i)}
                />
            })}
        </div>
    )
}