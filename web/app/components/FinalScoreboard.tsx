import React from 'react'
import { IPlayer } from '../context/game/game'
import { useGameContext } from '../context/game/GameContext'

export default function FinalScoreboard() {

    const { state } = useGameContext()
    const players: IPlayer[] = state.players?.sort((a, b) => b.score - a.score) || []
    
    const setDefaultIfPlayerNameUndefined = (player: IPlayer | undefined, defaultMessage: string) => {
        return (player === undefined) ? defaultMessage : player.name
    }

    const setDefaultIfPlayerScoreUndefined = (player: IPlayer | undefined) => {
        return (player === undefined) ? 'no score' : `${player.score} points!`
    }

    return (
        <div className="flex flex-col justify-center items-center">
            <h2 className="text-6xl pb-8 text-white">Final tally!</h2>
            <div className='flex justify-center items-end'>
                <div className='w-52'>
                    <p className='text-center text-white pb-1 mb-1'>{setDefaultIfPlayerNameUndefined(players[1], 'no second')}</p>
                    <div className='flex flex-col justify-center items-center text-white h-52 bg-[#aaa9ad]'>
                        <p className='text-4xl'>2.</p>
                        <p className='my-2'>{setDefaultIfPlayerScoreUndefined(players[1])}</p>
                    </div>
                </div>
                <div className='w-52'>
                    <div className='flex justify-center items-center mb-1'>
                        <p className='text-center text-white pb-1'>{setDefaultIfPlayerNameUndefined(players[0], 'no winner')}</p>
                        {players[0]}
                    </div>
                    <div className='flex flex-col justify-center items-center text-white h-80 bg-[#d4af37]'>
                        <p className='text-6xl'>1.</p>
                        <p className='my-2'>{setDefaultIfPlayerScoreUndefined(players[0])}</p>
                    </div>
                </div>
                <div className='w-52'>
                    <p className='text-center text-white pb-1 mb-1'>{setDefaultIfPlayerNameUndefined(players[2], 'no third')}</p>
                    <div className='flex flex-col justify-center items-center text-white h-28 bg-[#b08d57]'>
                        <p className='text-4xl'>3.</p>
                        <p className='my-2'>{setDefaultIfPlayerScoreUndefined(players[2])}</p>
                    </div>
                </div>
            </div>
            <div className='mt-4'>
                <h2 className='text-3xl text-white'>And the rest...</h2>
                <div className='mt-1'>
                    {players?.slice(3).map((item, i) => {
                        return <p key={i} className='text-white'>{`${i+4}. ${item.name} - ${item.score} points`}</p>
                    })}
                </div>
            </div>
        </div>
    )
}