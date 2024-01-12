import { forwardRef } from 'react';
import { Button, ButtonProps } from '../form/Button';
import cx from 'classnames';

interface ExpandingButtonProps extends ButtonProps {
  icon?: React.ReactNode;
}

export const ExpandingButton = forwardRef<
  HTMLButtonElement,
  ExpandingButtonProps
>(({ icon, children, className, ...props }, ref) => {
  return (
    <Button {...props} ref={ref} className={cx(className, 'group')}>
      <div className="flex items-center">
        {icon}
        <div className="w-0 overflow-x-hidden transition-all group-hover:w-48">
          <div className="w-48">{children}</div>
        </div>
      </div>
    </Button>
  );
});
