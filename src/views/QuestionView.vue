<script setup lang="ts">
import { ref } from 'vue'
import type { Question } from './HomeView.vue'
//todo:paramsからidを取ってきて質問をfetch

const question = ref<Question>()
</script>

<template>
  <h2>質問</h2>
  <p>{{ question?.question }}</p>
  <p>{{ question?.answer }}</p>
  <!--traPerのみ表示-->
  <RouterLink :to="`/answer/${question?.id}`">回答する</RouterLink>
</template>
