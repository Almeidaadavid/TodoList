<script setup lang="ts">
import type { Status, Todo } from '@/type/type';
import { Pen, Trash2 } from 'lucide-vue-next';

    defineProps<{
        todo: Todo;
        validStatus: (status: Status) => boolean;
    }>()

   defineEmits<{
        (e: 'update-status', id: string, status: Status): void
        (e: 'edit', id: string): void
        (e: 'delete', id: string, name: string): void
    }>()

</script>

<template>
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
        <div class="p-4">
          <div class="flex items-center gap-3">
            <input type="checkbox" 
                @change="$emit('update-status', todo.id!.toString(), todo.status)" 
                :checked="validStatus(todo.status)" 
                class="h-4 w-4" />
            <span :class="validStatus(todo.status) ? 'line-through text-gray-500 flex-1' : 'text-gray-900 flex-1'">
              {{ todo.name }}
            </span>
            <button @click="$emit('edit',todo.id!.toString())" class="px-2 py-1 rounded-md text-red-600 hover:bg-red-50" title="Edit">
              <Pen class="h-4 w-4" />
            </button>
            <button @click="$emit('delete',todo.id!.toString(), todo.name)" class="px-2 py-1 rounded-md text-red-600 hover:bg-red-50" title="Delete">
              <Trash2 class="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
</template>