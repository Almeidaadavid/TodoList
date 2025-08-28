import { AppDataSource } from "../data-source";
import { Task } from "../entities/Task";


export class TaskRepository {
    private repository = AppDataSource.getRepository(Task);

    async create(TaskData: Partial<Task>) {
        const task = this.repository.create(TaskData);
        return this.repository.save(task);
    }

    async findAll(status?: string) {

      const where: any = {};

      if (status) {
        where.status = status;
      }
        return this.repository.find({
          where: where,
          order: {
            id: 'asc'
          }
        });
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
