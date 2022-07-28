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
        <button className="border-1 rounded-3xl my-2 p-1.5 w-9/12 h-40 bg-nord-grey drop-shadow-lg" {...rest}
            onClick={e => onButtonClick()}>
            {answerText}
        </button>
    )
}