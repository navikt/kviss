export interface IEventPayload {
    type: string
}

interface IUsernamePayload extends IEventPayload {
    username: string
}

interface IPinPayload extends IEventPayload {
    pin: number
}

export type gameSocketInterfaces = IEventPayload | IUsernamePayload | IEventPayload | undefined | string | number
