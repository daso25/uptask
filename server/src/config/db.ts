import mongoose from "mongoose";
import colors from "colors";
import dotenv from "dotenv";

export const connectDB = async () => {
  dotenv.config();
  try {
    const connection = await mongoose.connect(process.env.DATABASE_URL);
    console.error(colors.magenta.bold(`MongoDB connection successful: ${connection.connection.host} - ${connection.connection.port}`));
   
  } catch (error) {
    console.error(colors.red.bold("MongoDB connection error"), error.message);
    process.exit(1);
  }
};
