import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { X } from "lucide-react";

type AuthModal = {
  isOpen: boolean;
  authMode: string;
  onClose: () => void;
};

const AuthModal = ({ isOpen, authMode, onClose }: AuthModal) => {
  const [mode, setMode] = useState(authMode);
  const { login, register } = useAuth();

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex flex-col items-center justify-center">
      <div className="bg-[#f3f4f6] dark:bg-[#1e2939] dark:text-white rounded-lg w-70">
        <div className="flex justify-end mt-4 mr-4">
          <X className="cursor-pointer" onClick={() => onClose()} />
        </div>
        <div className="flex justify-center">
            <div className="flex text-base font-semibold my-6 shadow-[0_0_10px_0.05px] shadow-blue-500 rounded-4xl">
              <div
                className={`${mode === "cadastro" ? "bg-blue-500 text-white" : "bg-none"} flex justify-center items-center py-2 px-4 cursor-pointer  rounded-4xl w-26`}
                onClick={() => setMode("cadastro")}
              >
                Cadastro
              </div>
              <div
                className={`${mode === "login" ? "bg-blue-500 text-white" : "bg-none"} flex justify-center items-center py-2 px-4 cursor-pointer  rounded-4xl w-26`}
                onClick={() => setMode("login")}
              >
                Login
              </div>
            </div>
        </div>
        {mode === "login" ? (
          <LoginForm onConfirm={login} />
        ) : (
          <RegisterForm onConfirm={register} />
        )}
      </div>
    </div>
  );
};

export default AuthModal;
