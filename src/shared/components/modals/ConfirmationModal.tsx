import { Modal } from './Modal';

interface ConfirmationModalProps {
  title: string;
  message: string | JSX.Element;
  closeModal: () => void;
  confirm: () => void;
  confirmText: string;
  cancelText: string;
}

export const ConfirmationModal = ({
  title,
  message,
  closeModal,
  confirm,
  confirmText,
  cancelText,
}: ConfirmationModalProps) => {
  return (
    <Modal closeModal={closeModal}>
      <div className="flex flex-col gap-y-4 p-8">
        <p className="text-center text-2xl font-light">{title}</p>
        <p className="text-center text-lg font-light">{message}</p>
        <div className="flex justify-center gap-x-4">
          <button
            className="rounded-lg border-2 border-blue-400 bg-none p-2 text-blue-400 hover:bg-blue-100"
            onClick={closeModal}
          >
            {cancelText}
          </button>
          <button
            className="rounded-lg bg-red-300 p-2 hover:bg-red-400"
            onClick={confirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
};
