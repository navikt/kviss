import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import QuestionView from '.'
import { useQuiz } from '~/context/QuizContext'


export const loader = async ({ params }: { params: any }) => {
	return json({
		slug: params.slug
	})
}

export default function QuestionSlug() {
	const { quiz } = useQuiz()
	const { slug } = useLoaderData()

	const question = quiz.questions[parseInt(slug) - 1]


	return <QuestionView description={question.description} alternative={question.alternative} questionIndex={slug} />
}