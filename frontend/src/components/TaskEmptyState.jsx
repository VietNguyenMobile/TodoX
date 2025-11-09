import React from "react";
import { Card } from "./components/ui/card";
import { Circle } from "lucide-react";

const TaskEmptyState = ({ filter }) => {
  return (
    <Card className="p-8 text-center border-0 bg-gradient-card shadow-custom-md">
      <div className="space-y-3">
        <Circle className="mx-auto size-12 text-muted-foreground" />
        <div>
          <h3 className="font-medium text-foreground">
            {filter === "active"
              ? "No active tasks! Time to relax."
              : filter === "completed"
              ? "No completed tasks yet! Keep going."
              : "Your task list is empty! Add a new task to get started."}
          </h3>
          <p className="text-sm text-muted-foreground">
            {filter === "all"
              ? "Add task to start!"
              : `Switch to filter All to view task ${
                  filter === "active" ? "Completed" : "Doing"
                }`}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default TaskEmptyState;
