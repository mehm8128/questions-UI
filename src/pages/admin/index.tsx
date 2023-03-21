import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { QuestionType } from "@/pages"
import Navbar from "@/components/Navbar"

export default function Admin() {
	const router = useRouter()

	const currentPage = !Number.isNaN(Number(router.query.page))
		? Number(router.query.page)
		: 1
	const [questions, setQuestions] = useState<QuestionType[]>([])
	const [questionCount, setQuestionCount] = useState(0)

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
	}, [])

	return (
		<div className="max-w-screen-lg mx-auto px-4 py-8 sm:px-6 lg:px-8">
			<h1 className="text-3xl font-bold text-center mb-8">Questions Admin</h1>
			<section className="mb-12">
				<h2 className="text-2xl font-semibold mb-2">最近の質問</h2>
				<ul className="space-y-8">
					{questions.map((question) => (
						<li
							key={question.id}
							className="rounded-md shadow-sm border border-gray-200"
						>
							<div className="p-6">
								<p className="text-gray-800 leading-tight">
									{question.question}
								</p>
								{question.answer && (
									<details className="mt-2">
										<summary className="font-medium text-gray-600 cursor-pointer">
											回答を表示
										</summary>
										<p className="mt-2 text-gray-700 leading-tight">
											{question.answer}
										</p>
										<p className="mt-2 text-right text-sm text-gray-500">
											回答者：
											<a
												href={`https://trap.jp/author/${question.answerer}/`}
												className="underline"
												target="_blank"
												rel="noopener noreferrer"
											>
												{question.answerer}
											</a>
										</p>
									</details>
								)}
							</div>
							<div className="px-6 py-4 bg-gray-100 border-t border-gray-200 flex justify-end rounded-b-md">
								<Link
									className="text-sm font-medium text-blue-500 hover:text-blue-400 transition duration-150 ease-in-out"
									href={`/admin/answer/${question.id}`}
								>
									回答する &rarr;
								</Link>
							</div>
						</li>
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
