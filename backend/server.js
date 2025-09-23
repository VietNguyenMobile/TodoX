import express from "express";

const app = express();

app.listen(5001, () => {
  console.log("Server is running on port 5001");
});

app.get("/api/tasks", (req, res) => {
  const tasks = [
    { id: 1, title: "Task 1", completed: false },
    { id: 2, title: "Task 2", completed: true },
  ];
  res.status(200).send(tasks);
});
