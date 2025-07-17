import mongoose, {Schema, Document, PopulatedDoc} from "mongoose";
import { ITask } from "./Task";

//Este es el type de TypeScript
export interface IProject extends Document {
    projectName: string;
    clientName: string;
    description: string;
    tasks: PopulatedDoc<ITask & Document>[];
}

//Este es para el modelo de la base de datos, es decir, la estructura de los datos que se guardan en la base de datos. Es un esquema de mongoose.
const projectSchema : Schema = new Schema({
    projectName: {
        type: String,
        required: true,
        trim: true, /** El trim es para eliminar los espacios en blanco al principio y al final de la cadena de texto */
    },
    clientName: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    tasks: [
        {
            type: Schema.Types.ObjectId,
            ref: "Task"
        }
    ],
}, {
    timestamps: true,
});

const Project = mongoose.model<IProject>("Project", projectSchema);
export default Project;