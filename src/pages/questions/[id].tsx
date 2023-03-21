import axios from "axios"
import { FormEvent, useEffect, useState } from "react"
import { useRouter } from "next/router"
import { QuestionType } from "@/pages"
import Textarea from "@/components/Textarea"

export default function Question() {
	const router = useRouter()
	const questionId = router.query.id as string

	const [question, setQuestion] = useState<QuestionType>()
	const [answerText, setAnswerText] = useState("")
	const [isSending, setIsSending] = useState(false)

	const handleSubmitAnswer = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setIsSending(true)
		await axios.post(
			`https://ikura-hamu.trap.show/questions/api/admin/question/${questionId}/answer`,
			{
				answer: answerText,
			},
			{
				withCredentials: true,
			}
		)
		setIsSending(false)
		alert("回答が送信されました！")
	}

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

			{/* traPerのみ表示 */}
			<section className="mt-8">
				<h3 className="mb-2 text-2xl">
					{question?.answer ? "回答を修正する" : "回答する"}
				</h3>
				<form onSubmit={handleSubmitAnswer}>
					<Textarea
						value={answerText}
						onChange={(e) => setAnswerText(e.target.value)}
						placeholder="例：部員は400人くらいいます！初心者も大歓迎です。"
					/>
					<div className="text-right mt-4">
						<button
							type="submit"
							disabled={isSending}
							className={`inline-flex items-center justify-center px-6 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-blue-500 hover:bg-blue-400 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out ${
								isSending ? "opacity-50" : "opacity-100"
							}`}
						>
							{isSending ? "送信中" : "回答を投稿"}
						</button>
					</div>
				</form>
			</section>
		</div>
	)
}
