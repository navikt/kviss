import React from "react";
import AnswerButton from "./answerButton";

export default function QuestionView() {

    

    return (
        <div>
            <AnswerButton question="Question A" />
            <AnswerButton question="Question B" />
            <AnswerButton question="Question C" />
            <AnswerButton question="Question D" />
        </div>
    )
}