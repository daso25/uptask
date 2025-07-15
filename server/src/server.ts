import express  from "express";
import { connectDB } from "./config/db";
import dotenv from "dotenv";
import colors from "colors";
import projectRoutes from "./routes/projectRoutes";

dotenv.config();
connectDB();

const app = express(); 

//Routes
app.use('/api/projects', projectRoutes);

export default app