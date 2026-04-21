type ModalProps = {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
};

const Modal = ({ isOpen, onConfirm, onCancel, message }: ModalProps) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white dark:bg-[#1e2939] dark:text-white  p-6 rounded-lg text-lg font-semibold select-none">
        <p className="pb-10">{message}</p>
        <div className="flex justify-between">
          <button onClick={onCancel} className="py-2 px-5 rounded-lg border cursor-pointer">Cancelar</button>
          <button onClick={onConfirm} className="py-2 px-5 rounded-lg bg-red-500 text-white cursor-pointer">Confirmar</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
