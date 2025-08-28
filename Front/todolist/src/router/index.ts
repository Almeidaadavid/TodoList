import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '@/pages/HomePage.vue'
import TodosPage from '@/pages/TodosPage.vue'
import ActiveTodosPage from '@/pages/ActiveTodosPage.vue'
import CompletedTodosPage from '@/pages/CompletedTodosPage.vue'
import ProgressTodosPage from '@/pages/ProgressTodosPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomePage },
    { path: '/todos', component: TodosPage },
    { path: '/todos/active', component: ActiveTodosPage },
    { path: '/todos/completed', component: CompletedTodosPage }, 
    { path: '/todos/progress', component: ProgressTodosPage  },
  ],
})

export default router