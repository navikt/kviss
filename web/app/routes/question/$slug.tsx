import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import QuestionView from ".";

export const loader = async ({ params }: {params: any}) => {
    return json({ slug: params.slug })
}

export default function QuestionSlug() {
    const { slug } = useLoaderData()

    return <>{slug}</>
}