import { IQuestion } from '~/context/QuizContext'

export default function QuestionPreview({ questions }: { questions: IQuestion[]}) {
    return(
        <div>
            {questions.map((item, i) => {
                return (
                    <div key={i} className='flex flex-col my-2'>
                        <p>Question: {item.description}</p>
                        {item.alternative.map((alt, j) => {
                            return <p key={j}>{`Alternative ${j + 1}: ${alt.text}. Correct?: ${alt.isCorrect}`}</p>
                        })}
                    </div>
                )
            })}
        </div>
    )
}