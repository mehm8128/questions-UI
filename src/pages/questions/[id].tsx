import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { Question as QuestionType } from "@/pages"

export default function Question() {
	const router = useRouter()
	const questionId = router.query.id as string

	const [question, setQuestion] = useState<QuestionType>()

	useEffect(() => {
		;(async () => {
			const res = await axios.get(
				`https://ikura-hamu.trap.show/questions/api/question/${questionId}`
			)
			setQuestion(res.data)
		})()
	}, [])

	return (
		<div className="pt-12 mx-auto max-w-screen-md">
			<h2 className="text-4xl text-center mb-8 font-bold">質問の詳細</h2>
			<section className="mb-8">
				<h3 className="mb-4 text-2xl font-bold">質問文</h3>
				<p className="border border-gray-400 h-28 p-4 mb-4 bg-white text-lg">
					{question?.question}
				</p>
			</section>
			<section className="mb-8">
				<h3 className="mb-4 text-2xl font-bold">回答</h3>
				{question?.answer ? (
					<div>
						<p className="border border-gray-400 h-28 p-4 mb-4 bg-white text-lg">
							{question?.answer}
						</p>
						<p className="text-right font-medium">
							回答者：{question?.answerer}
						</p>
					</div>
				) : (
					<p className="text-lg font-medium mb-4">まだ回答がありません</p>
				)}
			</section>

			<div className="text-right">
				{/** traPerのみ表示 */}
				<Link
					href={`/admin/answer/${question?.id}`}
					className="text-blue-500 hover:text-blue-700 text-lg font-medium"
				>
					{question?.answer ? "回答を修正する" : "回答する"} &gt;
				</Link>
			</div>
		</div>
	)
}
