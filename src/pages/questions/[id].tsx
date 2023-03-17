import axios from 'axios'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Question as QuestionType } from '@/pages'

export default function Question() {
  const router = useRouter()
  const questionId = router.query.id as string

  const [question, setQuestion] = useState<QuestionType>()

  useEffect(() => {
    ;(async () => {
      const res = await axios.get(
        `http://questions.ikura-hamu.trap.show/api/question/${questionId}`
      )
      setQuestion(res.data)
    })()
  }, [])

  return (
    <div className="pt-12 mx-auto w-1/2">
      <h2 className="text-4xl text-center mb-8">質問の詳細</h2>
      <section>
        <h3 className="mb-2 text-2xl">質問文</h3>
        <p className="border border-gray-400 h-28 p-1 mb-2">{question?.question}</p>
      </section>
      <section>
        <h3 className="mb-2 text-2xl">回答</h3>
        {question?.answer ? (
          <div>
            <p className="border border-gray-400 h-28 p-1 mb-2">{question?.answer}</p>
            <p className="text-right">回答者：{question?.answerer}</p>
          </div>
        ) : (
          <p>まだ回答がありません</p>
        )}
      </section>

      <div className="text-right mr-4 mt-4">
        {/** traPerのみ表示 */}
        <Link href={`/answer/${question?.id}`}>
          {question?.answer ? '回答を修正する' : '回答する'}＞
        </Link>
      </div>
    </div>
  )
}
