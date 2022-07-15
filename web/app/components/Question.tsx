import { IQuestion, ScoreboardProps, useQuiz } from "~/context/QuizContext"
import AnswerButton from "./AnswerButton"


export function Question(tb: ScoreboardProps): JSX.Element {

    const getIndex = (i: number | undefined): number => {

        if (i ? i > quiz.questions.length : true) {
            return -1
        }
        return quiz.questions.findIndex((obj: IQuestion) => obj.id === i)
    }

    const { setQuestion, question, quiz } = useQuiz()

    const alternative = question.alternative
    const id = question.id
    const description = question.description

    const onQuestionAnswered = (answerIndex: number) => {
        if (alternative?.[answerIndex].isCorrect) {
            // TODO: Route to result screen with displaying that answer is correct
            //navigate(`./result`, { replace: true })
        }
        // TODO: Route to to result screen with displaying that answer is incorrect
        if (getIndex(id ? id + 1 : -1)) {
            if (getIndex(id ? id + 1 : -1) === -1) {
                tb.toggleScoreboard(true)
                return
            }
            setQuestion(id ? quiz.questions[id] : 1)
            tb.toggleScoreboard(true)
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