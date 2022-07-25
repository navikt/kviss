import { createContext, FC, useContext, useReducer } from 'react'
import { ActionTypes, Game, IGameAction, StegProps } from './game'

const initialState: Game = {}

const reducer = (state: Game, action: IGameAction) => {
    const { type, payload } = action
    switch (type) {
        case ActionTypes.RESET: {
            return {}
        }
        case ActionTypes.SET_PINCODE: {
            return { ...state, pin: parseInt(payload) }
        }
        case ActionTypes.SET_USERNAME: {
            return { ...state, username: payload }
        }
        default:
            return { ...state }
    }
}

const GameContext = createContext<StegProps>({
    state: initialState,
    dispatch: () => {
    },
})

const useGameContext = () => useContext(GameContext)

const GameProvider: FC = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    return <GameContext.Provider value={{ state, dispatch }}>{children}</GameContext.Provider>
}

export { useGameContext, GameProvider }
