import { useEffect } from "react"

export default function Custom404() {
	useEffect(() => {
		window.location.replace("https://trap.jp/not_found")
	}, [])

	return null
}
