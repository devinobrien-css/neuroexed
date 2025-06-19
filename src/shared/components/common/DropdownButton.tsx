/* eslint-disable indent */
import React from 'react';
import { Dropdown, useDropdownMenu, useDropdownToggle } from 'react-overlays';
import { DropDirection } from 'react-overlays/cjs/DropdownContext';
import cx from 'classnames';
import { Icon } from '@iconify/react';

interface DropdownToggleProps {
  label: string | JSX.Element;
  disabled?: boolean;
  className?: string;
  showChevron?: boolean;
}

const DropdownButtonToggle = ({
  label,
  disabled,
  className,
  showChevron = true,
}: DropdownToggleProps) => {
  const [props, { toggle, show }] = useDropdownToggle();
  return (
    <button
      {...props}
      className={cx(
        'text-14 flex h-full items-center gap-2 whitespace-nowrap rounded-lg border-2 border-[#EDEEEF] px-2 font-semibold dark:border-dark-border dark:bg-dark-surface',
        className,
        {
          'text-grey-300': disabled,
          'bg-[#EDEEEF]': show,
          'bg-grey-100 cursor-not-allowed': disabled,
        },
      )}
      onClick={(e) => {
        toggle(!show, e);
      }}
      role="button"
      type="button"
      disabled={disabled}
    >
      {label} {showChevron && <Icon icon="tabler:chevron-down" />}
    </button>
  );
};

type CustomDropdownButtonToggleHandler = (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
) => void;
interface CustomDropdownButtonToggleProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  onClick?: CustomDropdownButtonToggleHandler;
  children: React.ReactNode;
  disabled?: boolean;
}

export const CustomDropdownButtonToggle = ({
  className,
  onClick,
  children,
  disabled,
  ...htmlProps
}: CustomDropdownButtonToggleProps) => {
  const [props, { toggle, show }] = useDropdownToggle();
  return (
    <button
      {...props}
      className={className}
      onClick={(e) => {
        onClick?.(e);
        toggle(!show, e);
      }}
      disabled={disabled}
      type="button"
      {...htmlProps}
    >
      {children}
    </button>
  );
};

export type OverlayFunc = (args: {
  show: boolean;
  toggle: () => void;
}) => React.ReactNode;
interface DropdownMenuProps {
  overlay: OverlayFunc;
  className?: string;
}
const DropdownMenu = ({ overlay, className }: DropdownMenuProps) => {
  const [props, { show, toggle }] = useDropdownMenu({
    flip: true,
    offset: [0, 8],
  });

  return (
    <div
      {...props}
      role="menu"
      className={cx(className, 'mx-auto', show ? 'block' : 'hidden')}
    >
      {overlay({
        show,
        toggle: !toggle
          ? () => {
              throw Error('Toggle undefined');
            }
          : () => toggle(!show),
      })}
    </div>
  );
};

interface DropdownButtonProps {
  label?: string | JSX.Element;
  overlay: OverlayFunc;
  drop?: DropDirection;
  alignEnd?: boolean;
  defaultShow?: boolean;
  show?: boolean;
  onToggle?: (nextShow: boolean, event?: React.SyntheticEvent | Event) => void;
  disabled?: boolean;
  customToggle?: React.ReactElement<typeof CustomDropdownButtonToggle>;
  className?: string;
  menuClassName?: string;
  inline?: boolean;
  showChevron?: boolean;
}
export const DropdownButton: React.FC<DropdownButtonProps> = ({
  overlay,
  label,
  onToggle = () => null,
  customToggle,
  disabled,
  className,
  menuClassName,
  inline = true,
  showChevron = true,
  ...props
}: DropdownButtonProps) => {
  return (
    <Dropdown
      onToggle={onToggle}
      {...props}
      itemSelector="button:not(:disabled)"
    >
      <div className={`relative ${inline ? 'inline-block' : 'flex w-full'}`}>
        {customToggle ?? (
          <DropdownButtonToggle
            showChevron={showChevron}
            disabled={disabled}
            label={label ?? ''}
            className={className}
          />
        )}
        <DropdownMenu overlay={overlay} className={menuClassName} />
      </div>
    </Dropdown>
  );
};
