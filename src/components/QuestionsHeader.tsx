import { UserContext } from "@/pages/_app"
import Image from "next/image"
import Link from "next/link"
import { useContext } from "react"

export default function QuestionsHeader() {
	const user = useContext(UserContext)

	return (
		<header className="h-12 shadow px-4 flex items-center bg-light-50 justify-between">
			<h1 className="text-xl">
				<Link href="/">Questions</Link>
			</h1>
			{!user?.id && (
				<a href="https://ikura-hamu.trap.show/questions/api/oauth2/authorize">
					<button className="border border-blue-500 text-blue-500 px-6 py-1 rounded-2xl">
						Adminになる(traP部員のみ)
					</button>
				</a>
			)}
			{user?.name && (
				<div className="flex items-center gap-4">
					<Link href="/admin">
						<button className="border border-blue-500 text-blue-500 px-6 py-1 rounded-2xl">
							Adminページへ
						</button>
					</Link>
					<img
						src={`https://q.trap.jp/api/v3/public/icon/${user.name}`}
						className="rounded-full h-8 w-8"
						alt={user.name}
					/>
				</div>
			)}
		</header>
	)
}
