import config from './config'
import fetch from 'node-fetch'
import { AnswerResponse, Game, Quiz } from './types'

export const getGameByPin = async (pin: number) => {
    return await fetch(`${config.API_URL}/game/${pin}`)
        .then((res) => res.json() as Promise<Game>)
        .catch((e) => console.error(e))
}

export const getPlayers = async (pin: number) => {
    return await fetch(`${config.API_URL}/game/${pin}/players`)
        .then((res) => res.json() as Promise<any>)
        .catch((e) => console.error(e))
}
export const deletePlayer = async (id: number) =>
    fetch(`${config.API_URL}/player/${id}`, {
        method: 'DELETE',
    })
        .then((res) => res.status === 200)
        .catch((e) => console.error(e))

export const setGameFinished = async (pin: number) =>
    fetch(`${config.API_URL}/game/${pin}/finished`, {
        method: 'PATCH',
    })
        .then((res) => res.status === 200)
        .catch((e) => console.error(e))

export const setGameStarted = async (pin: number) =>
    fetch(`${config.API_URL}/game/${pin}/started`, {
        method: 'PATCH',
    })
        .then((res) => res.status === 200)
        .catch((e) => console.error(e))

export const getQuizById = async (id: number) =>
    fetch(`${config.API_URL}/quiz/${id}`)
        .then((res) => res.json() as Promise<Quiz>)
        .catch((e) => console.error(e))

export const getQuestionById = async (quizId: number, questionId: number) =>
    fetch(`${config.API_URL}/quiz/${quizId}/questions/${questionId}`)
        .then((res) => res.json())
        .catch((e) => console.error(e))

export const sendAnswer = async (alternativeId: number, pin: number, playerId: number) =>
    fetch(`${config.API_URL}/game/${pin}/checkAnswer?alternativeId=${alternativeId}&playerId=${playerId}`)
        .then((res) => res.json() as Promise<AnswerResponse>)
        .catch((e) => console.error(e))
