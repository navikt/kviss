import React, { ReactElement, useState } from 'react'
import { useContext } from 'react'

export interface IAlternative {
    id?: number
    text: string,
    isCorrect?: boolean
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

export interface IGame {
    id: number
    quizId: number
    isActive: boolean
    gamePin: number
    hostId: string
}

export interface IQuiz {
    name: string,
    id?: number,
    description: string,
    questions?: IQuestion[],
    //isDraft?: boolean
}
