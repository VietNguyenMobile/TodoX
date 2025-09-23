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

app.post("/api/tasks", (req, res) => {
  // Logic to add a new task would go here
  res.status(201).json({ message: "Task created" });
});

app.put("/api/tasks/:id", (req, res) => {
  // Logic to update a task would go here
  res.status(200).json({ message: "Task updated" });
});

app.delete("/api/tasks/:id", (req, res) => {
  // Logic to delete a task would go here
  res.status(200).json({ message: "Task deleted" });
});
