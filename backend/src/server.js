import express from "express";

import tasksRouter from "./routes/tasksRouters.js";

const app = express();

app.use(express.json());
app.use("/api/tasks", tasksRouter);

app.listen(5001, () => {
  console.log("Server is running on port 5001");
});
