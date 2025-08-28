import api from './axios'
import type { Status } from '@/type/type'
import { API_ENDPOINTS } from './endpoints';


export interface Todo {
    id?: number,
    name: string,
    description: string,
    status: Status
}

export const getTodos = async (filter?: string) => {
    const { data } = await api.get<Todo[]>("/task", {
        params: {
            status: filter
        }
    });
    return data;
};

export const create = async (todo: Todo) => {
    const { data } = await api.post<Todo>(API_ENDPOINTS.CREATE_TASK, todo);
    return data;
};

export const getTodoById = async(id: string) => {
    const { data } = await api.get<Todo>(API_ENDPOINTS.GET_TASK_BY_ID.replace("{id}", id));
    return data;
};

export const updateTodo = async(id: string, todo: Todo) => {
    const { data } = await api.put<Todo>(API_ENDPOINTS.UPDATE_TASK.replace("{id}", id), todo);
    return data;
};

export const updateStatusTodo = async(id: string, status: string) => {
    const { data } = await api.patch<Todo>(API_ENDPOINTS.UPDATE_STATUS_TASK.replace("{id}", id), { status });
    return data;
};

export const deleteTodo = async (id: string) => {
  await api.delete(API_ENDPOINTS.DELETE_TASK.replace("{id}", id));
};