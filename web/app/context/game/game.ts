export interface Game {
    username?: string
    pin?: number
}

export enum ActionTypes {
    RESET = 'RESET',
    SET_USERNAME = 'SET_USERNAME',
    SET_PINCODE = 'SET_PINCODE'
}

export interface IGameAction {
    type: ActionTypes
    payload?: Game
}

export interface StegProps {
    state: Game
    dispatch: (action: IGameAction) => void
}
