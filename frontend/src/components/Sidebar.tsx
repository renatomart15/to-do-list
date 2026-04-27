import { useState } from "react";
import {
  Menu,
  ListTodo,
  UserRoundCheck,
  UserRoundX,
  LogOut,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import Modal from "./Modal";
import AuthModal from "./AuthModal";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState("");
  const { token, logout } = useAuth();

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
        <div className="mt-5 mb-3">
          {token ? (
            <div>
              <div className="flex justify-center mb-2">
                <div className="text-black dark:text-white bg-[#f4f5f6] p-4 rounded-full dark:bg-[#4a5565]">
                  <UserRoundCheck size={45} className="" />
                </div>
              </div>
              <div className="text-center mt-3">
                <p className=" flex flex-col">
                  <span className="font-semibold text-xl dark:text-white">
                    Nome
                  </span>
                </p>
                <p className="flex flex-col">
                  <span className="text-[#838993]">Email</span>
                </p>
              </div>
              <div className="flex flex-col items-center">
                <button
                  className="flex gap-2 justify-center items-center mt-5 py-1 font-semibold text-white w-30 bg-red-500 rounded-lg cursor-pointer active:scale-98 transition"
                  onClick={() => setShowLogoutModal(true)}
                >
                  Sair <LogOut size={20} />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="flex justify-center mb-5">
                <div className="text-black dark:text-white bg-[#f4f5f6] dark:bg-[#4a5565] p-4 rounded-full">
                  <UserRoundX size={45} />
                </div>
              </div>
              <button
                className="py-2 px-4 bg-black font-semibold text-white rounded-lg w-40 cursor-pointer active:scale-98 transition dark:bg-[#4a5565]"
                onClick={() => {
                  setAuthMode("cadastro");
                  setShowAuthModal(true);
                }}
              >
                Cadastrar
              </button>
              <button className="py-2 px-4 font-semibold w-40">
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    setAuthMode("login");
                    setShowAuthModal(true);
                  }}
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

      <AuthModal
        isOpen={showAuthModal}
        authMode={authMode}
        onClose={() => setShowAuthModal(false)}
      />

      <Modal
        isOpen={showLogoutModal}
        onConfirm={() => {
          logout();
          setShowLogoutModal(false);
        }}
        onCancel={() => setShowLogoutModal(false)}
        message={"Tem certeza de que deseja Sair?"}
      />
    </aside>
  );
};

export default Sidebar;
