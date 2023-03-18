import axios from "axios"
import { useEffect } from "react"
import { useRouter } from "next/router"

export default function Callback() {
	const router = useRouter()
	const code = router.query.code

	useEffect(() => {
		if (!code) return
		;(async () => {
			try {
				const res = await axios.get(
					`https://ikura-hamu.trap.show/questions/api/oauth2/callback?code=${code}`
				)
				router.push("/admin")
			} catch {
				router.push("/")
			}
		})()
	}, [code])

	return <></>
}
