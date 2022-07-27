import React, { ReactElement, useState } from 'react'
import { useContext } from 'react'

export interface IAlternative {
    text: string,
    isCorrect?: boolean
    id?: number
}

export interface IQuestion {
    description: string
    quizId?: number,
    sortOrder: number
    alternatives: IAlternative[]
    id?: number
}

export type ScoreboardProps = {
    toggleScoreboard: (toggleScoreboard: boolean) => void
};

export interface IQuiz {
    name: string,
    id?: number,
    description: string,
    questions?: IQuestion[],
    //isDraft?: boolean
}
