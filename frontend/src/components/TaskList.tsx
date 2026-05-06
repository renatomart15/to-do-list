import TaskItem from "./TaskItem";
import { useState } from "react";

import type { Task } from "../hooks/useTasks";

type TaskListProps = {
  tasks: Task[];
  deleteTask: (id: number) => void;
  updateTask: (id: number, title: string) => void;
  changeStatus: (id: number) => void;
};

const TaskList = ({
  tasks,
  changeStatus,
  deleteTask,
  updateTask,
}: TaskListProps) => {
  const [filter, setFilter] = useState("all");
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.done;
    if (filter === "completed") return task.done;
    return true; // "all"
  });
  return (
    <div className="flex flex-col items-center gap-4 my-6 text-gray-600 dark:text-gray-500">
      {tasks.length > 0 ? (
        <>
          <div className="flex justify-between w-70 md:w-110 text-base">
            <div className="flex gap-1 items-center select-none">
              <span
                onClick={() => setFilter("all")}
                className={`cursor-pointer ${filter === "all" ? "text-black font-semibold dark:text-white" : ""}`}
              >
                All
              </span>
              |
              <span
                onClick={() => setFilter("active")}
                className={`cursor-pointer ${filter === "active" ? "text-black font-semibold dark:text-white" : ""}`}
              >
                Active
              </span>
              |
              <span
                onClick={() => setFilter("completed")}
                className={`cursor-pointer ${filter === "completed" ? "text-black font-semibold dark:text-white" : ""}`}
              >
                Completed
              </span>
            </div>
            <p>{filteredTasks.length} tasks left</p>
          </div>
          <ul className="flex flex-col gap-5">
            {filteredTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                changeStatus={changeStatus}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            ))}
          </ul>
        </>
      ) : (
        <p>Sem tasks</p>
      )}
    </div>
  );
};

export default TaskList;
