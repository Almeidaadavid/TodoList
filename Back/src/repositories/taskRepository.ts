import { AppDataSource } from "../data-source";
import { Task } from "../entities/Task";


export class TaskRepository {
    private repository = AppDataSource.getRepository(Task);

    async create(TaskData: Partial<Task>) {
        const task = this.repository.create(TaskData);
        return this.repository.save(task);
    }

    async findAll() {
        return this.repository.find();
    }

    async findById(id: number) {
    return this.repository.findOneBy({ id });
  }

  async update(task: Task) {
    return this.repository.save(task);
  }

  async delete(task: Task) {
    return this.repository.delete(task);
  }

}
