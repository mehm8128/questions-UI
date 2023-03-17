<script setup lang="ts">
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import type { Question } from './HomeView.vue'

const route = useRoute()

const questionId = route.params.id as string

const question = ref<Question>()

onMounted(async () => {
  const res = await axios.get(`http://questions.ikura-hamu.trap.show/api/question/${questionId}`)
  question.value = res.data
})
</script>

<template>
  <div class="pt-12 mx-auto w-1/2">
    <h2 class="text-4xl text-center mb-8">質問の詳細</h2>
    <section>
      <h3 class="mb-2 text-2xl">質問文</h3>
      <p class="border border-gray-400 h-28 p-1 mb-2 question">{{ question?.question }}</p>
    </section>
    <section>
      <h3 class="mb-2 text-2xl">回答</h3>
      <div v-if="question?.answer">
        <p class="border border-gray-400 h-28 p-1 mb-2">
          {{ question?.answer }}
        </p>
        <p class="text-right">回答者：{{ question?.answerer }}</p>
      </div>
      <p v-else>まだ回答がありません</p>
    </section>

    <div class="text-right mr-4 mt-4">
      <!--traPerのみ表示-->
      <RouterLink :to="`/answer/${question?.id}`">
        {{ question?.answer ? '回答を修正する' : '回答する' }}＞
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.question {
  view-transition-name: question;
  contain: paint;
}
</style>
