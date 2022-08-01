import { IQuiz } from '~/context/QuizContext'
import { poster } from '../operations'

export const useCreateQuiz = async (quiz: IQuiz) => {
    // @ts-ignore
    const { data, error } = await poster<number>(`${window.env.API_URL}/quiz`, quiz)

    return {
        response: data,
        error,
    }
}