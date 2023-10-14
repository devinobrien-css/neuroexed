import { Button } from '../form/Button';
import cx from 'classnames';

interface ModalProps {
  children: React.ReactNode;
  className?: string;
  closeModal: React.Dispatch<React.SetStateAction<any>>;
}
export const Modal = ({ children, className, closeModal }: ModalProps) => {
  return (
    <div className="bg-blur-md fixed right-0 top-0 z-[1000] flex min-h-screen w-screen flex-col rounded bg-gray-100 bg-opacity-70 shadow-lg">
      <div className={cx(className, `relative m-auto rounded bg-white`)}>
        <Button
          className="absolute right-2 top-2"
          color="gray"
          onClick={closeModal}
          title="close"
        />
        <div className="h-full overflow-y-scroll">{children}</div>
      </div>
    </div>
  );
};