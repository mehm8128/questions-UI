import Link from "next/link"
import { QuestionType } from "@/pages/index"

export default function Question({
	question,
	isAdmin,
}: {
	question: QuestionType
	isAdmin: boolean
}) {
	return (
		<li
			key={question.id}
			className="rounded-md shadow-sm border border-gray-200 bg-light-50"
		>
			<div className="px-6 pt-4 pb-6">
				<p className="text-gray-800 leading-tight">{question.question}</p>
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
					href={`/questions/${question.id}`}
				>
					{isAdmin ? "回答する" : "詳細へ"} &rarr;
				</Link>
			</div>
		</li>
	)
}
