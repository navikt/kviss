export interface Game {
    player?: IPlayer
    pin?: number
    currentQuestion?: IQuestion
    joinedGame?: boolean
    players?: string[]
    hostId?: string
}

export enum ActionTypes {
    SET_PLAYER = 'SET_PLAYER',
    SET_PINCODE = 'SET_PINCODE',
    SET_HOST_ID = 'SET_HOST_ID',
    JOIN_GAME_EVENT = 'JOIN_GAME_EVENT',
    PLAYER_JOINED_EVENT = 'PLAYER_JOINED_EVENT',
    PLAYER_LEFT_EVENT = 'PLAYER_LEFT_EVENT',
    START_GAME_EVENT = 'START_GAME_EVENT',
    NEXT_QUESTION_EVENT = 'NEXT_QUESTION_EVENT',
    SEND_QUESTION_EVENT = 'SEND_QUESTION_EVENT',
    SHOW_ALTERNATIVES_EVENT = 'SHOW_ALTERNATIVES_EVENT',
    SELECT_ANSWER_EVENT = 'SELECT_ANSWER_EVENT',
    END_GAME_EVENT = 'END_GAME_EVENT',
}

export type GameAction =
    | { type: ActionTypes.SET_PLAYER; payload: IPlayer }
    | { type: ActionTypes.SET_PINCODE; payload: number }
    | { type: ActionTypes.SEND_QUESTION_EVENT; payload: IQuestion }
    | { type: ActionTypes.PLAYER_JOINED_EVENT; payload: string }
    | { type: ActionTypes.SET_HOST_ID; payload: string }

export interface GameProps {
    state: Game
    dispatch: (action: GameAction) => void
}

interface IAlternative {
    id?: number
    text: string
}

export interface IQuestion {
    id?: number
    description: string
    alternatives: IAlternative[]
    quizId?: number
    sortOrder: number
}

export interface IPlayer {
    id: number
    name: string
    score: number
}
