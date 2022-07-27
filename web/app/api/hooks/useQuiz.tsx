import { IQuiz } from '~/context/QuizContext'
import { poster } from '../operations'

export const useCreateQuiz = async (quiz: IQuiz) => {
    const { data, error } = await poster<number>('https://kviss-api.dev.nav.no/quiz', quiz)

    return {
        response: data,
        error,
    }
}