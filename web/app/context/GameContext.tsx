import React, { ReactElement, useState } from 'react'
import { useContext } from 'react'

export interface IGameProps {
    username: string,
    pincode: number
}


const props: IGameProps = {
    username: "",
    pincode: 0
}

const context = React.createContext({
    gameProps: props,
    setGameProps: (_: any) => { },
})


export const useGameContext = () => useContext(context)


export default function GameContextProvider({ children }: { children: Array<ReactElement> | ReactElement }): ReactElement {
    const [gameProps, setGameProps] = useState<IGameProps>(props)


    return (
        <context.Provider value={{ gameProps, setGameProps }}>
            {children}
        </context.Provider>
    )
}

