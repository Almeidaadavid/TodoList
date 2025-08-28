<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Plus, Trash2, Loader2, Pen } from 'lucide-vue-next'
import  { type Status, type Todo, StatusValues } from '@/type/type';
import { getTodos, create, getTodoById, updateTodo, deleteTodo, updateStatusTodo } from '@/api/todos';
import Modal from '@/components/ui/Modal.vue'
import { showToast } from '@/lib/utils';

const props = withDefaults(defineProps<{ filter?: undefined | 'OPEN' | 'DONE' | 'IN_PROGRESS' }>(), {
  filter: undefined,
});

const todos = ref<Todo[]>([]);
const todoName = ref('');

const todoDetailName = ref('');
const todoDescription = ref('');
const loading = ref(false);
const showModal = ref(false)
const selected = ref('');
const saveTask = ref(false);
const currentID = ref<string | null>(null);
const isEditTodo = ref(false);
const isDeleteTodo = ref(false);
const deleteTask = ref(false);

function resetTodoForm() {
  todoName.value = '';
  todoDescription.value = '';
  selected.value = '';
  saveTask.value = false;
  showModal.value = false;
  loading.value = false;
  todoDetailName.value = '';
  isEditTodo.value = false;
  currentID.value = null;
  isDeleteTodo.value = false;
  deleteTask.value = false;
}

onMounted(async () => {
  getAllTodos();
})

const getAllTodos = async () => {
  loading.value = true;
    try {
      const filter = props.filter;
      todos.value = await getTodos(filter);
    } catch(erro) {
      console.log(erro);
    } finally {
      loading.value = false;
    }
}

const addTodo = () => {
  openModal();
  todoDetailName.value = todoName.value;
}

const openModal = () => {
  showModal.value = true;
  todoDescription.value = '';
  selected.value = '';
  todoDetailName.value = '';

}

const createTodo = async() => {
  saveTask.value = true;
  if (!validFields()) {
    return
  };

    const task : Todo = {
      name: todoDetailName.value,
      description: todoDescription.value,
      status: selected.value as Status
    }
    try {
      const data = await create(task);
      console.log(data);
      showToast("Tarefa criada com sucesso", "success");
    } catch(error : any) {
      showToast(error.message, "error");
    } finally {
      resetTodoForm();
      getAllTodos();
    };  
}

const validStatus = (todoStatus: Status) : boolean => {
  return todoStatus === StatusValues.DONE
}

// const toggleTodo = (id: string) => {
//   // todos.value = todos.value.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
// }

const toggleEditTodo = async(id: string) => {
    if (!id) {
      return;
    }
    openModal();
    try {
      const data = await getTodoById(id);
      todoDetailName.value = data.name;
      todoDescription.value = data.description;
      selected.value = data.status
      isEditTodo.value = true;
      currentID.value = id;
    } catch(error:any) {
      console.log(error.message);
      showToast(error.message, "error");
    }
}

const editTodo = async() => {
  if (!validFields()) {
    return
  };
  if (!currentID.value) {
    return;
  }

    try {
    const task : Todo = {
      name: todoDetailName.value,
      description: todoDescription.value,
      status: selected.value as Status
    }

    const data = await updateTodo(currentID.value, task);
    showToast("Tarefa atualizada com sucesso.", "success");
  } catch (error: any) {
    showToast(error.message, "error");
  } finally {
    resetTodoForm();
    getAllTodos();
  }
}

const updateStatus = async(id: string, status: string) => {
    status = alterStatusValue(status);
    try {
      const data = await updateStatusTodo(id, status);
      showToast("Status atualizado com sucesso.", "success");
    } catch(error: any) {
      console.log(error);
      showToast(error.message, "error");
    } finally {
      getAllTodos();
    }
}

const alterStatusValue = (status : string) => {
  if (status === StatusValues.DONE) {
    return StatusValues.OPEN
  }

  return StatusValues.DONE
}

const validFields = () : boolean => {
  if (!todoDetailName.value) {
    showToast("É obrigatório ter um nome.", "warning");
    return false;
  }
  if (!selected.value) {
    showToast("É obrigatório selecionar o status", "warning");
    return false;
  }

  if (!Object.values(StatusValues).includes(selected.value as Status)) {
    showToast('Status inválido.', "warning");
    return false;
  }

  return true;
}

const toggleDeleteTodo = (id: string, name: string) => {
  if (!id) {
    return;
  }

  isDeleteTodo.value = true;
  todoDetailName.value = name;
  currentID.value = id;

  openModal();
}

const removeTodo = async() => {
  deleteTask.value = true;
  if (!currentID.value) {
    return;
  }
  try {
    await deleteTodo(currentID.value)
    showToast("Tarefa excluída com sucesso.", "success");
  } catch(error:any) {
    console.log();
    showToast(error.message, "warning");
  }
}

const filteredTodos = computed(() => {
  return todos.value;
  // if (props.filter === 'active') return todos.value.filter((t) => !t.completed)
  // if (props.filter === 'completed') return todos.value.filter((t) => t.completed)
  // return todos.value
})

const activeCount = computed(() => todos.value.filter((t) => t.status === StatusValues.OPEN).length)
const completedCount = computed(() => todos.value.filter((t) => validStatus(t.status)).length)
</script>

