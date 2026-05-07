import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import { GoogleLogin } from "@react-oauth/google";

type AuthModal = {
  isOpen: boolean;
  authMode: string;
  onClose: () => void;
};

const AuthModal = ({ isOpen, authMode, onClose }: AuthModal) => {
  const [mode, setMode] = useState(authMode);
  const { login, register } = useAuth();

  useEffect(() => {
    setMode(authMode);
  }, [authMode]);

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex flex-col items-center justify-center">
      <div className="bg-[#f3f4f6] dark:bg-[#1e2939] dark:text-white rounded-lg w-74">
        <div className="flex justify-end mt-4 mr-4">
          <X
            className="cursor-pointer"
            onClick={() => {
              onClose();
            }}
          />
        </div>
        <div className="flex justify-center">
          <div className="relative flex text-base font-semibold my-6 shadow-[0_0_10px_0.05px] shadow-blue-500 rounded-4xl">
            <motion.div
              className="absolute top-0 bottom-0 bg-blue-500 rounded-4xl"
              animate={{ left: mode === "cadastro" ? 0 : "50%" }}
              style={{ width: "50%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
            <div
              className={`relative z-10 flex justify-center items-center py-2 px-4 cursor-pointer rounded-4xl w-26 ${mode === "cadastro" ? "text-white" : ""}`}
              onClick={() => setMode("cadastro")}
            >
              Cadastro
            </div>
            <div
              className={`relative z-10 flex justify-center items-center py-2 px-4 cursor-pointer rounded-4xl w-26 ${mode === "login" ? "text-white" : ""}`}
              onClick={() => setMode("login")}
            >
              Login
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-2 mb-5">
          <GoogleLogin
            text="continue_with"
            theme="filled_blue"
            onSuccess={(credentialResponse) => {
              console.log(credentialResponse);
            }}
            onError={() => {
              console.log("Erro no login com Google");
            }}
          />
        </div>
        <div className="flex items-center justify-center gap-3 mb-1">
          <div className="h-0.5 w-[33%] rounded-2xl bg-gray-500 dark:bg-[#878e99]"></div>
          <p className="text-center text-gray-500 dark:text-[#878e99]">ou</p>
          <div className="h-0.5 w-[33%] rounded-2xl bg-gray-500 dark:bg-[#878e99]"></div>
        </div>
        {mode === "login" ? (
          <LoginForm
            onConfirm={async (email, password) => {
              await login(email, password);
              onClose();
            }}
          />
        ) : (
          <RegisterForm
            onConfirm={async (email, password, name) => {
              await register(email, password, name);
              onClose();
            }}
          />
        )}
      </div>
    </div>
  );
};

export default AuthModal;
