import logo from '../../public/logo.png'

export default function Header() {
    return (
        <header className="w-full bg-slate-600 flex justify-center py-6">
            <div>
                <img src={logo} alt="kviss™" className="object-scale-down h-10" />
            </div>
        </header>
    )
}
