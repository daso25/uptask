import type { Request, Response } from "express";
import Task from "../models/Task";

export class TaskController {
  static getTasksByProjectId = async (req: Request, res: Response) => {
    try {
      const tasks = await Task.find({ project: req.project.id }).populate(
        "project"
      ); /**project es el nombre de la propiedad en el modelo de Task */
      res.status(200).json({ tasks });
    } catch (error) {
      res.status(500).json({ msg: "Hubo un error", error });
    }
  };

  static createTask = async (req: Request, res: Response) => {
    try {
      const task = new Task({
        ...req.body,
        project: req.project.id,
      });
      req.project.tasks.push(task.id);
      await Promise.allSettled([task.save(), req.project.save()]);
      res.status(200).json({ msg: "creado correctamente", task });
    } catch (error) {
      res.status(500).json({ msg: "Error al crear la tarea", error });
    }
  };

  static getTaskById = async (req: Request, res: Response) => {
    try {
      const { taskId } = req.params;
      const task = await Task.findById(taskId);

      if (!task) {
        const error = new Error("Tarea no encontrada");
        return res.status(404).json({ error: error.message });
      }
      if (task.project.toString() !== req.project.id) {
        const error = new Error("Tarea no encontrada en este proyecto");
        return res.status(400).json({ error: error.message });
      }

      res.json(task);
    } catch (error) {
      res.status(500).json({ msg: "Hubo un error", error });
    }
  };

  static updateTask = async (req: Request, res: Response) => {
    try {
      const { taskId } = req.params;
      const task = await Task.findByIdAndUpdate(taskId, req.body);

      if (!task) {
        const error = new Error("Tarea no encontrada");
        return res.status(404).json({ error: error.message });
      }
      if (task.project.toString() !== req.project.id) {
        const error = new Error("Tarea no encontrada en este proyecto");
        return res.status(400).json({ error: error.message });
      }

      res.status(200).json({ msg: "Actualizado correctamente", task });
    } catch (error) {
      res.status(500).json({ msg: "Hubo un error", error });
    }
  };

  static deleteTask = async (req: Request, res: Response) => {
    try {
      const { taskId } = req.params;
      const task = await Task.findById(taskId);

      if (!task) {
        const error = new Error("Tarea no encontrada");
        return res.status(404).json({ error: error.message });
      }
      if (task.project.toString() !== req.project.id) {
        const error = new Error("Tarea no encontrada en este proyecto");
        return res.status(400).json({ error: error.message });
      }

      req.project.tasks = req.project.tasks.filter(task => task.toString() !== taskId);
      await task.deleteOne()
      await req.project.save()
      

      res.json(task);
    } catch (error) {
      res.status(500).json({ msg: "Hubo un error", error });
    }
  };
}
 