<script setup lang="ts">
import TodoPage from '@/components/TodoPage.vue';
</script>

<template>
  <TodoPage 
    title="Tarefas em aberto"
    description="Foco em suas tarefas em aberto."
    filter="OPEN"
  />
</template>
