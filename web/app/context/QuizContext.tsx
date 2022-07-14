import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import React, { Children, ReactElement, useState } from "react";
import { createContext, useContext } from "react"

export interface IAlternative {
    id: number,
    text: string,
    isCorrect?: boolean
}

export interface IQuestion {
    id?: number
    description?: string
    alternative?: IAlternative[]
}

export interface IQuiz {
    name: string,
    id: number,
    description: string,
    questions: IQuestion[]
}

const initQuiz: IQuiz = {
    "name": "test quiz",
    "id": 123,
    "description": "test description",
    "questions": [
        {
            "id": 1,
            "description": "Spørsmål 1",
            "alternative": [
                {
                    "id": 1,
                    "text": "Alternative 1",
                    "isCorrect": true
                },
            ]
        }

    ]
}

const initQuestion: IQuestion = {
    "id": 1,
    "description": "Spørsmål 1",
    "alternative": [
        {
            "id": 1,
            "text": "Alternative 1",
            "isCorrect": true
        }
    ]
}

const QuizContext = React.createContext({
    quiz: initQuiz,
    setQuiz: (_: any) => {
    },
    question: initQuestion,
    setQuestion: (_: any) => {
    },
})


export function useQuiz() {
    return useContext(QuizContext)
}

export default function QuizProvider({ children }: { children: Array<ReactElement> | ReactElement }): ReactElement {
    const [quiz, setQuiz] = useState<IQuiz>(initQuiz)
    const [question, setQuestion] = useState<IQuestion>(initQuestion)


    return (
        <QuizContext.Provider value={{ quiz, setQuiz, question, setQuestion }}>
            {children}
        </QuizContext.Provider>
    );
}

