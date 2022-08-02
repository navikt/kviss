import { IGame, IQuestion, IQuiz } from '../context/QuizContext'
import { IPlayer } from '../context/game/game'

const API_URL = process.env.NODE_ENV === 'production' ? '/api' : process.env.API_URL

export async function getAllQuizes(): Promise<IQuiz[]> {
    return fetch(`${API_URL}/quiz`)
        .then(res => res.json())
}

export async function getQuizById(id: number): Promise<IQuiz> {
    return fetch(`${API_URL}/quiz/${id}`)
        .then(res => res.json())
}

export async function createQuiz(quiz: Omit<IQuiz, 'id' | 'questions'>): Promise<number> {
    return fetch(`${API_URL}/quiz`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quiz)
    }).then(res => res.text())
        .then(id => parseInt(id))
}

export async function deleteQuizById(id: number): Promise<boolean> {
    return fetch(`${API_URL}/quiz/${id}`, {
        method: 'DELETE'
    }).then(res => res.status === 200)
}

export async function createQuestion(question: IQuestion): Promise<boolean> {
    return fetch(`${API_URL}/quiz/${question.quizId}/questions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(question)
    }).then(res => res.status === 200)
}

export async function gameExists(pin: number): Promise<boolean> {
    return fetch(`${API_URL}/game/${pin}/exist`)
        .then((res: Response) => res.status === 200)
}

export async function createGameWithQuizId(quizId: number): Promise<IGame> {
    return fetch(`${API_URL}/game?quizid=${quizId}`, {
        method: 'POST'
    }).then(res => res.json())
}

export async function createPlayer(pin: number, username: string): Promise<IPlayer> {
    return fetch(`${API_URL}/game/${pin}/player?playername=${username}`, {
        method: 'POST'
    }).then((res: Response) => res.json())
}


