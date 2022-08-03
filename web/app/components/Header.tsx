import React from 'react'
import { useNavigate } from 'react-router-dom'


export default function Header() {
    const navigate = useNavigate()

    return (
        <header className="w-full bg-slate-600 flex justify-center py-6">
            <a className='cursor-pointer' onClick={() => navigate('./')}>
                <img src={'/logo.png'} alt="kviss™" className="object-scale-down h-10" />
            </a>
        </header>
    )
}
