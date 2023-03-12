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
    },
    {
      path: '/complete',
      name: 'complete',
      component: () => import('../views/CompleteView.vue')
    },
    {
      path: '/:path(.*)',
      name: 'not-found',
      beforeEnter: () => {
        window.location.href = 'https://trap.jp/not-found/'
      }
    }
  ]
})

export default router
