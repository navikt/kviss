import { createContext, FC, ReactNode, useContext, useReducer } from 'react'
import { ActionTypes, GameAction, Game, GameProps } from './game'

const initialState: Game = {}

const reducer = (state: Game, action: GameAction) => {
    const { type, payload } = action
    switch (type) {
    case ActionTypes.SET_PINCODE: {
        return { ...state, pin: payload }
    }
    case ActionTypes.SET_PLAYER: {
        return { ...state, player: payload}
    }
    case ActionTypes.SEND_QUESTION_EVENT: {
        return { ...state, currentQuestion: payload, answeredNumber: 0 }
    }
    case ActionTypes.PLAYER_JOINED_EVENT: {
        return { ...state, players: payload }
    }
    case ActionTypes.SET_HOST_ID: {
        return { ...state, hostId: payload }
    }
    case ActionTypes.SET_LAST_EVENT: {
        return { ...state, lastEvent: payload }
    }
    case ActionTypes.SET_CURRENT_QUIZ: {
        return { ...state, currentQuiz: payload }
    }
    case ActionTypes.IS_QUESTION_CORRECT: {
        return { ...state, isQuestionCorrect: payload }
    }
    case ActionTypes.PLAYER_ANSWERED_EVENT: {
        let n: number
        state.answeredNumber ? n = state.answeredNumber + 1 : n = 1
        return { ...state, answeredNumber: n }
    }
    case ActionTypes.PLAYER_LEFT_EVENT: {
        console.log('Player left event with player ', payload)
        return { ...state,
            players: state.players?.filter(player => player.id !== payload.id), answeredNumber: state.answeredNumber! - 1 }
    }
    case ActionTypes.UPDATE_PLAYER_LIST_EVENT: {
        console.log('setting players: ', payload)
        return { ...state, players: payload}
    }
    default:
        return { ...state }
    }
}

const GameContext = createContext<GameProps>({
    state: initialState,
    dispatch: () => {
        /* Do nothing */
    },
})

const useGameContext = () => useContext(GameContext)

const GameProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    return <GameContext.Provider value={{ state, dispatch }}>{children}</GameContext.Provider>
}

export { useGameContext, GameProvider }
