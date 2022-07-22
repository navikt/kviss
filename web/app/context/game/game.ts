export interface Game {
    username?: string
    pin?: number
}

export enum ActionTypes {
    RESET = 'RESET',
}

export interface IGameAction {
    type: ActionTypes
    payload?: Game
}

export interface StegProps {
    state: Game
    dispatch: (action: IGameAction) => void
}
