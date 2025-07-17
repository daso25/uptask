import mongoose, {Schema, Document, Types} from "mongoose";

const taskStatus = {
PENDING: "pending",
IN_PROGRESS: "inProgress",
COMPLETED: "completed",
ON_HOLD:"onHold",
UNDER_REVIEW:"underReview",
} as const;


export type TaskStatus = typeof taskStatus[keyof typeof taskStatus];

//Este es el type de TypeScript
export interface ITask extends Document {
    name: string;
    description: string;
    project: Types.ObjectId;
    status: TaskStatus;
}

//Este es para el modelo de la base de datos, es decir, la estructura de los datos que se guardan en la base de datos. Es un esquema de mongoose.
const taskSchema : Schema = new Schema<ITask>({
    name: {
        type: String,
        required: true,
        trim: true, /** El trim es para eliminar los espacios en blanco al principio y al final de la cadena de texto */
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: "Project",
        required: true,
    },
    status: {
        type: String,
        enum: Object.values(taskStatus),
        default: taskStatus.PENDING,
    },
}, {
    timestamps: true,
});

const Task = mongoose.model<ITask>("Task", taskSchema);
export default Task;