import React, { ReactElement, useState } from 'react'
import { useContext } from 'react'

export interface IPlayer {
    id: number
    name: string
    score: number
}

export interface IAlternative {
    id?: number,
    text: string,
    isCorrect: boolean
}

export interface IQuestion {
    id?: number
    description: string
    alternative: IAlternative[]
    quizId?: number,
    sortOrder: number
}

export type ScoreboardProps = {
    toggleScoreboard: (toggleScoreboard: boolean) => void
};

export interface IQuiz {
    name: string,
    id?: number,
    description: string,
    questions: IQuestion[],
    isDraft: boolean
}

const initQuiz: IQuiz = {
    'name': 'test quiz',
    'id': 123,
    'description': 'test description',
    'questions': [
        {
            'id': 1,
            'description': 'Spørsmål 1',
            'alternative': [
                {
                    'id': 1,
                    'text': 'Alternative 1',
                    'isCorrect': true
                },
            ],
            quizId: 1,
            sortOrder: 1
        }
    ],
    isDraft: false
}

const initQuestion: IQuestion = {
    'id': 1,
    'description': 'Spørsmål 1',
    'alternative': [
        {
            'id': 1,
            'text': 'Alternative 1',
            'isCorrect': true
        }
    ],
    quizId: 1,
    sortOrder: 1
}

const QuizContext = React.createContext({
    questions: [initQuestion],
    setQuestions: (_: any) => { },
    question: initQuestion,
    setQuestion: (_: any) => { },
})


export function useQuiz() {
    return useContext(QuizContext)
}

export default function QuizProvider({ children }: { children: Array<ReactElement> | ReactElement }): ReactElement {
    const [questions, setQuestions] = useState<IQuestion[]>([initQuestion])
    const [question, setQuestion] = useState<IQuestion>(initQuestion)


    return (
        <QuizContext.Provider value={{ questions, setQuestions, question, setQuestion }}>
            {children}
        </QuizContext.Provider>
    )
}

