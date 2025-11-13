import React from "react";
import TaskEmptyState from "./TaskEmptyState";
import TaskCard from "./TaskCard";

const TaskList = () => {
  const filter = "all";
  const filteredTasks = [
    // Assume this gets populated based on the filter
    {
      id: "1",
      title: "Sample Task",
      status: "active",
      completedAt: null,
      createdAt: new Date(),
    },
    {
      id: "2",
      title: "Completed Task",
      status: "completed",
      completedAt: new Date(),
      createdAt: new Date(),
    },
  ];

  if (!filteredTasks || filteredTasks.length === 0) {
    return <TaskEmptyState filter={filter} />;
  }
  return (
    <div className="space-y-3 border-2">
      {filteredTasks.map((task, index) => (
        <TaskCard key={task.id} task={task} index={index} />
      ))}
    </div>
  );
};

export default TaskList;
