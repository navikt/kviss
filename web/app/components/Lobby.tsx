import { useGameContext } from '../context/game/GameContext'

export default function LobbyView() {
    const { state } = useGameContext()

    return (
        <>
            <h1 className={'text-2xl text-white mb-20'}>Pin-code: {state.pin}</h1>

            <div className="grid place-items-center sm:grid-cols-4 md:grid-cols-6 gap-4 mb-20">
                {players.map((player, i) => {
                    return <h2 key={i} className="col-auto text-white">{player.name}</h2>
                })}
            </div>
        </>
    )
}
