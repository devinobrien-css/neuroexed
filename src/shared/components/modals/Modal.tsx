import { Button } from '../form/Button';
import cx from 'classnames';

interface ModalProps {
  children: React.ReactNode;
  className?: string;
  closeModal: () => void;
}
export const Modal = ({ children, className, closeModal }: ModalProps) => {
  return (
    <div className="bg-blur-md fixed right-0 top-0 z-[1000] flex min-h-screen w-screen flex-col rounded bg-gray-600/75 shadow-xl dark:bg-gray-900/80">
      <div
        className={cx(
          className,
          'dark:bg-dark-surface relative m-auto rounded bg-white shadow-xl',
        )}
      >
        <Button
          className="absolute right-2 top-2"
          color="gray"
          onClick={closeModal}
          title="close"
        />
        <div>{children}</div>
      </div>
    </div>
  );
};
