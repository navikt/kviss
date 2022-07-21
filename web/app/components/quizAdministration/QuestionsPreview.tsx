import { useState } from 'react'
import { IQuestion } from '~/context/QuizContext'
import QuestionPreview from './QuestionPreview'

export default function QuestionsPreview({ questions }: { questions: IQuestion[]}) {
    
    const [edit, setEdit] = useState<boolean>(false)
    
    return(
        <div>
            {questions.map((item, i) => {
                return <QuestionPreview key={i} question={item}/>
            })}
        </div>
    )
}