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
      path: '/complete',
      name: 'complete',
      component: () => import('../views/CompleteView.vue')
    },
    {
      path: '/admin',
      name: 'adminHome',
      component: () => import('../views/AdminHomeView.vue')
    },
    {
      path: '/admin/answer/:id',
      name: 'adminAnswer',
      component: () => import('../views/AdminAnswerView.vue')
    }
    // {
    //   path: '/:path(.*)',
    //   name: 'notFound',
    //   component: () => import('../views/NotFoundView.vue')
    // }
  ]
})

router.beforeEach(async (to, from, next) => {
  if (to.name !== 'adminHome' && to.name !== 'adminAnswer') {
    next()
    return
  }
  try {
    await axios.get(`http://questions.ikura-hamu.trap.show/api/me`)
  } catch {
    document.location = 'http://questions.ikura-hamu.trap.show/api/oauth2/authorize'
    next()
    return
  }
  next()
})

export default router
