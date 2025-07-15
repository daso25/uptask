import type { Request, Response } from 'express';
import Project from '../models/Project';


export class ProjectController {
/**GET - Obtener todos los proyectos */
 static getAllProjects = async (req: Request, res: Response) => {
   try {
      const projects = await Project.find({});
      res.status(200).json({projects});
   } catch (error) {
      res.status(500).json({msg: "Error al obtener los proyectos"});
   }
    
 }

 /**GET - Obtener un proyecto por su ID */
 static getProjectById = async (req: Request, res: Response) => {
   const {id} = req.params;
   try {
      const project = await Project.findById(id);

      if(!project){
         return res.status(404).json({msg: "Proyecto no encontrado"});
      }

      res.status(200).json({project});
   } catch (error) {
      res.status(500).json({msg: "Error al obtener el proyecto"});
   }
 }

 /**POST - Crear un proyecto */
 static createProject = async (req: Request, res: Response) => {
   const project = new Project(req.body);
   try {
      await project.save();
      res.status(201).json({project});
   } catch (error) {
      res.status(500).json({msg: "Error al crear el proyecto"});
   }
 }

 /**PUT - Actualizar un proyecto */
 static updateProject = async (req: Request, res: Response) => {
   const {id} = req.params;
   const {projectName, description, clientName} = req.body;
   try {
      const project = await Project.findByIdAndUpdate(id, {projectName, description, clientName}, {new: true});
      await project.save()

      if(!project){
         return res.status(404).json({msg: "Proyecto no encontrado"});
      }

      res.status(200).json({project});
   } catch (error) {
      res.status(500).json({msg: "Error al actualizar el proyecto"});
   }
 }


 /**DELETE - Eliminar un proyecto */
 static deleteProject = async (req: Request, res: Response) => {
   const {id} = req.params;
   try {
      const project = await Project.findByIdAndDelete(id);
      if(!project){
         return res.status(404).json({msg: "Proyecto no encontrado"});
      }
      res.status(200).json({msg: "Proyecto eliminado correctamente"});
   } catch (error) {
      res.status(500).json({msg: "Error al eliminar el proyecto"});
   }
 }
}