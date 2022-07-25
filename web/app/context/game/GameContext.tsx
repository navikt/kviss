import { createContext, FC, useContext, useReducer } from 'react'
import { ActionTypes, Game, IGameAction, StegProps } from './game'

const initialState: Game = {}

const reducer = (state: Game, action: IGameAction) => {
    switch (action.type) {
        case ActionTypes.RESET: {
            return {}
        }
        default:
            return { ...state }
    }
}

const GameContext = createContext<StegProps>({
    state: initialState,
    dispatch: () => {
        /* do nothing */
    },
})

const useGameContext = () => useContext(GameContext)

const GameProvider: FC = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    return <GameContext.Provider value={{ state, dispatch }}>{children}</GameContext.Provider>
}

export { useGameContext, GameProvider }
