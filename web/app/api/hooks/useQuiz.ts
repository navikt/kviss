import useSWR from 'swr'
import { IQuiz } from '~/context/QuizContext'
import { fetcher } from '../operations'

export const useQuiz = (id: number) => {
    const { data, error } = useSWR<IQuiz, Error>(`/quiz/${id}`, fetcher)

    return {
        quiz: data,
        loading: !error && !data,
        error,
    }
}
