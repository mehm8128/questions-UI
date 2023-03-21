import axios from "axios"
import Link from "next/link"
import { FormEvent, useEffect, useState } from "react"
import { useRouter } from "next/router"

export interface Question {
	id: string
	question: string
	answer: string
	answerer: string
	created_at: string
	updated_at: string
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
				`https://ikura-hamu.trap.show/questions/api/question?offset=${
					currentPage - 1
				}&limit=10`
			)
			setQuestions(res.data.questions)
			setQuestionCount(res.data.count)
		})()
	}, [])

	return (
		<div className="max-w-screen-lg mx-auto px-4 py-8 sm:px-6 lg:px-8">
			<h1 className="text-3xl font-bold text-center mb-8">Questions</h1>
			<section className="mb-8">
				<h2 className="text-2xl font-semibold mb-2">
					traPに質問してみましょう！
				</h2>
				<p className="text-gray-600">説明説明説明</p>
				<form onSubmit={handleSubmitQuestion} className="mt-6 space-y-4">
					<div className="rounded-md shadow-sm">
						<textarea
							className="block w-full p-1 min-h-32 transition duration-150 ease-in-out sm:text-sm sm:leading-5 border-gray-300 rounded-md"
							value={questionText}
							onChange={(e) => setQuestionText(e.target.value)}
							placeholder="例：部員は何人くらいいますか？、初心者でも大丈夫ですか？"
							required
						/>
					</div>
					<div className="text-right">
						<button
							type="submit"
							disabled={isSending}
							className={`inline-flex items-center justify-center px-6 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-blue-500 hover:bg-blue-400 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out ${
								isSending && "opacity-50 cursor-not-allowed"
							}`}
						>
							{isSending ? "送信中" : "質問を投稿"}
						</button>
					</div>
				</form>
			</section>

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
							</div>
							<div className="px-6 py-4 bg-gray-100 border-t border-gray-200 flex justify-end rounded-b-md">
								<Link
									className="text-sm font-medium text-blue-500 hover:text-blue-400 transition duration-150 ease-in-out"
									href={`/questions/${question.id}`}
								>
									詳細へ &rarr;
								</Link>
							</div>
						</li>
					))}
				</ul>
			</section>

			<div className="flex items-center justify-between mt-4 pb-12">
				{currentPage !== 1 && (
					<Link
						href={`/?page=${currentPage - 1}`}
						className="bg-blue-500 text-white px-8 py-2 rounded-2xl"
					>
						前へ
					</Link>
				)}
				<p className="text-lg">{currentPage}</p>
				{currentPage !== Math.ceil(questionCount / 10) && (
					<Link
						href={`/?page=${currentPage + 1}`}
						className="bg-blue-500 text-white px-8 py-2 rounded-2xl"
					>
						次へ
					</Link>
				)}
			</div>
		</div>
	)
}
