<script setup lang="ts">
defineProps<{
  modelValue: boolean
}>()

defineEmits(['update:modelValue'])
</script>

<template>
  <div
    v-if="modelValue"
    class="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
  >
    <div class="bg-white rounded-lg shadow-lg p-6 w-96 relative">
      <button
        class="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        @click="$emit('update:modelValue', false)"
      >
        ✖
      </button>

      <slot />
    </div>
  </div>
</template>