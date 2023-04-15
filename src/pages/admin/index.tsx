import axios from "axios"
import Link from "next/link"
import { useContext, useEffect, useState } from "react"
import { useRouter } from "next/router"
import { QuestionType } from "@/pages"
import Navbar from "@/components/Navbar"
import Question from "@/components/Question"
import { UserContext } from "@/pages/_app"

export default function Admin() {
	const router = useRouter()

	const currentPage = !Number.isNaN(Number(router.query.page))
		? Number(router.query.page)
		: 1

	const [questions, setQuestions] = useState<QuestionType[]>([])
	const [questionCount, setQuestionCount] = useState(0)

	const user = useContext(UserContext)

	useEffect(() => {
		;(async () => {
			const res = await axios.get(
				`https://ikura-hamu.trap.show/questions/api/admin/question?offset=${
					currentPage - 1
				}&limit=10`,
				{
					withCredentials: true,
				}
			)
			setQuestions(res.data.questions)
			setQuestionCount(res.data.count)
		})()
	}, [currentPage])

	if (!user?.id) {
		return <div>権限がありません</div>
	}

	return (
		<div className="max-w-screen-lg mx-auto px-4 py-8 sm:px-6 lg:px-8">
			<h1 className="text-3xl font-bold text-center mb-8">Questions Admin</h1>
			<section className="mb-12">
				<h2 className="text-2xl font-semibold mb-2">最近の質問</h2>
				<ul className="space-y-8">
					{questions.map((question) => (
						<Question key={question.id} question={question} isAdmin />
					))}
				</ul>
			</section>

			<Navbar
				questionCount={questionCount}
				currentPage={currentPage}
				constructLink={(page) => `/admin?page=${page}`}
			/>
		</div>
	)
}
