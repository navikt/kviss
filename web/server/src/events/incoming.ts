export interface Player {
    id: number
    name: string
    score?: number
}

export enum IncomingEvent {
    JOIN_GAME_EVENT = 'JOIN_GAME_EVENT',
    START_GAME_EVENT = 'START_GAME_EVENT',
    NEXT_QUESTION_EVENT = 'NEXT_QUESTION_EVENT',
    SHOW_ALTERNATIVES_EVENT = 'SHOW_ALTERNATIVES_EVENT',
    LEAVE_GAME_EVENT = 'LEAVE_GAME_EVENT',
    END_GAME_EVENT = 'END_GAME_EVENT',
    SELECT_ANSWER_EVENT = 'SELECT_ANSWER_EVENT',
    TRIGGER_ANSWER_EVENT = 'TRIGGER_ANSWER_EVENT',
    TRIGGER_UPDATE_PLAYER_LIST_EVENT = 'TRIGGER_UPDATE_PLAYER_LIST_EVENT',
}

export interface JoinGameEvent {
    player: Player
}

export interface StartGameEvent {
    hostId: string
}

export interface NextQuestionEvent {
    questionId: number
    hostId: string
}

export interface ShowAlternativesEvent {
    questionId: number
}

export interface LeaveGameEvent {
    player: Player
}

export interface EndGameEvent {
    gamePin: number
}

export interface SelectAnswerEvent {
    alternativeId: number
    playerId: number
}

export interface TriggerAnswerEvent {
    hostId: string
}

export interface TriggerUpdatePlayerListEvent {
    hostId: string
}
