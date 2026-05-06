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
    <div className="flex md:mx-auto gap-2 md:gap-5 justify-center mb-8 mt-10 md:w-110 md:text-lg">
      <input
        type="text"
        placeholder="Digite sua task aqui..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="bg-white py-2 px-4 rounded-lg shadow-md flex-1 focus:outline-none placeholder:text-lg dark:text-white dark:bg-[#364153] max-w-51 md:max-w-none"
      />
      <button
        className="flex gap-1 items-center text-white bg-black py-1 px-3 md:px-5 rounded-lg shadow-md active:scale-98 transition duration-300 cursor-pointer dark:bg-[#4a5565]"
        type="submit"
        onClick={() => handleSubmit()}
      >
        <Plus size={18} /> Add
      </button>
    </div>
  );
};

export default TaskInput;
