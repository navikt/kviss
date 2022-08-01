import { json, LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { useGameContext } from '~/context/game/GameContext'

export default function WaitingView() {


    return (
        <>
            <div className="flex flex-col h-screen justify-center items-center text-white">
                <h2>
                    Venter på alle spillere  
                </h2>
            </div>
        </>
    )
}
