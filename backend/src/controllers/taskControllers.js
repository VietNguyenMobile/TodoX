import Task from "../models/Task.js";

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error retrieving getAllTasks:", error);
    res.status(500).json({ message: "Error retrieving tasks" });
  }
};

const createTask = async (req, res) => {
  try {
    const { title } = req.body;
    const newTask = new Task({ title });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Error creating task" });
  }
};

const updateTask = (req, res) => {
  // Logic to update a task would go here
  res.status(200).json({ message: "Task updated" });
  
};

const deleteTask = (req, res) => {
  // Logic to delete a task would go here
  res.status(200).json({ message: "Task deleted" });
};

export { getAllTasks, createTask, updateTask, deleteTask };
