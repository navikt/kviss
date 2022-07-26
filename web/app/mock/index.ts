import { IQuestion } from '~/context/QuizContext'

export const emptyQuestion: IQuestion = {
    quizId: 1,
    description: '',
    alternatives: [
        { text: '', isCorrect: false },
        { text: '', isCorrect: false },
        { text: '', isCorrect: false },
        { text: '', isCorrect: false },
    ],
    sortOrder: 1,
}
