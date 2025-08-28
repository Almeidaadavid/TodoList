<script setup lang="ts">
    import TodoList from '@/components/TodoList.vue'

    defineProps<{
        title: string;
        description: string;
        filter?: "OPEN" | "DONE" | "IN_PROGRESS" | undefined;
    }>()
</script>

<template>
  <div class="container mx-auto px-4 py-8 max-w-4xl">
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-900 mb-2"> {{ title }}</h1>
      <p class="text-gray-500"> {{ description }}</p>
    </div>
    <TodoList :filter="filter" />
  </div>
</template>
