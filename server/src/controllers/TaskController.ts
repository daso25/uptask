import type { Request, Response } from "express";
import Task from "../models/Task";



export class TaskController {
    static getTasksByProjectId = async (req: Request, res: Response) => {
       try {
        const tasks = await Task.find({project: req.project.id}).populate('project'); /**project es el nombre de la propiedad en el modelo de Task */
        res.status(200).json({tasks});
       } catch (error) {
        res.status(500).json({msg: "Hubo un error", error});
       }
    }

    static createTask = async (req: Request, res: Response) => {
      
        try {
            const task = new Task({
                ...req.body,
                project: req.project.id
            });
            req.project.tasks.push(task.id)
            await Promise.allSettled([task.save(), req.project.save()])
            res.status(200).json({msg: "creado correctamente", task});

        } catch (error) {
            res.status(500).json({msg: "Error al crear la tarea", error});
        }
      }
}
