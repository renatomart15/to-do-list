import { Pencil, Trash } from "lucide-react";
import type { Task } from "../hooks/useTasks";
import { useState } from "react";
import Modal from "./Modal";

type TaskItemProps = {
  task: Task;
  changeStatus: (id: number) => void;
  deleteTask: (id: number) => void;
  updateTask: (id: number, title: string) => void;
};

const TaskItem = ({
  task,
  changeStatus,
  deleteTask,
  updateTask,
}: TaskItemProps) => {
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  return (
    <>
      <li className="flex justify-between bg-white py-4 px-6 rounded-lg shadow-sm items-center w-110 text-black dark:text-white dark:bg-[#1e2939]">
        <div className="flex">
          <input
            type="checkbox"
            checked={task.done}
            className="w-4 accent-black cursor-pointer dark:accent-white"
            onClick={() => changeStatus(task.id)}
          />
          <div
            className={`pl-4 text-lg select-none ${task.done ? "line-through text-gray-600 dark:text-gray-500" : ""}`}
          >
            {isEditing ? (
              <input
                type="text"
                autoFocus
                value={editedTitle}
                className="focus:outline-0"
                onChange={(e) => setEditedTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    updateTask(task.id, editedTitle);
                    setIsEditing(false);
                  }
                }}
                onBlur={() => setIsEditing(false)}
              />
            ) : (
              <p className="wrap-break-word max-w-73">{task.title}</p>
            )}
          </div>
        </div>
        <div className="flex gap-4 shrink-0">
          <Pencil
            size={18}
            className="cursor-pointer hover:text-blue-500 transition"
            onClick={() => setIsEditing(true)}
          />
          <Trash
            size={18}
            className="cursor-pointer hover:text-red-500 transition"
            onClick={() => setShowModal(true)}
          />
        </div>
      </li>
      <Modal
        isOpen={showModal}
        onConfirm={() => deleteTask(task.id)}
        onCancel={() => setShowModal(false)}
        message={`Tem certeza de que deseja excluir "${task.title}"?`}
      />
    </>
  );
};

export default TaskItem;
