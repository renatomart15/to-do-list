import { useState } from "react";
import { Menu, ListTodo, Settings } from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <aside
      className={`${isOpen ? "w-64" : "w-20"} text-black bg-white dark:bg-[#1e2939] dark:text-white  flex flex-col px-2 select-none`}
    >
      <Menu
        size={30}
        className="cursor-pointer mx-4 mt-5"
        onClick={() => setIsOpen(!isOpen)}
      />
      <div className="my-5 mx-1 h-0.5 bg-[#6a7282] dark:bg-[#647282] rounded-4xl"></div>
      {/* Provavelmente, as duas divs abaixo irão se tornar um map de componentes de opções do menu sidebar. Isso deve ser implementado quando a nova página (Settings) for implementada */}
      <div className="bg-[#f4f5f6] rounded-lg mt-1 flex items-center text-lg font-semibold cursor-pointer">
        <ListTodo size={30} className="cursor-pointer mx-4 my-1 text-black" />
        {isOpen && <p className="text-black">My Tasks</p>}
      </div>
      <div className="mt-3 rounded-lg flex items-center text-lg font-semibold cursor-pointer">
        <Settings size={30} className="cursor-pointer mx-4 my-1" />
        {isOpen && <p>Settings</p>}
      </div>
    </aside>
  );
};

export default Sidebar;
