import Task from "../models/Task.js";

const getAllTasks = async (req, res) => {
  try {
    // const tasks = await Task.find().sort({ createdAt: -1 });
    // const activeCount = await Task.countDocuments({ status: "active" });
    // const completedCount = await Task.countDocuments({ status: "completed" });
    // should run 3 queries only 1 time.
    // console.log("Active Tasks Count:", activeCount);
    // console.log("Completed Tasks Count:", completedCount);

    const { filter = "today" } = req.query;
    const now = new Date();
    let startDate;

    switch (filter) {
      case "today":
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // 2026-01-20 00:00
        break;
      case "week":
        const mondayDate =
          now.getDate() - (now.getDay() - 1) - (now.getDay() === 0 ? 7 : 0); // Adjust to get Monday
        startDate = new Date(now.getFullYear(), now.getMonth(), mondayDate); // Start of the week (Monday)
        break;
      case "month":
        startDate = new Date(now.getFullYear(), now.getMonth(), 1); // First day of the month
        break;
      case "all":
      default:
        startDate = null;
    }

    const query = startDate ? { createdAt: { $gte: startDate } } : {};

    const result = await Task.aggregate([
      { $match: query },
      {
        $facet: {
          allTasks: [{ $sort: { createdAt: -1 } }],
          activeCount: [{ $match: { status: "active" } }, { $count: "count" }],
          completedCount: [
            { $match: { status: "completed" } },
            { $count: "count" },
          ],
        },
      },
    ]);
    // res.status(200).json(tasks);
    const allTasks = result[0].allTasks;
    const activeCount =
      result[0].activeCount.length > 0 ? result[0].activeCount[0].count : 0;
    const completedCount =
      result[0].completedCount.length > 0
        ? result[0].completedCount[0].count
        : 0;

    res.status(200).json({ allTasks, activeCount, completedCount });
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
