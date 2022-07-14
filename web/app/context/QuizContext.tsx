import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import React, { Children, ReactElement, useState } from "react";
import { createContext, useContext } from "react"

const QuizContext = React.createContext({
    quiz: {},
    setQuiz: (_: any) => {
    },
})


export function useQuiz() {
    return useContext(QuizContext)
}

export default function QuizProvider({ children }: { children: Array<ReactElement> | ReactElement }): ReactElement {
    const [quiz, setQuiz] = useState<any>(null)



    return (
        <QuizContext.Provider value={{ quiz, setQuiz }}>
            {children}
        </QuizContext.Provider>
    );
}

