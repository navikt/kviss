import logo from '../../public/logo.png'

export default function Header () {

    return (
        <header className="top-0 h-10 w-full pb-10 pt-5 flex justify-center bg-white" >
            <div>
                <img src={logo} alt="NavHoot™" className="object-scale-down h-7"/>
            </div>
        </header>
    )

}