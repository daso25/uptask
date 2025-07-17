import type {Request, Response, NextFunction} from 'express'
import Project, { IProject } from "../models/Project";



declare global {
    namespace Express {
        interface Request {
            project:IProject /**Esto nos permite agregar una nueva propiedad a Request */
        }
    }
}


export async function validateProjectExists (req:Request, res:Response, next:NextFunction){
    try {
        const {projectId} = req.params
        const project = await Project.findById(projectId)
        if(!project){
            return res.status(404).json({msg: "Proyecto no encontrado"});
         }

         req.project = project
         next()

    } catch (error) {
        res.status(500).json({error: 'Hubo un error'})
    }
}