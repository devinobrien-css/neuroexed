import ReactModal, { Props } from 'react-modal';
import cx from 'classnames';

interface ModalProps extends Props {
  className?: string;
  overlayClassName?: string;
}

export const Modal: React.FunctionComponent<ModalProps & ReactModal.Props> = ({
  className,
  overlayClassName,
  ...props
}: ModalProps) => {
  return (
    <ReactModal
      ariaHideApp={false}
      className={cx('z-60 w-fit rounded-xl bg-background p-6', className)}
      overlayClassName={cx(
        'z-60 bg-black/50 fixed inset-0 flex justify-center items-center p-4',
        overlayClassName,
      )}
      {...props}
    />
  );
};
