import { Router } from "express";
import { body, param } from "express-validator";
import { ProjectController } from "../controllers/ProjectController";
import { TaskController } from "../controllers/TaskController";
import { handleInputErrors } from "../middleware/validation";
import {validateProjectExists} from '../middleware/project'

const router = Router();

/**GET - Obtener todos los proyectos */
router.get("/", ProjectController.getAllProjects);

/**GET - Obtener un proyecto por su ID */
router.get("/:id",
    param("id").isMongoId().withMessage("ID no válido"),
    handleInputErrors,
     ProjectController.getProjectById
    );

/**POST - Crear un proyecto */
router.post("/", 
    body("projectName").notEmpty().withMessage("El nombre del proyecto es obligatorio"),
    body("description").notEmpty().withMessage("La descripción es obligatoria"),
    body("clientName").notEmpty().withMessage("El nombre del cliente es obligatorio"),
    handleInputErrors,
    ProjectController.createProject
);

/**PUT - Actualizar un proyecto */
router.put("/:id",
    param("id").isMongoId().withMessage("ID no válido"),
    body("projectName").notEmpty().withMessage("El nombre del proyecto es obligatorio"),
    body("description").notEmpty().withMessage("La descripción es obligatoria"),
    body("clientName").notEmpty().withMessage("El nombre del cliente es obligatorio"),
    handleInputErrors,
    ProjectController.updateProject
);

/**DELETE - Eliminar un proyecto */
router.delete("/:id",
    param("id").isMongoId().withMessage("ID no válido"),
    handleInputErrors,
    ProjectController.deleteProject
);


/************ TASK ROUTES ***************/

/**GET - Obtener todas las tareas de un proyecto */
/*router.get("/:projectId/tasks",
    param("projectId").isMongoId().withMessage("ID del proyecto no válido"),
    handleInputErrors,
    TaskController.getTasksByProjectId
);
*/


router.get("/:projectId/tasks",
    validateProjectExists,
    param("projectId").isMongoId().withMessage("ID del proyecto no válido"),
    handleInputErrors,
    TaskController.getTasksByProjectId
);


/**POST - Crear tarea */
router.post("/:projectId/tasks", 
    validateProjectExists,
    body("name").notEmpty().withMessage("El nombre de la tarea  es obligatorio"),
    body("description").notEmpty().withMessage("La descripción es obligatoria"),
    handleInputErrors,
    TaskController.createTask);


/**GET - Obtener una tarea por ID */
router.get("/:projectId/tasks/:taskId",
    validateProjectExists,
    param("projectId").isMongoId().withMessage("ID del proyecto no válido"),
    param("taskId").isMongoId().withMessage("ID de la tarea no válido"),
    handleInputErrors,
    TaskController.getTaskById
);


/**PUT - Actualizar tarea */
router.put("/:projectId/tasks/:taskId",
    validateProjectExists,
    param("taskId").isMongoId().withMessage("ID de la tarea no válido"),
    body("name").notEmpty().withMessage("El nombre de la tarea  es obligatorio"),
    body("description").notEmpty().withMessage("La descripción es obligatoria"),
    handleInputErrors,
    TaskController.updateTask
);


/**DELETE - Eliminar una tarea */
router.delete("/:projectId/tasks/:taskId",
    validateProjectExists,
    param("taskId").isMongoId().withMessage("ID de la tarea no válido"),
    handleInputErrors,
    TaskController.deleteTask
);


export default router;