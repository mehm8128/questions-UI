import axios from 'axios'
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
      name: 'notFound',
      component: () => import('../views/NotFoundView.vue')
    }
  ]
})

// router.beforeEach(async (to, from, next) => {
//   document.location = 'http://questions.ikura-hamu.trap.show/api/oauth2/authorize'
//   next()
// })

export default router
