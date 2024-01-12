import { useState } from 'react';
import { ReactComponent as ChevronDown } from '../../assets/icons/chevron-down.svg';
import cx from 'classnames';

interface AccordionProps {
  title: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  open?: boolean;
  initalOpen?: boolean;
  titleClassName?: string | ((open: boolean) => string);
  panelClassName?: string | ((open: boolean) => string);
  onChange?: (open: boolean) => void;
  alignToggleEnd?: boolean;
}

export const Accordion = ({
  title,
  children,
  open,
  onChange,
  initalOpen = true,
  className,
  titleClassName,
  panelClassName,
  alignToggleEnd: toggleEnd = false,
}: AccordionProps) => {
  const [isOpen, setOpen] = useState(initalOpen);
  open = open ?? isOpen;

  return (
    <div
      className={cx(className, {
        'mb-3': open,
      })}
    >
      <div
        className={cx(
          'px-4 py-2.5',
          typeof titleClassName === 'function'
            ? titleClassName(open)
            : titleClassName,
        )}
      >
        <button
          role="button"
          type="button"
          className={cx('flex gap-3 text-14 font-semibold', {
            'w-full flex-row-reverse justify-between': toggleEnd,
          })}
          onClick={() => {
            setOpen(!open);
            onChange?.(!open);
          }}
        >
          <ChevronDown
            height={18}
            width={18}
            className={cx('shrink-0 transition', {
              '-rotate-90': !open,
            })}
          />{' '}
          {title}
        </button>
      </div>
      <div
        className={cx(
          typeof panelClassName === 'function'
            ? panelClassName(open)
            : panelClassName,
          'overflow-hidden px-4',
          {
            'h-0': !open,
            'h-auto': open,
          },
        )}
      >
        {children}
      </div>
    </div>
  );
};
