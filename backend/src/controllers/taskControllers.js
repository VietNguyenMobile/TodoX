const getAllTasks = (req, res) => {
  const tasks = [
    { id: 1, title: "Task 1", completed: false },
    { id: 2, title: "Task 2", completed: true },
  ];
  res.status(200).send(tasks);
};

const createTask = (req, res) => {
  // Logic to add a new task would go here
  res.status(201).json({ message: "Task created" });
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
