import React from 'react'
import { ChangeEvent } from 'react'
import Input from '../common/Input'
import TextArea from '../common/TextArea'

interface IQuizInfo {
    name: string
    description: string
}

interface IProps {
    quizInfo: IQuizInfo
    setQuizInfo: (quizInfo: IQuizInfo) => void
}

export default function QuizInformationForm({ quizInfo, setQuizInfo}: IProps) {

    const handleQuizInfoChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setQuizInfo({
            ...quizInfo,
            [event.target.name]: event.target.value
        })
    }

    return (
        <form className='flex flex-col'>
            <Input 
                label='Name:'
                type="text" 
                name="name" 
                value={quizInfo.name || ''} 
                onChange={handleQuizInfoChange}
            />
            {/* <Input
                label='Description:'
                type="text" 
                name="description"
                value={quizInfo.description || ''} 
                onChange={handleQuizInfoChange}
            /> */}
            <TextArea 
                label='Description:'
                name='description'
                value={quizInfo.description || ''}
                onChange={handleQuizInfoChange}
            />
        </form>
    )
}