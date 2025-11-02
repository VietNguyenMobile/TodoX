import Task from "../models/Task.js";

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
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

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, status } = req.body;
    console.log("Update Task ID:", id);
    console.log("Update Task Request Body:", req.body);

    const updatedFields = { title };
    if (status === "completed") {
      updatedFields.status = "completed";
      updatedFields.completedAt = new Date();
    } else if (status === "active") {
      updatedFields.status = "active";
      updatedFields.completedAt = null;
    }
    console.log("Updated Fields:", updatedFields);
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { $set: updatedFields },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Error updating task" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Delete Task ID:", id);
    const deleteTask = await Task.findByIdAndDelete(id);
    if (!deleteTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Error deleting task" });
  }
};

export { getAllTasks, createTask, updateTask, deleteTask };
