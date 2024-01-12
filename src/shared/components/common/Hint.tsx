import { ReactComponent as Info } from '../../assets/icons/info.svg';
import { Dropdown, useDropdownMenu, useDropdownToggle } from 'react-overlays';
import cx from 'classnames';

interface HintProps {
  children?: React.ReactNode;
  className?: string;
  hintClassName?: string;
  onToggle?: (show: boolean) => void;
}

interface HintToggleProps {
  className?: string;
}
const HintToggle = ({ className }: HintToggleProps) => {
  const [props] = useDropdownToggle();
  return (
    <button {...props} type="button" className={className}>
      <Info className="h-4 w-4 text-grey-300" />
    </button>
  );
};

const HintBody = ({ children, className }: HintProps) => {
  const [props, { show }] = useDropdownMenu({
    flip: true,
    offset: [0, 8],
  });

  return (
    <div
      {...props}
      role="tooltip"
      className={cx(
        'z-10 w-max max-w-xs rounded-lg border-2 border-grey-100 bg-background p-2 text-14',
        show ? 'block' : 'hidden',
        className,
      )}
    >
      {children}
    </div>
  );
};

export const Hint = ({
  children,
  hintClassName,
  className,
  onToggle,
}: HintProps) => {
  return (
    <Dropdown
      drop="right"
      alignEnd
      onToggle={(show) => {
        onToggle && onToggle(show);
      }}
    >
      <div className="relative inline-block">
        <HintToggle className={hintClassName} />
        <HintBody className={className}>{children}</HintBody>
      </div>
    </Dropdown>
  );
};
