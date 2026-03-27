import TrainingsListView from '@/views/TrainingsListView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TrainingsListView,
    },
    {
      path: '/training',
      name: 'training',
      component: () => import('../views/TrainingFullView.vue'),
    },
  ],
})

export default router
