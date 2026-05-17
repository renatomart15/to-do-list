import { useState } from "react";
import { Mail, Lock, LoaderCircle } from "lucide-react";
import { z } from "zod";
import axios from "axios";

type LoginFormProps = {
  onConfirm: (email: string, password: string) => Promise<void>;
};

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "Senha deve ter no mínimo 8 caracteres"),
});

const LoginForm = ({ onConfirm }: LoginFormProps) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  return (
    <form className="p-6 rounded-lg select-none flex flex-col gap-4">
      <label className="flex bg-white dark:bg-[#4a5565] items-center rounded-4xl py-1 px-3 text-base">
        <Mail size={16} className="text-gray-500 dark:text-gray-300" />
        <input
          type="email"
          placeholder="Email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="px-2 py-1 border-none focus:outline-0 font-normal"
        />
      </label>
      <label className="flex bg-white dark:bg-[#4a5565] items-center rounded-4xl py-1 px-3 text-base">
        <Lock size={16} className="text-gray-500 dark:text-gray-300" />
        <input
          type="password"
          placeholder="Senha"
          required
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="px-2 py-1 border-none focus:outline-0 font-normal"
        />
      </label>
      <span
        className={`${error === "" ? "py-2.5" : ""} text-red-500 text-sm text-center mb-14`}
      >
        {error}
      </span>
      <button
        onClick={async (e) => {
          e.preventDefault();
          setError("");
          const result = loginSchema.safeParse(form);
          if (!result.success) {
            setError(result.error.issues[0].message);
            return;
          }
          setIsLoading(true);
          try {
            await onConfirm(form.email, form.password);
          } catch (error) {
            if (axios.isAxiosError(error)) {
              setError(error.response?.data);
            }
          } finally {
            setIsLoading(false);
          }
        }}
        className={`${isLoading ? "bg-gray-500" : "bg-blue-500 cursor-pointer"} py-2 px-5 rounded-4xl mt-7 mb-2 text-white active:scale-98 transition duration-300`}
        disabled={isLoading}
      >
        {isLoading ? (
          <LoaderCircle className="animate-spin mx-auto" size={24} />
        ) : (
          "Entrar"
        )}
      </button>
    </form>
  );
};

export default LoginForm;
