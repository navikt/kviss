import AnswerButton from "./answerButton";

interface IAnswer {
    answerText: string
    isCorrectAnswer: boolean
}

export default function QuestionView({
    question,
    answers
}: {
    question: string
    answers: IAnswer[]
}) {

    const onQuestionAnswered = (answerIndex: number) => {
        if (answers[answerIndex].isCorrectAnswer) {
            // TODO: Route to result screen with displaying that answer is correct
        }
        // TODO: Route to to result screen with displaying that answer is incorrect
    }

    return (
        <div className="flex flex-col h-screen justify-center items-center">
            <h1 className="text-2xl mb-4">{question}</h1>
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