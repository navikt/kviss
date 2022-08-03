import { Player } from './incoming'

export enum OutgoingEvent {
    SEND_ALTERNATIVES_EVENT = 'SEND_ALTERNATIVES_EVENT',
    SEND_ERROR_EVENT = 'SEND_ERROR_EVENT',
    SEND_QUESTION_EVENT = 'SEND_QUESTION_EVENT',
    PLAYER_JOINED_EVENT = 'PLAYER_JOINED_EVENT',
    PLAYER_LEFT_EVENT = 'PLAYER_LEFT_EVENT',
    GAME_ENDED_EVENT = 'GAME_ENDED_EVENT',
    SEND_ANSWER_EVENT = 'SEND_ANSWER_EVENT',
    SHOW_ANSWERS_EVENT = 'SHOW_ANSWERS_EVENT',
    UPDATE_PLAYER_LIST_EVENT = 'UPDATE_PLAYER_LIST_EVENT',
}

export interface SendAlternativesEvent {
    alternatives: any[]
}

export interface SendErrorEvent {
    errorMessage: string
}

export interface SendQuestionEvent {
    question: any
}

export interface PlayerJoinedEvent {
    player: any
}

export interface PlayerLeftEvent {
    player: any
}

export interface GameEndedEvent {
    scores: any[]
}

export interface SendAnswerEvent {
    playerId: number
    score: number
    correct: boolean
}

export interface ShowAnswersEvent {
    show: boolean
}

export interface UpdatePlayerListEvent {
    players: any[]
}
