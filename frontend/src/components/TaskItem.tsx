import { Pencil, Trash } from "lucide-react";
import type { Task } from "../hooks/useTasks";
import { useTasks } from "../hooks/useTasks";

type TaskItemProps = {
  task: Task;
  changeStatus: (id: number) => void;
};

const TaskItem = ({ task, changeStatus }: TaskItemProps) => {
  return (
    <li className="flex justify-between bg-white py-4 px-6 rounded-lg shadow-sm items-center w-110 text-black dark:text-white dark:bg-[#1e2939]">
      <div className="flex">
        <input
          type="checkbox"
          checked={task.done}
          className="w-4 accent-black cursor-pointer dark:accent-white"
          onClick={() => changeStatus(task.id)}
        />
        <h3
          className={`pl-4 text-lg ${task.done ? "line-through text-gray-600 dark:text-gray-500" : ""}`}
        >
          {task.title}
        </h3>
      </div>
      <div className="flex gap-4">
        <Pencil size={18} className="cursor-pointer" />
        <Trash size={18} className="cursor-pointer" />
      </div>
    </li>
  );
};

export default TaskItem;
