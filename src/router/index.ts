import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/questions/:id',
      name: 'question',
      component: () => import('../views/QuestionView.vue')
    },
    {
      path: '/answer/:id',
      name: 'answer',
      component: () => import('../views/AnswerView.vue')
    }
  ]
})

export default router
