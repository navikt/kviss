import { useNavigate } from 'react-router-dom'

interface IAnswerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    answerText: string
    onButtonClick: () => void
}

export default function AnswerButton(
    {
        answerText,
        onButtonClick,
        ...rest
    }: IAnswerButtonProps) {

    const navigate = useNavigate()

    return (
        <button className="border-1 font-bold rounded-3xl my-2 p-1.5 w-9/12 h-20 bg-nord-grey drop-shadow-lg text-2xl" {...rest}
            onClick={e => onButtonClick()}>
            {answerText}
        </button>
    )
}