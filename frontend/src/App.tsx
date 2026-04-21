import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { useTasks } from "./hooks/useTasks";

function App() {
  const tasks = useTasks();
  console.log(tasks)
  return (
    <main className="bg-[#f3f4f6] dark:bg-[#101828] min-h-screen flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
      </div>
    </main>
  );
}

export default App;
