import dotenv from "dotenv";
import express from "express";

// Configure dotenv to load from the correct path
dotenv.config({ path: "./src/.env" });

import tasksRouter from "./routes/tasksRouters.js";
import { connectDB } from "./config/db.js";

const app = express();

connectDB();

app.use(express.json());
app.use("/api/tasks", tasksRouter);

app.listen(5001, () => {
  console.log("Server is running on port 5001");
});
