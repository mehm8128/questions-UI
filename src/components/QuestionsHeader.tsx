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
			{user?.name && (
				<Image
					src={`https://q.trap.jp/api/v3/public/icon/${user.name}`}
					className="rounded-full"
					alt={user.name}
				/>
			)}
		</header>
	)
}
