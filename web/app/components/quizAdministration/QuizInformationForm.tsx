import { ChangeEvent } from 'react'

interface IQuizInfo {
    name: string
    description: string
}

interface IProps {
    quizInfo: IQuizInfo
    setQuizInfo: (quizInfo: IQuizInfo) => void
}

export default function QuizInformationForm({ quizInfo, setQuizInfo}: IProps) {

    const handleQuizInfoChange = (event: ChangeEvent<HTMLInputElement>) => {
        setQuizInfo({
            ...quizInfo,
            [event.target.name]: event.target.value
        })
    }

    return (
        <form className='flex flex-col'>
            <label>
                Name: 
                <input type="text" name="name" onChange={handleQuizInfoChange}/>
            </label>
            <label>
                Description:
                <input type="text" name="name" onChange={handleQuizInfoChange}/>
            </label>
        </form>
    )
}