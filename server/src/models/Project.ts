import mongoose, {Schema, Document} from "mongoose";

//Este es el type de TypeScript
export type ProjectType = Document & {
    projectName: string;
    clientName: string;
    description: string;
}

//Este es para el modelo de la base de datos, es decir, la estructura de los datos que se guardan en la base de datos. Es un esquema de mongoose.
const projectSchema : Schema = new Schema<ProjectType>({
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
});

const Project = mongoose.model<ProjectType>("Project", projectSchema);
export default Project;