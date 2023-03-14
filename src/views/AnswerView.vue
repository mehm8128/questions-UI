<script setup lang="ts">
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import type { Question } from './HomeView.vue'

const route = useRoute()

const questionId = route.params.id as string

const question = ref<Question>()

const answerText = ref('')
const isAnonymous = ref(true)
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
  <div>
    <!--traPer以外がアクセスした場合-->
    権限がありません
  </div>
  <div class="pt-12 mx-auto w-1/2">
    <h2 class="text-4xl text-center mb-8">回答フォーム</h2>
    <section>
      <h3 class="mb-2 text-2xl">質問文</h3>
      <p class="border border-gray-400 h-28 p-1 mb-2">{{ question?.question }}</p>
      <p v-if="question?.answer">
        {{ question?.answer }}
        <span>回答者：{{ question?.answerer }}</span>
      </p>
    </section>

    <section class="mt-8">
      <h3 class="mb-2 text-2xl">回答する</h3>
      <form :onSubmit="handleSubmitAnswer">
        <textarea
          class="border border-gray-300 w-full min-h-32 p-1"
          v-model="answerText"
          placeholder="例：部員は400人くらいいます！初心者も大歓迎です。"
        />
        <p>説明説明説明</p>
        <label>
          <input type="checkbox" v-model="isAnonymous" />
          匿名で回答する(チェックを外した場合、回答と一緒にtraP IDが表示されます)
        </label>
        <div class="text-right mt-2">
          <button
            type="submit"
            :disabled="isSending"
            class="bg-blue-500 text-white px-8 py-2 rounded-2xl"
            :class="isSending ? 'opacity-50' : 'opacity-100'"
          >
            回答を送信
          </button>
        </div>
      </form>
    </section>
  </div>
</template>
