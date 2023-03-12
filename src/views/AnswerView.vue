<script setup lang="ts">
import { ref } from 'vue'
import type { Question } from './HomeView.vue'
//todo:paramsからidを取ってきて質問をfetch

const question = ref<Question>()
const answerText = ref('')

const handleSubmitAnswer = (e: Event) => {
  e.preventDefault()
  console.log(answerText.value)
}
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
    <button type="submit">回答を送信</button>
  </form>
</template>
