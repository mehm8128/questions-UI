import "@/styles/globals.css"
import type { AppProps } from "next/app"
import "windi.css"

import QuestionsHeader from "@/components/QuestionsHeader"
import { useRouter } from "next/router"
import axios from "axios"
import { createContext, useEffect, useState } from "react"
import Head from "next/head"

export interface User {
	id: string
	name: string
	displayName: string
}

export const UserContext = createContext<User | null>(null)

export default function App({ Component, pageProps }: AppProps) {
	const router = useRouter()
	const path = router.pathname

	const [user, setUser] = useState<User | null>(null)

	useEffect(() => {
		;(async () => {
			const res = await axios.get(
				`https://ikura-hamu.trap.show/questions/api/me`,
				{
					withCredentials: true,
				}
			)
			setUser(res.data)
		})()
	}, [path])

	return (
		<div className="text-dark-200 bg-[#f7fafc] min-h-screen pb-12">
			<Head>
				<title>Questions</title>
			</Head>

			<UserContext.Provider value={user}>
				<QuestionsHeader />
				<main>
					<Component {...pageProps} />
				</main>
			</UserContext.Provider>
		</div>
	)
}
