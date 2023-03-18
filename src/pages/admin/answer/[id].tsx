import axios from "axios"
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

export default function AdminAnswer() {
	const router = useRouter()

	const questionId = router.query.id as string
	const [question, setQuestion] = useState<Question>()
	const [answerText, setAnswerText] = useState("")
	const [isSending, setIsSending] = useState(false)
	const [isAnonymous, setIsAnonymous] = useState(false)

	const handleSubmitAnswer = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setIsSending(true)
		await axios.post(
			`https://ikura-hamu.trap.show/questions/api/question/${questionId}/answer`,
			{
				answer: answerText,
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
		<>
			<div>
				{/** traPer以外がアクセスした場合 */}
				権限がありません
			</div>
			<div className="pt-12 mx-auto w-1/2">
				<h2 className="text-4xl text-center mb-8">回答フォーム</h2>
				<section>
					<h3 className="mb-2 text-2xl">質問文</h3>
					<p className="border border-gray-400 h-28 p-1 mb-2">
						{question?.question}
					</p>
				</section>
				<section>
					<h3 className="mb-2 text-2xl">回答</h3>
					{question?.answer ? (
						<div>
							<p className="border border-gray-400 h-28 p-1 mb-2">
								{question?.answer}
							</p>
							<p className="text-right">回答者：{question?.answerer}</p>
						</div>
					) : (
						<p>まだ回答がありません</p>
					)}
				</section>

				<section className="mt-8">
					<h3 className="mb-2 text-2xl">
						{question?.answer ? "回答を修正する" : "回答する"}
					</h3>
					<form onSubmit={handleSubmitAnswer}>
						<textarea
							className="border border-gray-300 w-full min-h-32 p-1"
							value={answerText}
							onChange={(e) => setAnswerText(e.target.value)}
							placeholder="例：部員は400人くらいいます！初心者も大歓迎です。"
						/>
						<p>説明説明説明</p>
						<label>
							<input
								type="checkbox"
								checked={isAnonymous}
								onChange={(e) => setIsAnonymous(e.target.checked)}
							/>
							匿名で回答する(チェックを外した場合、回答と一緒にtraP
							IDが表示されます)
						</label>
						<div className="text-right mt-2 pb-12">
							<button
								type="submit"
								disabled={isSending}
								className={`bg-blue-500 text-white px-8 py-2 rounded-2xl ${
									isSending ? "opacity-50" : "opacity-100"
								}`}
							>
								回答を送信
							</button>
						</div>
					</form>
				</section>
			</div>
		</>
	)
}
