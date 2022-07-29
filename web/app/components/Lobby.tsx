import { useGameContext } from '~/context/game/GameContext'

export default function LobbyView() {
    const { state } = useGameContext()


    return (
        <>
            <h1 className={'text-2xl text-white'}> {state.pin}</h1>

            <div className="flex flex-col h-40 p-60">
                {state.players?.map((player, i) => {
                    return <h2 key={i} className="inline text-white">{player.name}</h2>
                })}
            </div>
        </>
    )
}
