import { useState } from "react";

type LoginModalProps = {
  isOpen: boolean;
  onConfirm: (email: string, password: string) => void;
  onCancel: () => void;
};

const LoginModal = ({ isOpen, onConfirm, onCancel }: LoginModalProps) => {
  const [form, setForm] = useState({ email: "", password: "" });
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <form className="bg-white dark:bg-[#1e2939] dark:text-white p-6 rounded-lg text-lg font-semibold select-none flex flex-col gap-4">
        <p className="text-center mb-12 text-4xl font-semibold">Login</p>
        <input
          type="email"
          placeholder="email@email.com"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="p-2 border rounded-lg"
        />
        <input
          type="password"
          placeholder="********"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="p-2 border rounded-lg"
        />
        <div className="flex justify-between gap-16 mt-12">
          <button
            onClick={onCancel}
            className="py-2 px-5 rounded-lg border cursor-pointer active:scale-98 transition duration-300"
          >
            Cancelar
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              onConfirm(form.email, form.password);
            }}
            className="py-2 px-5 rounded-lg bg-blue-500 text-white cursor-pointer active:scale-98 transition duration-300"
          >
            Confirmar
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginModal;
