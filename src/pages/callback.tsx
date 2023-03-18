import axios from "axios"
import { useEffect } from "react"
import { useRouter } from "next/router"

export default function Callback() {
	const router = useRouter()

	useEffect(() => {
		;(async () => {
			try {
				const res = await axios.get(
					`https://ikura-hamu.trap.show/questions/api/callback?code=${router.query.code}`
				)
				router.push("/admin")
			} catch {
				router.push("/")
			}
		})()
	}, [])

	return <></>
}
