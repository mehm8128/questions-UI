<script setup lang="ts">
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import type { Question } from './HomeView.vue'

const route = useRoute()

const questionId = route.params.id as string

const question = ref<Question>()

onMounted(async () => {
  const res = await axios.get(`http://localhost:3000/api/question/${questionId}`)
  question.value = res.data
})
</script>

<template>
  <h2>質問</h2>
  <p>{{ question?.question }}</p>
  <p>{{ question?.answer }}</p>
  <!--traPerのみ表示-->
  <RouterLink :to="`/answer/${question?.id}`">回答する</RouterLink>
</template>
