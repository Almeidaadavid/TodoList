import { ErrorMessages, Status } from "../enums";
import { TaskRepository } from "../repositories/taskRepository";

export class TaskService {
    private taskRepository : TaskRepository
    constructor(taskRepository : TaskRepository) {
        this.taskRepository = taskRepository;
    }

    async createTask(name: string, description?: string, status?: string) {
        if (!name) throw new Error(ErrorMessages.NAME_REQUIRED);
        if (!status) throw new Error(ErrorMessages.STATUS_REQUIRED)

        if (!Object.values(Status).includes(status as Status)) {
            throw new Error(ErrorMessages.INVALID_STATUS);
        }

        return this.taskRepository.create({ name, description, status: status as Status });
    }

    async findAll() {
        return this.taskRepository.findAll();
    }

    async updateTask(id: number, data: Partial<{name: string, description: string, status: string}>) {
        const task = await this.taskRepository.findById(id);
        if (!task) throw new Error(ErrorMessages.TASK_NOT_FOUND);
        Object.assign(task, data);
        return this.taskRepository.update(task);
    }

    async deleteTask(id: number) {
        const task = await this.taskRepository.findById(id);
        if (!task) throw new Error(ErrorMessages.TASK_NOT_FOUND);
        return this.taskRepository.delete(task);
    }
}