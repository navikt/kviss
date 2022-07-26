import React, { ReactElement, ReactNode, useContext } from 'react'

interface ProviderProps {
    socket: WebSocket | undefined,
    children: ReactNode
}


export const context = React.createContext<WebSocket | undefined>(undefined)

export const useWebSocket = () => useContext(context)


export default function SocketContextProvider({ children, socket }: ProviderProps): ReactElement {

    return (
        <context.Provider value={socket}>
            {children}
        </context.Provider>
    )
}