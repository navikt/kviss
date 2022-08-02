import { useNavigate } from 'react-router-dom'
import logo from '/logo.png'

export default function Header() {
    const navigate = useNavigate()

    return (
        <header className="w-full bg-slate-600 flex justify-center py-6">
            <a className='cursor-pointer' onClick={() => navigate('./')}>
                <img src={logo} alt="kviss™" className="object-scale-down h-10" />
            </a>
        </header>
    )
}
