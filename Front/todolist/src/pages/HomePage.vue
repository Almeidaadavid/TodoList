<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Plus, CheckCircle, Circle, List, Hourglass } from 'lucide-vue-next'
import { ref, computed, onMounted } from 'vue'
import { getTodos, type Todo } from '@/api/todos';
import { StatusValues } from '@/type/type';
import TodoCard from '@/components/TodoCard.vue';
const todos = ref<Todo[]>([]);

onMounted(async () => {
  getAllTodos();
})

const getAllTodos = async () => {
    try {
      todos.value = await getTodos();
    } catch(erro) {
      console.log(erro);
    }
  }

  const totalCount = computed(() => todos.value.length)
  const notDoneCount = computed(() => todos.value.filter((t) => t.status !== StatusValues.DONE).length)
  const doneCount = computed(() => todos.value.filter((t) => t.status === StatusValues.DONE).length)
</script>

<template>
  <div class="min-h-screen bg-background">
    <div class="container mx-auto px-4 py-8 max-w-4xl">
        <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-foreground mb-4">Todo App</h1>
        <p class="text-muted-foreground text-lg">Organize suas tarefas com navegação inteligente</p>
      </div>
    <div class="grid md:grid-cols-2 gap-8 mb-12">
      <div class="bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition-shadow">
        <div class="p-6 border-b border-gray-100">
          <div class="flex items-center gap-2 text-gray-900 font-semibold text-lg">
            <Plus class="h-5 w-5 text-blue-600" />
            Comece
          </div>
          <p class="text-gray-500 mt-1">Crie e gerencie suas tarefas com facilidade</p>
        </div>
        <div class="p-6">
          <RouterLink to="/todos">
            <button class="w-full px-5 py-3 rounded-xl bg-gray-900 text-white font-medium hover:bg-gray-800 transition">
              Ver todas as tarefas
            </button>
          </RouterLink>
        </div>
      </div>
      <div class="bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition-shadow">
        <div class="p-6 border-b border-gray-100">
          <div class="flex items-center gap-2 text-gray-900 font-semibold text-lg">
            <CheckCircle class="h-5 w-5 text-green-600" />
            Estatísticas rápidas
          </div>
          <p class="text-gray-500 mt-1">Acompanhe sua produtividade</p>
        </div>
        <div class="p-6 space-y-3">
          <div class="flex justify-between text-gray-700">
            <span>Total Tasks:</span>
            <span class="font-semibold">{{ totalCount }}</span>
          </div>
          <div class="flex justify-between text-gray-700">
            <span>Concluídas:</span>
            <span class="font-semibold text-green-600">{{ doneCount }}</span>
          </div>
          <div class="flex justify-between text-gray-700">
            <span>Restante:</span>
            <span class="font-semibold text-orange-500">{{ notDoneCount }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="grid md:grid-cols-3 gap-6">
      <TodoCard 
        title="Todas as tarefas"
        description="Visualize todas as tarefas"
        :icon="List"
        icon-color="text-blue-600"
        to="/todos"
      />
      <TodoCard 
        title="Em andamento"
        description="Visualize tarefas em andamento"
        :icon="Hourglass"
        icon-color="text-orange-500"
        to="/todos/progress"
      />
      <TodoCard 
        title="Em aberto"
        description="Visualize tarefas em aberto"
        :icon="Circle"
        icon-color="text-orange-500"
        to="/todos/active"
      />
      <TodoCard 
        title="Concluído"
        description="Visualize tarefas concluídas"
        :icon="CheckCircle"
        icon-color="text-green-600"
        to="/todos/completed"
      />
    </div>
    </div>    
  </div>
</template>