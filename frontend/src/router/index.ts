import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'task-list',
      component: () => import('../views/TodoView.vue')
    },
    {
      path: '/:catchAll(.*)',
      component: () => import('../components/layout/NotFound.vue')
    }
  ]
})

export default router
