import config from './config'
import fetch from 'node-fetch'

export const getGameByPin = async (pin: number) => {
    return await fetch(`${config.API_URL}/game/${pin}`)
        .then(res => res.json())
        .catch(e => console.error(e))
}

export const getPlayers = async (pin: number) => {
    return await fetch(`${config.API_URL}/game/${pin}/players`)
        .then(res => res.json())
        .catch(e => console.error(e))
}

export const getQuizById = async (id: number) => fetch(`${config.API_URL}/quiz/${id}`)
    .then(res => res.json())
    .catch(e => console.error(e))

export const getQuestionById = async (id: number) => fetch(`${config.API_URL}/quiz/${id}`)
    .then(res => res.json())
    .catch(e => console.error(e))


