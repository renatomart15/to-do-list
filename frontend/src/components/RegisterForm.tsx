import { useState } from "react";
import { UserRound, Mail, Lock } from "lucide-react";

type RegisterFormProps = {
  onConfirm: (email: string, password: string, name: string) => void;
};

const RegisterForm = ({ onConfirm }: RegisterFormProps) => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  return (
    <form className="p-6 rounded-lg select-none flex flex-col gap-4">
      <label className="flex bg-white dark:bg-[#4a5565] items-center rounded-4xl py-1 px-3 text-base">
        <UserRound size={16} className="text-gray-500 dark:text-gray-300" />
        <input
          type="text"
          placeholder="Nome"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="px-2 py-1 border-none focus:outline-0 font-normal"
        />
      </label>
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

      <button
        onClick={(e) => {
          e.preventDefault();
          onConfirm(form.email, form.password, form.name);
        }}
        className="py-2 mt-7 mb-2 rounded-4xl bg-blue-500 text-white cursor-pointer active:scale-98 transition duration-300"
      >
        Cadastrar
      </button>
    </form>
  );
};

export default RegisterForm;
