import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import QuestionView from ".";

export const loader = async ({ params }: {params: any}) => {
    const res = await fetch("http://navhoot-backend.dev.nav.no/quiz")
    
    const resAsJSON = await res.json()
    
    return json({
        question: resAsJSON.questions[parseInt(params.slug) - 1],
        slug: params.slug
        })
}

export default function QuestionSlug() {
    const {question, slug} = useLoaderData()

    return <QuestionView description={question.description} alternative={question.alternative} questionIndex={slug}/>
}