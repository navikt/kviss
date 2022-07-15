import { json, LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { useState } from 'react'
import { useLinkClickHandler, useNavigate } from 'react-router-dom'
import PinCode from '~/components/PinCode'
import Username from '~/components/Username'
import { useQuiz } from '~/context/QuizContext'


export type ButtonProps = {
    handleClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, pinCode: string) => void;
};

export const loader: LoaderFunction = async () => {
    const res = await fetch('https://navhoot-backend.dev.nav.no/quiz')
    return json(await res.json())
}


export default function QuizIndexRoute() {


    const [pinCode, setPinCode] = useState<string>('')
    const [nickname, setNickName] = useState<string>('')
    const navigate = useNavigate()
    const { quiz, setQuiz } = useQuiz()
    const data = useLoaderData()

    const handleClickPin = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, pc: string) => {
        event.preventDefault()
        setPinCode(pc)
    }

    const handleClickNick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, pc: string) => {
        event.preventDefault()
        setNickName(pc)
        setQuiz(data)
        console.log(data)

    }

    return (
        <div className="flex flex-col h-screen justify-center items-center">

            {pinCode === '' ?
                <PinCode handleClick={handleClickPin} /> :
                (nickname === '' ?
                    <Username handleClick={handleClickNick} />
                    :
                    <div className="text-center ">
                        See your name on the screen?
                        <br />
                        {nickname}
                    </div>
                )}
            <button
                onClick={e => navigate("../question/1")}>
                Start Quiz
            </button>
        </div>
    )
}