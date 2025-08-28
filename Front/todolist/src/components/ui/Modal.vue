<script setup lang="ts">
  defineProps<{
    modelValue: boolean
  }>()

  const emit = defineEmits(['update:modelValue', 'closed']);

  const close = () => {
    emit('update:modelValue', false);
    emit('closed');
  }
  import { X } from 'lucide-vue-next'
</script>

<template>
  <div
    v-if="modelValue"
    class="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
  >
    <div class="bg-white rounded-lg shadow-lg p-6 w-96 relative">
      <button
        class="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        @click="close()"
      >
        <X class="mt-4 mr-2 hover:cursor-pointer" />
      </button>

      <slot />
    </div>
  </div>
</template>