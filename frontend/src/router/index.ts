import TrainingsListView from '@/views/TrainingsListView.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TrainingsListView,
    },
    {
      path: '/trainings',
      name: 'trainings',
      component: TrainingsListView,
    },
    {
      path: '/trainings/:id',
      name: 'training',
      component: () => import('../views/TrainingFullView.vue'),
    },
    {
      path: '/add-training',
      name: 'add-training',
      component: () => import('../views/AddTrainingView.vue'),
    },
    {
      path: '/logs',
      name: 'logs',
      component: () => import('../views/LogsListView.vue'),
    },
    {
      path: '/plans',
      name: 'plans',
      component: () => import('../views/PlansListView.vue'),
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('../views/SettingsView.vue'),
    },
  ],
})

export default router
