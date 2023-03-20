import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { Question } from "@/pages"

export default function Admin() {
	const router = useRouter()

	const [currentPage, setCurrentPage] = useState(
		router.query.page ? Number(router.query.page) : 1
	)
	const [questions, setQuestions] = useState<Question[]>([])

	useEffect(() => {
		;(async () => {
			const res = await axios.get(
				`https://ikura-hamu.trap.show/questions/api/question?offset=${
					currentPage - 1
				}&limit=10`
			)
			setQuestions(res.data)
		})()
	}, [])

	return (
		<div className="pt-12 mx-auto w-1/2">
			<h1 className="text-4xl text-center mb-8">Questions Admin</h1>

			<section className="mt-8">
				<h2 className="text-2xl mb-2">最近の質問</h2>
				<ul className="space-y-8">
					{questions.map((question) => (
						<li
							key={question.id}
							className="w-full min-h-40 border border-gray-300 p-3 bg-white rounded-4xl"
						>
							<p className="border border-gray-400 h-28 p-1 mb-2 bg-white rounded-md">
								{question.question}
							</p>
							<details>
								<summary>回答を表示</summary>
								<p>{question.answer}</p>
								<p className="text-right">
									回答者：
									<a href={`https://trap.jp/author/${question.answerer}/`}>
										{question.answerer}
									</a>
								</p>
							</details>
							<div className="text-right mt-4">
								<Link href={`/admin/answer/${question.id}`}>回答する＞</Link>
							</div>
						</li>
					))}
				</ul>
			</section>

			<div className="flex items-center justify-center gap-4 mt-4 pb-12">
				<Link href={`/?page=${currentPage - 1}`}>前へ</Link>
				<p>{currentPage}</p>
				<Link href={`/?page=${currentPage + 1}`}>次へ</Link>
			</div>
		</div>
	)
}
