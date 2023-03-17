import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import 'windi.css'

import QuestionsHeader from '@/components/QuestionsHeader'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="text-dark-200 bg-zinc-50 min-h-screen">
      <QuestionsHeader />
      <main>
        <Component {...pageProps} />
      </main>
    </div>
  )
}
