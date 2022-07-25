import { IQuestion } from '~/context/QuizContext'
import { poster } from '../operations'

export const useCreateQuestion = async (questions: IQuestion, quizId: number) => {
    const { data, error } = await poster(`http://localhost:8080/quiz/${quizId}/questions`, {
        questions,
    })

    return {
        res: data,
        err: error,
    }
}
