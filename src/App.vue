<script setup lang="ts">
import QuestionsHeader from './components/QuestionsHeader.vue'
</script>

<template>
  <div class="text-dark-200 bg-zinc-50 min-h-screen">
    <QuestionsHeader />
    <main>
      <RouterView />
    </main>
  </div>
</template>
