import { Outlet } from '@remix-run/react'

export default function Index() {
    return (
        <div className='flex items-center justify-center h-screen flex-col'>
            <button className='border-2 rounded-lg bg-white my-4 py-4 w-64'>
                <p className='text-2xl'>Join quiz</p>
            </button>
            <button className='border-2 rounded-lg bg-white my-4 py-4 w-64'>
                <p className='text-2xl'>Start quiz</p>
            </button>
            <button className='border-2 rounded-lg bg-white my-4 py-4 w-64'>
                <p className='text-2xl'>Create quiz</p>
            </button>
        </div>
    )
}
