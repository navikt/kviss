import { useEffect, useState } from 'react'
import { IPlayer } from '~/context/game/game'
import { useGameContext } from '~/context/game/GameContext'
import CrownIcon from '../components/common/icons/crown.svg'

const mockPlayers: IPlayer[] = [
    {
        id: 1,
        name: 'Hans Bolo',
        score: 10
    }, {
        id: 2,
        name: 'Nicolas Legolas',
        score: 30,
    }, {
        id: 3,
        name: 'Morroklumpen',
        score: 20
    }, {
        id: 4,
        name: 'Neeeerden',
        score: 50
    }
]

export default function FinalScoreboard() {

    const { state } = useGameContext()
    const players: IPlayer[] = mockPlayers.sort((a, b) => b.score - a.score)
    
    return (
        <div className="flex flex-col justify-center items-center">
            <h2 className="text-6xl pb-8 text-white">Final tally!</h2>
            <div className='flex justify-center items-end'>
                <div className='w-52'>
                    <p className='text-center text-white pb-1 mb-1'>{players[1].name}</p>
                    <div className='flex flex-col justify-center items-center text-white h-52 bg-[#aaa9ad]'>
                        <p className='text-4xl'>2.</p>
                        <p className='my-2'>{players[1].score} points!</p>
                    </div>
                </div>
                <div className='w-52'>
                    <div className='flex justify-center items-center mb-1'>
                        <p className='text-center text-white pb-1'>{players[0].name}</p>
                        <img src={CrownIcon} className='ml-3'/>
                    </div>
                    <div className='flex flex-col justify-center items-center text-white h-80 bg-[#d4af37]'>
                        <p className='text-6xl'>1.</p>
                        <p className='my-2'>{players[0].score} points!</p>
                    </div>
                </div>
                <div className='w-52'>
                    <p className='text-center text-white pb-1 mb-1'>{players[2].name}</p>
                    <div className='flex flex-col justify-center items-center text-white h-28 bg-[#b08d57]'>
                        <p className='text-4xl'>3.</p>
                        <p className='my-2'>{players[2].score} points!</p>
                    </div>
                </div>
            </div>
        </div>
    )
}