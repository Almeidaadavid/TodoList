import { Router } from 'express';
import { TaskController } from '../controllers/TaskController';
import { TaskRepository } from '../repositories/taskRepository';
import { TaskService } from '../services/TaskService';

const taskRoute = Router();
const taskRepository = new TaskRepository();
const taskService = new TaskService(taskRepository);
const taskController = new TaskController(taskService);
taskRoute.post('/', taskController.create);
taskRoute.get('/', taskController.getAll);
taskRoute.get('/:id', taskController.getById);
taskRoute.delete('/:id', taskController.delete);
taskRoute.put('/:id', taskController.update);
taskRoute.patch('/:id/status', taskController.updateStatus);

export default taskRoute;