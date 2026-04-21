import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import TaskList from "./components/TaskList";

function App() {
  return (
    <main className="bg-[#f3f4f6] dark:bg-[#101828] min-h-screen flex transition-colors duration-300">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <TaskList />
      </div>
    </main>
  );
}

export default App;
