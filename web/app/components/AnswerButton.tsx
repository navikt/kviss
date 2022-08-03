import React from 'react'
import { useNavigate } from 'react-router-dom'

interface IAnswerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    answerText: string
    onButtonClick: () => void
    color: string
}

export default function AnswerButton(
    {
        answerText,
        onButtonClick,
        color
    }: IAnswerButtonProps) {

    const navigate = useNavigate()

    return (
        <button className={'text-white border-1 font-bold rounded-3xl my-2 p-1.5 w-9/12 h-20 bg-nord-grey drop-shadow-lg text-2xl ' + color}
            
            onClick={e => onButtonClick()}>
            {answerText}
        </button>
    )
}