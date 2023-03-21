import Link from "next/link"

export default function Navbar({
	questionCount,
	currentPage,
	constructLink,
}: {
	questionCount: number
	currentPage: number
	constructLink: (page: number) => string
}) {
	return (
		<div className="flex items-center justify-between mt-4 pb-12">
			<Link
				href={constructLink(currentPage - 1)}
				className={`bg-blue-500 text-white px-8 py-2 rounded-2xl ${
					currentPage === 1 && "invisible"
				}`}
			>
				前へ
			</Link>
			<p className="text-lg">{currentPage}</p>
			<Link
				href={constructLink(currentPage + 1)}
				className={`bg-blue-500 text-white px-8 py-2 rounded-2xl ${
					currentPage === Math.ceil(questionCount / 10) && "invisible"
				}`}
			>
				次へ
			</Link>
		</div>
	)
}
