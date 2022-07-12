interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    answerText: string
} 

export default function AnswerButton(
    {
        answerText,
        ...rest
    }: IButtonProps) {

    return (
        <button className="border mx-1" {...rest} >
            {answerText}
        </button>
    )
}