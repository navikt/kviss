import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import AnswerButton from "./answerButton";

export function CatchBoundary() {}

export const loader: LoaderFunction = async () => {
    const res = await fetch("http://navhoot-backend.dev.nav.no/quiz")
    return json(await res.json())
}

export default function QuestionView() {
    const quiz = useLoaderData();
    
    const onQuestionAnswered = (answerIndex: number) => {
        if (quiz.questions[0].alternative[answerIndex].isCorrect) {
            // TODO: Route to result screen with displaying that answer is correct
            //navigate('./result', { replace: true })
        }
        // TODO: Route to to result screen with displaying that answer is incorrect
    }
    if (!quiz?.questions) return <></>
    return (
        <div className="flex flex-col h-screen justify-center items-center">
            <h1 className="text-2xl mb-4">{quiz.questions[0].description}</h1>
            {quiz ? quiz.questions[0].alternative.map((answer: any, i: number) => {
                return <AnswerButton 
                    key={i}
                    answerText={answer.text} 
                    onClick={() => onQuestionAnswered(i)}
                />
            }): <div>Hello</div> }
        </div>
    )
}