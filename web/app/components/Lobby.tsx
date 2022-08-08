import { useGameContext } from '../context/game/GameContext'

export default function LobbyView() {
    const { state } = useGameContext()

    const nPlayers = state.players?.length || 0
    var smCol: number
    var mdCol: number

    nPlayers > 4 ? smCol = 4 : smCol = nPlayers
    nPlayers > 6 ? mdCol = 6 : mdCol = nPlayers
    

    return (
        <>
            <h1 className={'text-2xl text-white mb-20'}>Pin-code: {state.pin}</h1>
            <div className={`grid place-items-center sm:grid-cols-${smCol} md:grid-cols-${mdCol} gap-2 mb-20`}>
                {state.players?.map((player, i) => {
                    return <h2 key={i} className='col-auto text-white'>{player.name}</h2>
                })}
            </div>
        </>
    )
}
