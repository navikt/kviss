export default function AnswerButton({question}: {question: string}) {
    return (
        <button className="border mx-1">
            {question}
        </button>
    )
}