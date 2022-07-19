import { useNavigate } from '@remix-run/react'

export default function Index() {

    const navigate = useNavigate()

    return (
        <div className='flex items-center justify-center h-screen flex-col'>
            <h1 className='text-3xl text-center mb-4'>Welcome to NavHoot! A application that solves all your quizzzing needs at NAV</h1>
            <button className='border-2 rounded-lg bg-white my-4 py-4 w-64' onClick={() => navigate('./join')}>
                <p className='text-2xl'>Join quiz</p>
            </button>
            <button className='border-2 rounded-lg bg-white my-4 py-4 w-64' onClick={() => navigate('./start')}>
                <p className='text-2xl'>Start quiz</p>
            </button>
            <button className='border-2 rounded-lg bg-white my-4 py-4 w-64' onClick={() => navigate('./create')}>
                <p className='text-2xl'>Create quiz</p>
            </button>
        </div>
    )
}
