import axios from "axios"
import Link from "next/link"
import { FormEvent, useEffect, useState } from "react"
import { useRouter } from "next/router"

export interface Question {
	id: string
	question: string
	answer: string
	answerer: string
	createdAt: string
	updatedAt: string
}

export default function Home() {
	const router = useRouter()

	const currentPage = !Number.isNaN(Number(router.query.page))
		? Number(router.query.page)
		: 1
	const [questions, setQuestions] = useState<Question[]>([])
	const [questionCount, setQuestionCount] = useState(0)
	const [questionText, setQuestionText] = useState("")
	const [isSending, setIsSending] = useState(false)

	const handleSubmitQuestion = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setIsSending(true)
		await axios.post("https://ikura-hamu.trap.show/questions/api/question", {
			question: questionText,
		})
		setIsSending(false)
		router.push("/complete")
	}

	useEffect(() => {
		;(async () => {
			const res = await axios.get(
				`https://ikura-hamu.trap.show/questions/api/question/answered?offset=${
					currentPage - 1
				}&limit=10`
			)
			setQuestions(res.data.questions)
			setQuestionCount(res.data.count)
		})()
	}, [])

	return (
		<div className="pt-12 mx-auto w-1/2">
			<h1 className="text-4xl text-center mb-8">Questions</h1>
			<section>
				<h2 className="text-2xl">traPに質問してみましょう！</h2>
				<p>説明説明説明</p>
				<form onSubmit={handleSubmitQuestion} className="mx-4 mt-4">
					<textarea
						className="border border-gray-300 w-full min-h-32 p-1"
						value={questionText}
						onChange={(e) => setQuestionText(e.target.value)}
						placeholder="例：部員は何人くらいいますか？、初心者でも大丈夫ですか？"
					/>
					<div className="text-right mt-2">
						<button
							type="submit"
							disabled={isSending}
							className={`bg-blue-500 text-white px-8 py-2 rounded-2xl ${
								isSending ? "opacity-50" : "opacity-100"
							}`}
						>
							質問を投稿
						</button>
					</div>
				</form>
			</section>

			<section className="mt-8">
				<h2 className="text-2xl mb-2">最近の質問</h2>
				<ul className="space-y-8">
					{questions.map((question) => (
						<li
							key={question.id}
							className="w-full min-h-40 border border-gray-300 p-3 bg-white rounded-md"
						>
							<p className="border border-gray-400 h-28 p-1 mb-2 bg-white">
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
								<Link href={`/questions/${question.id}`}>詳細へ＞</Link>
							</div>
						</li>
					))}
				</ul>
			</section>

			<div className="flex items-center justify-center gap-4 mt-4 pb-12">
				{currentPage !== 1 && (
					<Link href={`/?page=${currentPage - 1}`}>前へ</Link>
				)}
				<p>{currentPage}</p>
				{currentPage !== Math.ceil(questionCount / 10) && (
					<Link href={`/?page=${currentPage + 1}`}>次へ</Link>
				)}
			</div>
		</div>
	)
}
