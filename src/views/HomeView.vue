<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'

export interface Question {
  id: string
  question: string
  answer: string
  answerer: string
  createdAt: string
  updatedAt: string
}

const route = useRoute()

const currentPage = ref(route.query.page ? Number(route.query.page) : 1)

const questions = ref<Question[]>([])

const questionText = ref('')

const handleSubmitQuestion = async (e: Event) => {
  e.preventDefault()
  console.log(questionText.value)
  await axios.post('http://localhost:3000/api/question', {
    question: questionText.value
  })
}

onMounted(async () => {
  const res = await axios.get(`http://localhost:3000/api/question?offset=${currentPage.value - 1}`)
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
  <h1>Questions</h1>
  <h2>traPに質問してみましょう！</h2>
  <p>説明説明説明</p>
  <form :onSubmit="handleSubmitQuestion">
    <label for="question">質問</label>
    <textarea
      v-model="questionText"
      placeholder="例：部員は何人くらいいますか？、初心者でも大丈夫ですか？"
      id="question"
    />
    <button type="submit">送信</button>
  </form>

  <h2>最近の質問</h2>
  <ul>
    <li v-for="question in questions" :key="question.id">
      <RouterLink :to="`/questions/${question.id}`">
        <p>質問：{{ question.question }}</p>
        <p>回答：{{ question.answer }}</p>
        <p>回答者：{{ question.answerer }}</p>
      </RouterLink>
    </li>
  </ul>
  <div>
    <RouterLink :to="`/?page=${currentPage - 1}`" v-show="currentPage !== 1">前へ</RouterLink>
    <p>{{ currentPage }}</p>
    <RouterLink :to="`/?page=${currentPage + 1}`">次へ</RouterLink>
  </div>
</template>
