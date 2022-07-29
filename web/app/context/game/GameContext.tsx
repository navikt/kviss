import { createContext, FC, useContext, useReducer } from 'react'
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
        return { ...state, currentQuestion: payload }
    }
    case ActionTypes.PLAYER_JOINED_EVENT: {
        return { ...state, players: [...(state.players || []), payload] }
    }
    case ActionTypes.SET_HOST_ID: {
        return { ...state, hostId: payload }
    }
    case ActionTypes.SET_LAST_EVENT: {
        return { ...state, lastEvent: payload }
    }
    case ActionTypes.SEND_ANSWER_EVENT: {
        const p = state.player
        p ? p.score = payload : state.player?.score
        return { ...state, 
            player: p // TODO: Check if this works when backend sends correct score
        }
    }
    case ActionTypes.SET_CURRENT_QUIZ: {
        return { ...state, currentQuiz: payload }
    }
<<<<<<< HEAD
    case ActionTypes.IS_QUESTION_CORRECT: {
        return { ...state, isQuestionCorrect: payload }
    }
    case ActionTypes.UPDATE_PLAYER_SCORE_EVENT: {
        state.players?.map((player) => {
            if (player.id === payload.playerId) {
                const p = player
                p.score = payload.score
                return { ...state, player: p }
            }
        })
        return { ...state }
    }
=======
>>>>>>> 96b057a8e014d23f8cc498b94ffb16da81922c8b
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

const GameProvider: FC = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    return <GameContext.Provider value={{ state, dispatch }}>{children}</GameContext.Provider>
}

export { useGameContext, GameProvider }
