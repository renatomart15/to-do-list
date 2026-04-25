import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import { useTasks } from "./hooks/useTasks";
import { useAuth } from "./hooks/useAuth";

function App() {
  const { tasks, createTask, deleteTask, updateTask, changeStatus } =
    useTasks();

  return (
    <main className="bg-[#f3f4f6] dark:bg-[#101828] min-h-screen flex transition-colors duration-300">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <TaskInput createTask={createTask} />
        <TaskList
          tasks={tasks}
          deleteTask={deleteTask}
          updateTask={updateTask}
          changeStatus={changeStatus}
        />
      </div>
    </main>
  );
}

export default App;
