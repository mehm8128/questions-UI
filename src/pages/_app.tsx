import "@/styles/globals.css"
import type { AppProps } from "next/app"
import "windi.css"

import QuestionsHeader from "@/components/QuestionsHeader"
import { useRouter } from "next/router"
import axios from "axios"
import { useEffect } from "react"

export default function App({ Component, pageProps }: AppProps) {
	const router = useRouter()
	const path = router.pathname

	// useEffect(() => {
	// 	if (path.startsWith("/admin")) {
	// 		;(async () => {
	// 			try {
	// 				await axios.get(`https://ikura-hamu.trap.show/questions/api/me`, {
	// 					withCredentials: true,
	// 				})
	// 			} catch {
	// 				document.location =
	// 					"https://ikura-hamu.trap.show/questions/api/oauth2/authorize"
	// 			}
	// 		})()
	// 	}
	// }, [path])

	return (
		<div className="text-dark-200 bg-[#f7fafc] min-h-screen">
			<QuestionsHeader />
			<main>
				<Component {...pageProps} />
			</main>
		</div>
	)
}
