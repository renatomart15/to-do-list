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
      <div className="bg-white dark:bg-[#1e2939] dark:text-white p-4 md:p-6 rounded-lg text-lg font-semibold select-none max-w-[88vw] md:max-w-none">
        <p className="max-w-[90%] md:max-w-none pb-10">{message}</p>
        <div className="flex justify-between">
          <button
            onClick={onCancel}
            className="py-1 md:py-2 px-4 md:px-5 rounded-lg border-2 dark:border-white cursor-pointer active:scale-98 transition duration-300"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="py-1 md:py-2 px-4 md:px-5 rounded-lg bg-red-500 text-white cursor-pointer active:scale-98 transition duration-300"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
