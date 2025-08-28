<template>
  <nav class="bg-white border-b border-gray-200">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <RouterLink to="/" class="font-bold text-xl text-gray-900">
          TodoApp
        </RouterLink>
        <div class="flex items-center space-x-2">
          <RouterLink
            v-for="item in navItems"
            :key="item.href"
            :to="item.href"
            class=""
          >
            <button
              class="flex items-center gap-2 px-3 py-2 rounded-md text-sm transition"
              :class="isActive(item.href) ? 'bg-blue-600 text-white' : 'hover:bg-gray-100 text-gray-700'"
            >
              <component :is="item.icon" class="w-4 h-4" />
              <span class="hidden sm:inline">{{ item.label }}</span>
            </button>
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import { Home, CheckCircle, Circle, List, Hourglass } from 'lucide-vue-next'

const route = useRoute()

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/todos', label: 'Todas as tarefas', icon: List },
  { href: '/todos/active', label: 'Em aberto', icon: Circle },
  { href: '/todos/progress', label: 'Em andamento', icon: Hourglass },
  { href: '/todos/completed', label: 'Concluído', icon: CheckCircle },
]

const isActive = (href: string) => route.path === href
</script>
