import TadaIcon from "@/components/TadaIcon"
import Link from "next/link"

export default function Complete() {
	return (
		<div className="bg-light-50 pt-12 mt-12 mx-auto w-1/2 flex flex-col items-center rounded-md shadow-lg">
			<h2 className="text-4xl text-center mb-8 font-bold text-gray-800">
				質問が送信されました！
			</h2>
			<div className="flex justify-center items-center rounded-full bg-green-100 h-20 w-20 mb-4">
				<TadaIcon />
			</div>
			<Link
				href="/"
				className="text-blue-500 underline hover:text-blue-700 font-bold text-lg mt-auto mb-4"
			>
				＜ホームに戻る
			</Link>
		</div>
	)
}
