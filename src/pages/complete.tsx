import TadaIcon from "@/components/TadaIcon"
import Link from "next/link"

export default function Complete() {
	return (
		<div className="pt-12 mx-auto w-1/2">
			<h2 className="text-4xl text-center mb-8">質問が送信されました！</h2>
			<div className="flex justify-center mb-4">
				<TadaIcon />
			</div>

			<Link href="/">＜ホームに戻る</Link>
		</div>
	)
}
