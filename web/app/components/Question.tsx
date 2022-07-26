import { useGameContext } from '~/context/game/GameContext'
import { IAlternative, ScoreboardProps } from '~/context/QuizContext'
import AnswerButton from './AnswerButton'


export function Question(tb: ScoreboardProps): JSX.Element {

    const { state } = useGameContext()


    const sendAnswer = async (answerIndex: number) => { /* void */}

    const onQuestionAnswered = (answerIndex: number) => {
        /* void (for now) */
    }

    return (
        <div className="flex flex-col h-screen justify-center items-center">
            <h1 className="text-2xl mb-4">{state.currentQuestion?.description}</h1>
            {state.currentQuestion?.alternatives?.map((answer: IAlternative, i: number) => {
                return <AnswerButton
                    quizId={'1'}
                    key={i}
                    answerText={answer.text}
                    onButtonClick={() => onQuestionAnswered(i)}
                />
            })}
        </div>
    )
}