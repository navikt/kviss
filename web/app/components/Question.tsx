import { IQuestion, useQuiz } from "~/context/QuizContext"
import AnswerButton from "./answerButton"


export function Question({ description, alternative, id }: IQuestion) {


    const getIndex = (i: number | undefined): number => {
        return quiz.questions.findIndex((obj: IQuestion) => obj.id === i)
    }

    const { setQuestion, question, quiz } = useQuiz()


    const onQuestionAnswered = (answerIndex: number) => {
        if (alternative?.[answerIndex].isCorrect) {
            // TODO: Route to result screen with displaying that answer is correct
            //navigate(`./result`, { replace: true })
        }
        // TODO: Route to to result screen with displaying that answer is incorrect
        if (getIndex(id ? id + 1 : undefined)) {
            setQuestion(id ? quiz.questions[id + 1] : 1)
        }

    }


    return (
        <div className="flex flex-col h-screen justify-center items-center">
            <h1 className="text-2xl mb-4">{description}</h1>
            {alternative?.map((answer: any, i: number) => {
                return <AnswerButton
                    quizId={"1"}
                    key={i}
                    answerText={answer.text}
                    onButtonClick={() => onQuestionAnswered(i)}
                />
            })}
        </div>
    )
}