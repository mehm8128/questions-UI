import Link from 'next/link'

export default function QuestionsHeader() {
  return (
    <header className="h-12 shadow px-4 flex items-center bg-white">
      <h1 className="text-xl">
        <Link href="/">Questions</Link>
      </h1>
    </header>
  )
}
