<script setup lang="ts">
import TodoPage from '@/components/TodoPage.vue';
</script>

<template>
    <TodoPage 
        title="Tarefas em andamento"
        description="Foco em suas tarefas em andamento."
        filter="IN_PROGRESS"
    />
</template>
