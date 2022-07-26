import { IQuestion } from '~/context/QuizContext'
import { poster } from '../operations'

export const useCreateQuestion = async (question: IQuestion, quizId: number) => {
    const { data, error } = await poster(`http://localhost:8080/quiz/${quizId}/questions`, question)

    return {
        res: data,
        err: error,
    }
}
