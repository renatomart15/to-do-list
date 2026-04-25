import { useState } from "react";
import { Menu, ListTodo } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const { token, login, register, logout } = useAuth();

  return (
    <aside
      className={`${isOpen ? "w-64" : "w-20"} text-black bg-white dark:bg-[#1e2939] dark:text-white  flex flex-col px-2 select-none`}
    >
      <Menu
        size={30}
        className="cursor-pointer mx-4 mt-5"
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen && (
        <div className="mt-5">
          {token ? (
            <div>
              <h3 className="text-lg font-semibold text-center bg-blue-500 text-white rounded-lg py-1.5 mb-2">
                Conta
              </h3>
              <div className="ml-5">
                <p className=" flex flex-col">
                  <span className="font-semibold">Nome:</span>
                  <span>dawodubnawpdioubaw</span>
                </p>
                <p className="mt-1 flex flex-col">
                  <span className="font-semibold">Email:</span>
                  <span>dawodubnawpdioubaw</span>
                </p>
              </div>
              <div className="flex flex-col items-center">
                <button
                  className="mt-12 py-2 px-4 font-semibold text-white w-40 bg-red-500 rounded-lg cursor-pointer active:scale-98 transition"
                  onClick={() => logout()}
                >
                  Sair
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <button
                className="py-2 px-4 bg-black font-semibold text-white rounded-lg w-40 cursor-pointer active:scale-98 transition dark:bg-[#4a5565]"
                onClick={() => setShowRegisterModal(true)}
              >
                Cadastrar
              </button>
              <button className="py-2 px-4 font-semibold w-40">
                <span
                  className="cursor-pointer"
                  onClick={() => setShowLoginModal(true)}
                >
                  Entrar
                </span>
              </button>
            </div>
          )}
        </div>
      )}
      <div className=" mt-3 mb-5 mx-1 h-0.5 bg-[#6a7282] dark:bg-[#647282] rounded-4xl"></div>
      <div className="bg-[#f4f5f6] dark:bg-[#4a5565] dark:text-white rounded-lg mt-1 flex items-center text-lg font-semibold cursor-pointer">
        <ListTodo
          size={30}
          className="cursor-pointer mx-4 my-1 text-black dark:text-white"
        />
        {isOpen && <p className="text-black dark:text-white">My Tasks</p>}
      </div>
      <LoginModal
        isOpen={showLoginModal}
        onConfirm={async (email, password) => {
          await login(email, password);
          setShowLoginModal(false);
        }}
        onCancel={() => setShowLoginModal(false)}
      />
      <RegisterModal
        isOpen={showRegisterModal}
        onConfirm={async (email, password, name) => {
          register(email, password, name);
          setShowRegisterModal(false);
        }}
        onCancel={() => setShowRegisterModal(false)}
      />
    </aside>
  );
};

export default Sidebar;
