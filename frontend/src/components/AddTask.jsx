import React, { useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import api from "@/lib/axios";
import { toast } from "sonner";

const AddTask = ({ handleNewTaskAdded }) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const addTask = async () => {
    // Logic to add the new task
    if (!newTaskTitle.trim()) {
      toast.error("Task title cannot be empty.");
      return;
    }

    try {
      const response = await api.post("/tasks", {
        title: newTaskTitle,
      });
      console.log("Task added:", response.data);
      toast.success(`Task added "${response.data.title}" successfully!`);

      // Optionally, refresh the task list or notify the parent component
      handleNewTaskAdded();
    } catch (error) {
      console.error("Error adding task:", error);
      // Handle error (e.g., show a notification)
      toast.error("Failed to add task. Please try again.");
    }
    setNewTaskTitle("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  return (
    <Card className="p-6 border-0 bg-gradient-card shadow-custom-lg opacity-75">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Input
          type="text"
          placeholder="Need to do?"
          className="h-12 text-base bg-slate-50 sm:flex-1 border-border/50 
          focus:border-primary/50 focus:ring-primary/20"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <Button
          variant="gradient"
          size="xl"
          className="px-6"
          onClick={addTask}
          disabled={!newTaskTitle.trim()}
        >
          <Plus className="size-5" />
          Add Task
        </Button>
      </div>
    </Card>
  );
};

export default AddTask;
