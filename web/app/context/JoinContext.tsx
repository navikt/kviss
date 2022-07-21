import React, { ReactElement, useState } from 'react'
import { useContext } from 'react'

export interface IJoinProps {
    username: string,
    pincode: number
}


const props: IJoinProps = {
    username: "",
    pincode: 0
}

const context = React.createContext({
    joinProps: props,
    setJoinProps: (_: any) => { },
})


export const useJoin = () => useContext(context)


export default function JoinContextProvider({ children }: { children: Array<ReactElement> | ReactElement }): ReactElement {
    const [joinProps, setJoinProps] = useState<IJoinProps>(props)


    return (
        <context.Provider value={{ joinProps, setJoinProps }}>
            {children}
        </context.Provider>
    )
}

