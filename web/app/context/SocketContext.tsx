import React, { ReactElement, ReactNode, useContext } from 'react'
import type { Socket } from 'socket.io-client'

interface ProviderProps {
    socket: Socket | undefined,
    children: ReactNode
}

export const context = React.createContext<Socket | undefined>(undefined)

export const useWebSocket = () => useContext(context)

export default function SocketContextProvider({ children, socket }: ProviderProps): ReactElement {

    return (
        <context.Provider value={socket}>
            {children}
        </context.Provider>
    )
}
