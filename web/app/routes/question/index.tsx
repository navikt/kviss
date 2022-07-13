import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import AnswerButton from "./answerButton";

interface IQuestionViewProps {
    description: string
    alternative: IAlternative[]
    questionIndex: number
}

interface IAlternative {
    text: string
    isCorrect: boolean
}

export default function QuestionView({
    description,
    alternative,
    questionIndex
}: IQuestionViewProps) {   
    const navigate = useNavigate()

    const onQuestionAnswered = (answerIndex: number) => {
        if (alternative[answerIndex].isCorrect) {
            // TODO: Route to result screen with displaying that answer is correct
            //navigate(`./result`, { replace: true })
        }
        // TODO: Route to to result screen with displaying that answer is incorrect
    }
    return (
        <div className="flex flex-col h-screen justify-center items-center">
            <h1 className="text-2xl mb-4">{description}</h1>
            {alternative.map((answer: any, i: number) => {
                return <AnswerButton 
                    key={i}
                    answerText={answer.text} 
                    onClick={() => onQuestionAnswered(i)}
                />
            })}
        </div>
    )
}