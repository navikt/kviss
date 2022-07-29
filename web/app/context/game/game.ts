import { IAlternative, IQuestion, IQuiz } from '../QuizContext'

export interface Game {
    player?: IPlayer
    pin?: number
    currentQuestion?: IQuestion
    currentQuiz?: IQuiz
    answer?: object
    joinedGame?: boolean
    players?: string[]
    hostId?: string
    lastEvent?: string
}

export enum ActionTypes {
    SET_PLAYER = 'SET_PLAYER',
    SET_PINCODE = 'SET_PINCODE',
    SET_HOST_ID = 'SET_HOST_ID',
    SET_LAST_EVENT = 'SET_LAST_EVENT',
    SET_CURRENT_QUIZ = 'SET_CURRENT_QUIZ',
    JOIN_GAME_EVENT = 'JOIN_GAME_EVENT',
    PLAYER_JOINED_EVENT = 'PLAYER_JOINED_EVENT',
    PLAYER_LEFT_EVENT = 'PLAYER_LEFT_EVENT',
    START_GAME_EVENT = 'START_GAME_EVENT',
    NEXT_QUESTION_EVENT = 'NEXT_QUESTION_EVENT',
    SEND_QUESTION_EVENT = 'SEND_QUESTION_EVENT',
    SHOW_ALTERNATIVES_EVENT = 'SHOW_ALTERNATIVES_EVENT',
    SELECT_ANSWER_EVENT = 'SELECT_ANSWER_EVENT',
    END_GAME_EVENT = 'END_GAME_EVENT',
    SEND_ANSWER_EVENT = 'SEND_ANSWER_EVENT',
}

export type GameAction =
    | { type: ActionTypes.SET_PLAYER; payload: IPlayer }
    | { type: ActionTypes.SET_PINCODE; payload: number }
    | { type: ActionTypes.SEND_QUESTION_EVENT; payload: IQuestion }
    | { type: ActionTypes.PLAYER_JOINED_EVENT; payload: string }
    | { type: ActionTypes.SET_HOST_ID; payload: string }
    | { type: ActionTypes.SET_LAST_EVENT; payload: string }
    | { type: ActionTypes.SET_CURRENT_QUIZ; payload: IQuiz }
    | { type: ActionTypes.SEND_ANSWER_EVENT; payload: number }

export interface GameProps {
    state: Game
    dispatch: (action: GameAction) => void
}

export interface IPlayer {
    id: number
    name: string
    score: number
}
