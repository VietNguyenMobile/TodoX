import dotenv from "dotenv";
import express from "express";
import tasksRouter from "./routes/tasksRouters.js";
import { connectDB } from "./config/db.js";

// Configure dotenv to load from the correct path
dotenv.config({ path: "./src/.env" });

const app = express();

const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use("/api/tasks", tasksRouter);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
