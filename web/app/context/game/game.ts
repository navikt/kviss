import { gameSocketInterfaces } from "./gameSocketTypes"

export interface Game {
    username?: string
    pin?: number
}

export enum ActionTypes {
    SET_USERNAME = 'SET_USERNAME',
    SET_PINCODE = 'SET_PINCODE',
    JOIN_GAME_EVENT = 'JOIN_GAME_EVENT',
    PLAYER_JOINED_EVENT = 'PLAYER_JOINED_EVENT',
    PLAYER_LEFT_EVENT = 'PLAYER_LEFT_EVENT',
    START_GAME_EVENT = 'START_GAME_EVENT',
    NEXT_QUESTION_EVENT = 'NEXT_QUESTION_EVENT',
    SEND_QUESTION_EVENT = 'SEND_QUESTION_EVENT',
    SHOW_ALTERNATIVES_EVENT = 'SHOW_ALTERNATIVES_EVENT',
    SELECT_ANSWER_EVENT = 'SELECT_ANSWER_EVENT',
    END_GAME_EVENT = 'END_GAME_EVENT'
}

export type ElectionAction =
    | { type: ActionTypes.SET_USERNAME; payload: string }
    | { type: ActionTypes.SET_PINCODE; payload: number }



// export interface IGameAction {
//     type: ActionTypes
//     payload: any
// }

export interface StegProps {
    state: Game
    dispatch: (action: ElectionAction) => void
}


