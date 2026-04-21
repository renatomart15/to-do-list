import { useTasks } from "../hooks/useTasks";
import TaskItem from "./TaskItem";

const TaskList = () => {
  const { tasks, changeStatus, deleteTask } = useTasks();
  return (
    <div className="flex flex-col items-center gap-4 my-6 text-gray-600 dark:text-gray-500">
      {tasks.length > 0 ? (
        <>
          <div className="flex justify-between w-108 text-sm">
            <div className="flex gap-1 items-center">
              <span className="cursor-pointer">All</span>|
              <span className="cursor-pointer">Active</span>|
              <span className="cursor-pointer">Completed</span>
            </div>
            <p>2 tasks left</p>
          </div>
          <ul className="flex flex-col gap-5">
            {tasks.map((task) => (
              <TaskItem key={task.id} task={task} changeStatus={changeStatus} deleteTask={deleteTask} />
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
