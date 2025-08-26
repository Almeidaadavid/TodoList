import { Request, Response } from "express";
import { ErrorMessages } from "../enums/index";
import { TaskService } from "../services/TaskService";

export class TaskController {
    private taskService: TaskService

    constructor(taskService : TaskService) {
        this.taskService = taskService;
    }
     create = async(req: Request, res: Response) => {
         
         try {
            const {name, description, status} = req.body;
            const task = await this.taskService.createTask(name, description, status)
            return res.status(201).json(task);
        } catch(error : any) {
            console.log(error);
            return res.status(400).json({ message: error.message })
        }
    }

     getAll = async(req: Request, res: Response) => {
        try {
            const tasks = await this.taskService.findAll();
            return res.json(tasks);
        } catch(error) {
            console.log(error);
            return res.status(500).json({message: ErrorMessages.SERVER_ERROR});
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);
            const updated = await this.taskService.updateTask(id, req.body);
            const { id: _id, ...TaskWithoutId} = updated;
            return res.json(TaskWithoutId);
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }

     delete = async(req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);
            await this.taskService.deleteTask(id);
            return res.status(204).send();
        } catch (error : any ) {
            console.log(error);
            return res.status(400).json({ message: error.message });
        } 
    }
}