<template>
  <div class="space-y-6">
    <div class="bg-white rounded-xl shadow-sm border border-gray-200">
      <div class="p-6">
        <div class="flex gap-2">
          <input
            v-model="todoName"
            @keydown.enter="addTodo"
            type="text"
            placeholder="Adicione uma nova tarefa..."
            class="flex-1 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button @click="addTodo" class="flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">
            <Plus class="h-4 w-4" />
            Add
          </button>
        </div>
      </div>
    </div>
    <Modal v-model="showModal">
      <div v-if="!isDeleteTodo">
        <h2 class="text-xl font-bold mb-4">Adicionar Tarefa</h2>
        <div>
          <span>Nome</span>
          <input
            type="text"
            v-model="todoDetailName"
            placeholder="Digite a tarefa"
            class="w-full border px-2 py-1 rounded mb-4"
          />
        </div>
        <div>
          <span>Descrição</span>
          <input
            type="text"
            v-model="todoDescription"
            placeholder="Digite a descrição da tarefa"
            class="w-full border px-2 py-1 rounded mb-4"
          />
        </div>
        <div class="mb-2">
          <span>Status da tarefa</span>
          <select class="border ml-2" v-model="selected">
            <option disabled value="">Por favor selecione um</option>
            <option value="PENDING">Pendente</option>
            <option value="IN_PROGRESS">Em andamento</option>
            <option value="OPEN">Em aberto</option>
            <option value="DONE">Concluída</option>
          </select>
        </div>
        <div class="flex justify-end">
          <button
            class="px-4 py-2 bg-green-600 text-white rounded right hover:bg-green-700"
            @click="isEditTodo ? editTodo() : createTodo()"
            :disabled="saveTask"
          >
          <div class="flex item-center gap-0.5">
            <Loader2 v-if="saveTask" class="animate-spin w-5 h-5 align-center" />
            <span>{{ saveTask ? "Salvando..." : isEditTodo ? 'Atualizar' : 'Salvar' }}</span>
          </div>
          </button>
        </div>
      </div>
      <div v-else-if="isDeleteTodo">
        <h2 class="text-xl font-bold mb-4">Remover Tarefa</h2>
        <div>
          <span>Deseja excluir o registro? {{ todoDetailName }}</span>
        </div>
        <div class="flex justify-end">
          <button
            class="px-4 py-2 bg-red-600 text-white rounded right hover:bg-red-700"
            @click="removeTodo()"
            :disabled="deleteTask"
          >
          <div class="flex item-center gap-0.5">
            <Loader2 v-if="deleteTask" class="animate-spin w-5 h-5 align-center" />
            <span>{{ deleteTask ? "Processando..." : 'Excluir' }}</span>
          </div>
          </button>
        </div>
      </div>
    </Modal>
    <div class="grid grid-cols-3 gap-4">
      <div class="bg-white rounded-xl shadow-sm border border-gray-200">
        <div class="p-4 text-center">
          <div class="text-2xl font-bold text-blue-500">{{ todos.length }}</div>
          <div class="text-sm text-gray-500">Total</div>
        </div>
      </div>
      <div class="bg-white rounded-xl shadow-sm border border-gray-200">
        <div class="p-4 text-center">
          <div class="text-2xl font-bold text-orange-500">{{ activeCount }}</div>
          <div class="text-sm text-gray-500">Em aberto</div>
        </div>
      </div>
      <div class="bg-white rounded-xl shadow-sm border border-gray-200">
        <div class="p-4 text-center">
          <div class="text-2xl font-bold text-green-500">{{ completedCount }}</div>
          <div class="text-sm text-gray-500">Concluídas</div>
        </div>
      </div>
    </div>
    <div class="space-y-2">
      <div v-if="filteredTodos.length === 0" class="bg-white rounded-xl shadow-sm border border-gray-200">
        <div class="p-8 text-center">
          <p class="text-gray-500">
            <template v-if="filter === StatusValues.OPEN">Não há tarefas em aberto</template>
            <template v-else-if="filter === StatusValues.DONE">Não há tarefas concluídas</template>
            <template v-else-if="filter === StatusValues.IN_PROGRESS">Não há tarefas em andamento</template>
            <template v-else>No todos yet. Add one above!</template>
          </p>
        </div>
      </div>

      <div
        v-else
        v-for="todo in filteredTodos"
        :key="todo.id"
        class="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
      >
        <div class="p-4">
          <div class="flex items-center gap-3">
            <input type="checkbox" @change="updateStatus(todo.id!.toString(), todo.status)" :checked="validStatus(todo.status)" class="h-4 w-4" />
            <span :class="validStatus(todo.status) ? 'line-through text-gray-500 flex-1' : 'text-gray-900 flex-1'">
              {{ todo.name }}
            </span>
            <button @click="toggleEditTodo(todo.id!.toString())" class="px-2 py-1 rounded-md text-red-600 hover:bg-red-50" title="Edit">
              <Pen class="h-4 w-4" />
            </button>
            <button @click="toggleDeleteTodo(todo.id!.toString(), todo.name)" class="px-2 py-1 rounded-md text-red-600 hover:bg-red-50" title="Delete">
              <Trash2 class="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
