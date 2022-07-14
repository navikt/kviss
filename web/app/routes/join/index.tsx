import { json, LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { useState } from 'react'
import PinCode from '~/components/PinCode'
import Username from '~/components/Username'
import QuizProvider, { useQuiz } from '~/context/QuizContext'


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
        </div>
    )
}