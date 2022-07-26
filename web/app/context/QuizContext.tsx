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
    isCorrect?: boolean
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

