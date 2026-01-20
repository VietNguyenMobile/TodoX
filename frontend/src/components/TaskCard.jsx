import React, { useState } from "react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import {
  Calendar,
  CheckCircle2,
  Circle,
  SquarePen,
  Trash2,
} from "lucide-react";
import { Input } from "./ui/input";
import api from "@/lib/axios";
import { toast } from "sonner";

const TaskCard = ({ task, index, handleTaskChanged }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updateTaskTitle, setUpdateTaskTitle] = useState(task.title || "");

  const deleteTask = async (taskId) => {
    console.log("Deleting task with ID:", taskId);
    try {
      await api.delete(`/tasks/${taskId}`);
      console.log("Task deleted:", taskId);
      // Optionally, refresh the task list or notify the parent component
      toast.success("Task deleted successfully!");
      handleTaskChanged();
    } catch (error) {
      console.error("Error deleting task:", error);
      // Handle error (e.g., show a notification)
      toast.error("Failed to delete task. Please try again.");
    }
  };

  const updateTask = async () => {
    if (!updateTaskTitle.trim()) {
      toast.error("Task title cannot be empty.");
      return;
    }

    try {
      const response = await api.put(`/tasks/${task._id}`, {
        title: updateTaskTitle,
      });
      console.log("Task updated:", response.data);
      toast.success(`Task updated to "${response.data.title}" successfully!`);

      // Optionally, refresh the task list or notify the parent component
      handleTaskChanged();
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating task:", error);
      // Handle error (e.g., show a notification)
      toast.error("Failed to update task. Please try again.");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      updateTask();
    }
  };

  const toggleTaskStatus = async () => {
    try {
      const newStatus = task.status === "completed" ? "active" : "completed";
      const response = await api.put(`/tasks/${task._id}`, {
        status: newStatus,
        completedAt:
          newStatus === "completed" ? new Date().toISOString() : null,
      });
      console.log("Task status toggled:", response.data);
      toast.success(`Task marked as "${response.data.status}" successfully!`);

      // Optionally, refresh the task list or notify the parent component
      handleTaskChanged();
    } catch (error) {
      console.error("Error toggling task status:", error);
      // Handle error (e.g., show a notification)
      toast.error("Failed to toggle task status. Please try again.");
    }
  };

  return (
    <Card
      className={cn(
        "p-4 bg-gradient-card border-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fade-in group opacity-75",
        task.status === "completed" && "opacity-75"
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "flex-shrink-0 size-8 rounded-full transition-all duration-200",
            task.status === "completed"
              ? "text-success hover:text-success/80"
              : "text-muted-foreground hover:text-primary"
          )}
          onClick={toggleTaskStatus}
        >
          {task.status === "completed" ? (
            <CheckCircle2 className="size-5" />
          ) : (
            <Circle className="size-5" />
          )}
        </Button>
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <Input
              placeholder="Edit task..."
              className="flex-1 h-12 text-base border-border/50 focus:border-primary/50 focus:ring-primary/20"
              type="text"
              value={updateTaskTitle}
              onChange={(e) => setUpdateTaskTitle(e.target.value)}
              onKeyPress={handleKeyPress}
              onBlur={() => {
                setIsEditing(false);
                setUpdateTaskTitle(task.title || "");
              }}
            />
          ) : (
            <p
              className={cn(
                "text-base transition-all duration-200",
                task.status === "completed"
                  ? "line-through text-muted-foreground"
                  : "text-foreground"
              )}
            >
              {task.title}
            </p>
          )}

          <div className="flex items-center gap-2 mt-1">
            <Calendar className="size-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              {new Date(task.createdAt).toLocaleDateString(undefined, {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
              })}
            </span>
            {task.completedAt && (
              <>
                <span className="text-xs text-muted-foreground "> - </span>
                <Calendar className="size-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {new Date(task.completedAt).toLocaleDateString(undefined, {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true,
                  })}
                </span>
              </>
            )}
          </div>
        </div>

        <div className="hidden gap-2 group-hover:inline-flex animate-slide-up">
          <Button
            variant="ghost"
            size="icon"
            className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-info"
            onClick={() => {
              setIsEditing(true);
              setUpdateTaskTitle(task.title || "");
            }}
          >
            <SquarePen className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => deleteTask(task._id)}
            className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default TaskCard;
