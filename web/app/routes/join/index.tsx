
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PinCode from '~/components/PinCode'
import Username from '~/components/Username'
import { IQuiz, useQuiz } from '~/context/QuizContext'
import axios from 'axios';



export type ButtonProps = {
    handleClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, pinCode: string) => void;
};



export default function QuizIndexRoute() {


    const [pinCode, setPinCode] = useState<string>('')
    const [nickname, setNickName] = useState<string>('')

    const navigate = useNavigate()
    const { questions, setQuestions, setQuestion } = useQuiz()

    const getQuiz = async (pinCode: string) => {
        axios
            .get<IQuiz[]>(`https://navhoot-backend.dev.nav.no/quiz/${pinCode}/questions`, {
                headers: {
                    "Content-Type": "text/html"
                },
            }).then(response => {
                setQuestions(response.data);
            }).catch(ex => {
                const error =
                    ex.response.status === 404
                        ? "Resource Not found"
                        : "An unexpected error has occurred";
            });
    }

    const handleClickPin = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, pc: string) => {
        event.preventDefault()
        getQuiz(pc);
        setPinCode(pc)
    }

    const handleClickNick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, username: string) => {
        event.preventDefault()
        setNickName(username)
        setQuestions(questions)
        setQuestion(questions[0])

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
                onClick={e => navigate(`../quiz`)}>
                Start Quiz
            </button>
        </div>
    )
}