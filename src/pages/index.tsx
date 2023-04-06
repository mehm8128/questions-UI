import axios from "axios"
import { FormEvent, useEffect, useState } from "react"
import { useRouter } from "next/router"
import Textearea from "@/components/Textarea"
import Question from "@/components/Question"
import Navbar from "@/components/Navbar"

export interface QuestionType {
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
	const [questions, setQuestions] = useState<QuestionType[]>([])
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
				<p className="text-gray-600">
					この質問箱はtraPのメンバーによって作られた
					<span className="font-extrabold">非公式</span>
					質問箱です。traPの意見を代表するものではないのでご了承ください。
					<br />
					traPに関することや大学に関することなど、自由に質問してください。traP部員が自由に回答します。
				</p>
				<form onSubmit={handleSubmitQuestion} className="mt-6 space-y-4">
					<Textearea
						value={questionText}
						onChange={(e) => setQuestionText(e.target.value)}
						placeholder="例：部員は何人くらいいますか？、初心者でも大丈夫ですか？"
					/>
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
						<Question key={question.id} question={question} isAdmin={false} />
					))}
				</ul>
			</section>

			<Navbar
				currentPage={currentPage}
				questionCount={questionCount}
				constructLink={(page) => `/?page=${page}`}
			/>
		</div>
	)
}
