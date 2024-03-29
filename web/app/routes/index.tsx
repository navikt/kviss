import React from 'react'
import Button from '../components/common/Button'
import { useNavigate } from 'react-router-dom'

export default function Index() {
    const navigate = useNavigate()

    return (
        <div className="flex items-center justify-center flex-col font-bold  text-xl font-mono">
            <h1 className="text-3xl text-center mb-4 text-white px-4 pb-20">
                Welcome to kviss! A application that solves all your quizzzing needs at NAV
            </h1>
            <Button color="primary" onClick={() => navigate('./join')}>
                <p className="text-2xl w-52">Join Kviss</p>
            </Button>
            <Button color="success" onClick={() => navigate('./start')}>
                <p className="text-2xl w-52">Start Kviss</p>
            </Button>
            <Button color="warning" onClick={() => navigate('./create')}>
                <p className="text-2xl w-52">Create Kviss</p>
            </Button>
        </div>
    )
}
