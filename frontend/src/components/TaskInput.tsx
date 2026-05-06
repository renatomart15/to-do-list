import { Plus } from "lucide-react";
import { useState } from "react";

type TaskInputProps = {
  createTask: (title: string) => void;
};

const TaskInput = ({ createTask }: TaskInputProps) => {
  const [title, setTitle] = useState("");
  const handleSubmit = () => {
    if (title === "") return;
    createTask(title);
    setTitle("");
  };
  return (
    <div className="flex gap-5 mx-auto mb-8 mt-10 w-85 md:w-110">
      <input
        type="text"
        placeholder="Digite sua task aqui..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="bg-white py-2 px-4 rounded-lg shadow-md flex-1 focus:outline-none placeholder:text-lg text-lg dark:text-white dark:bg-[#364153]"
      />
      <button
        className="flex gap-1 text-lg items-center text-white bg-black py-1 px-4 md:px-5 rounded-lg shadow-md active:scale-98 transition duration-300 cursor-pointer dark:bg-[#4a5565]"
        type="submit"
        onClick={() => handleSubmit()}
      >
        <Plus size={18} /> Add
      </button>
    </div>
  );
};

export default TaskInput;
