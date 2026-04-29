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
import { motion } from "framer-motion";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState("");
  const { token, logout, user } = useAuth();

  return (
    <motion.aside
      animate={{ width: isOpen ? 256 : 80 }}
      transition={{ duration: 0.1 }}
      className="text-black bg-white dark:bg-[#1e2939] dark:text-white  flex flex-col px-2 select-none"
    >
      <Menu
        size={30}
        className="cursor-pointer mx-4 mt-5"
        onClick={() => setIsOpen(!isOpen)}
      />
      <motion.div
        animate={{ height: isOpen ? 205 : 0 }}
        transition={{ duration: 0.1 }}
      >
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="mt-5 mb-3"
          >
            {token ? (
              <div>
                <div className="flex justify-center mb-2">
                  <div className="text-green-500 bg-green-500/20 p-4 rounded-full">
                    <UserRoundCheck size={45} />
                  </div>
                </div>
                <div className="text-center mt-3">
                  <p className=" flex flex-col">
                    <span className="font-semibold text-xl dark:text-white">
                      {user && user.name}
                    </span>
                  </p>
                  <p className="flex flex-col">
                    <span className="text-[#838993]">{user && user.email}</span>
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
                <div className="flex justify-center mb-9">
                  <div className="text-red-500 bg-red-500/20 p-4 rounded-full">
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
          </motion.div>
        )}
      </motion.div>
      <div className=" mt-5 mb-5 mx-1 h-0.5 bg-[#6a7282] dark:bg-[#647282] rounded-4xl"></div>
      <div className="bg-[#f4f5f6] dark:bg-[#4a5565] dark:text-white rounded-lg flex items-center text-lg font-semibold cursor-pointer">
        <ListTodo
          size={30}
          className="cursor-pointer mx-4 my-1 text-black dark:text-white"
        />
        {isOpen && (
          <motion.p
            initial={{ opacity: 0.5, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: 0.02 }}
            className="text-black dark:text-white"
          >
            My Tasks
          </motion.p>
        )}
      </div>

      <AuthModal
        isOpen={showAuthModal}
        authMode={authMode}
        onClose={() => {
          setAuthMode("");
          setShowAuthModal(false);
        }}
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
    </motion.aside>
  );
};

export default Sidebar;
