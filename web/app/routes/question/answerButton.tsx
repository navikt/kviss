import type { ChangeEvent } from "react"

export default function AnswerButton(
    {
        answerText, 
        onAnswerClicked
    }: {
        answerText: string
        onAnswerClicked: () => void
    }) {
    return (
        <button className="border mx-1" onClick={onAnswerClicked} >
            {answerText}
        </button>
    )
}