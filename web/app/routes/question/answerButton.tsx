interface IAnswerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    answerText: string
} 

export default function AnswerButton(
    {
        answerText,
        ...rest
    }: IAnswerButtonProps) {

    return (
        <button className="border-1 rounded-3xl my-2 p-1.5 w-9/12 h-40 bg-nord-grey drop-shadow-lg" {...rest} >
            {answerText}
        </button>
    )
}