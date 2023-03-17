<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'

export interface Question {
  id: string
  question: string
  answer: string
  answerer: string
  createdAt: string
  updatedAt: string
}

const route = useRoute()
const router = useRouter()

const currentPage = ref(route.query.page ? Number(route.query.page) : 1)

const questions = ref<Question[]>([])

const questionText = ref('')
const isSending = ref(false)

const handleSubmitQuestion = async (e: Event) => {
  e.preventDefault()
  console.log(questionText.value)
  isSending.value = true
  await axios.post('http://questions.ikura-hamu.trap.show/api/question', {
    question: questionText.value
  })
  isSending.value = false
  router.push('/complete')
}

onMounted(async () => {
  const res = await axios.get(
    `http://questions.ikura-hamu.trap.show/api/question?offset=${currentPage.value - 1}&limit=10`
  )
  questions.value = res.data
})
watch(
  () => route.query.page,
  (newPage) => {
    currentPage.value = Number(newPage)
  }
)
</script>

<template>
  <div class="pt-12 mx-auto w-1/2">
    <h1 class="text-4xl text-center mb-8">Questions</h1>
    <section>
      <h2 class="text-2xl">traPに質問してみましょう！</h2>
      <p>説明説明説明</p>
      <form :onSubmit="handleSubmitQuestion" class="mx-4 mt-4">
        <textarea
          class="border border-gray-300 w-full min-h-32 p-1"
          v-model="questionText"
          placeholder="例：部員は何人くらいいますか？、初心者でも大丈夫ですか？"
        />
        <div class="text-right mt-2">
          <button
            type="submit"
            :disabled="isSending"
            class="bg-blue-500 text-white px-8 py-2 rounded-2xl"
            :class="isSending ? 'opacity-50' : 'opacity-100'"
          >
            質問を投稿
          </button>
        </div>
      </form>
    </section>

    <section class="mt-8">
      <h2 class="text-2xl mb-2">最近の質問</h2>
      <ul class="space-y-8">
        <li
          v-for="question in questions"
          :key="question.id"
          class="w-full min-h-40 border border-gray-300 p-3"
        >
          <p class="border border-gray-400 h-28 p-1 mb-2">{{ question.question }}</p>
          <details>
            <summary>回答を表示</summary>
            <p>{{ question.answer }}</p>
            <p class="text-right">
              回答者：
              <a :href="`https://trap.jp/author/${question.answerer}/`">
                {{ question.answerer }}
              </a>
            </p>
          </details>
          <div class="text-right mt-4">
            <RouterLink :to="`/questions/${question.id}`">回答へ＞</RouterLink>
          </div>
        </li>
      </ul>
    </section>

    <div class="flex items-center justify-center gap-4 mt-4 pb-12">
      <RouterLink :to="`/?page=${currentPage - 1}`" v-show="currentPage !== 1">前へ</RouterLink>
      <p>{{ currentPage }}</p>
      <RouterLink :to="`/?page=${currentPage + 1}`">次へ</RouterLink>
    </div>
  </div>
</template>
