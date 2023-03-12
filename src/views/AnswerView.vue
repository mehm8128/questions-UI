<script setup lang="ts">
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import type { Question } from './HomeView.vue'

const route = useRoute()

const questionId = route.params.id as string

const question = ref<Question>()

const answerText = ref('')
const isSending = ref(false)

const handleSubmitAnswer = async (e: Event) => {
  e.preventDefault()
  console.log(answerText.value)
  isSending.value = true
  await axios.post(`http://localhost:3000/api/question/${questionId}/answer`, {
    answer: answerText.value
  })
  isSending.value = false
  alert('回答が送信されました！')
}

onMounted(async () => {
  const res = await axios.get(`http://localhost:3000/api/question/${questionId}`)
  question.value = res.data
})
</script>

<template>
  <h2>回答フォーム</h2>
  <p>説明説明説明</p>
  <p>{{ question?.question }}</p>
  <p v-if="question?.answer">
    {{ question?.answer }}
    <span>回答者：{{ question?.answerer }}</span>
  </p>
  <form :onSubmit="handleSubmitAnswer">
    <label for="answer">回答</label>
    <textarea
      v-model="answerText"
      placeholder="例：部員は400人くらいいます！初心者も大歓迎です。"
      id="answer"
    />
    <button type="submit" :disabled="isSending">回答を送信</button>
  </form>
</template>
