import { useNavigate } from "react-router-dom";
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

    const navigate = useNavigate()

    const onQuestionAnswered = (answerIndex: number) => {
        if (answers[answerIndex].isCorrectAnswer) {
            // TODO: Route to result screen with displaying that answer is correct
            navigate('./result', { replace: true })
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