export interface Player {
    id: number
    name: string
    score?: number
}

export enum IncomingEvent {
    JOIN_GAME_EVENT = 'JOIN_GAME_EVENT',
    START_GAME_EVENT = 'START_GAME_EVENT',
    NEXT_QUESTION_EVENT = 'NEXT_QUESTION_EVENT',
    LEAVE_GAME_EVENT = 'LEAVE_GAME_EVENT',
    END_GAME_EVENT = 'END_GAME_EVENT',
    SELECT_ANSWER_EVENT = 'SELECT_ANSWER_EVENT',
    TRIGGER_ANSWER_EVENT = 'TRIGGER_ANSWER_EVENT',
    TRIGGER_UPDATE_PLAYER_LIST_EVENT = 'TRIGGER_UPDATE_PLAYER_LIST_EVENT',
    TRIGGER_LAST_QUESTION_EVENT = 'TRIGGER_LAST_QUESTION_EVENT',
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

export interface LeaveGameEvent {
    playerId: number
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

export interface TriggerLastQuestionEvent {
    hostId: string
}
