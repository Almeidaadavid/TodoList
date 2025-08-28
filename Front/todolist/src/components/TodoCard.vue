<script setup lang="ts">
    import type { Component } from 'vue';
    import { RouterLink } from 'vue-router'
    defineProps<{
        to: string;
        title: string;
        description: string;
        icon: Component;
        iconColor?: string;
    }>();
</script>

<template>
    <RouterLink :to="to">
        <div
          class="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition cursor-pointer">
          <div class="p-8 text-center">
            <Component :is="icon" class="h-10 w-10 mx-auto mb-3" :class="iconColor" />
            <h3 class="font-semibold text-gray-900 text-lg">{{ title }}</h3>
            <p class="text-sm text-gray-500">{{description}}</p>
          </div>
        </div>
      </RouterLink>
</template>