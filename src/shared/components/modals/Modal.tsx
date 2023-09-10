import { Icon } from '@iconify/react';

interface ModalProps {
  children: React.ReactNode;
  className?: string;
  closeModal: () => void;
}
export const Modal = ({ children, className, closeModal }: ModalProps) => {
  return (
    <div className="bg-blur-md fixed right-0 top-0 z-[1000] flex min-h-screen w-screen flex-col rounded bg-gray-100 bg-opacity-70 shadow-lg">
      <div
        className={`${className} relative m-auto h-[80vh] w-3/5 rounded bg-white`}
      >
        <button
          className="absolute right-4 top-4 rounded-lg bg-gray-300 p-2"
          onClick={closeModal}
        >
          close
        </button>
        <div className="h-full overflow-y-scroll">{children}</div>
      </div>
    </div>
  );
};
