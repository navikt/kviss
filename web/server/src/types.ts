
export type Game = {
    id: number
    quizId: number
    isActive: boolean
    gamePin: number
    hostId: string
}

export type Quiz = {
    id: number
    name: string
    description: string
    questions: Question[]
}

export type Question = {
    description: string
    quizId: number
    sortOrder: number
    alternatives: Alternative[]
    id: number
}

export type Alternative = {
    id: number
    text: string
    isCorrect: boolean
}

export type AnswerResponse = {
    playerId: number
    isCorrect: boolean
}