import React from 'react';
import cx from 'classnames';

interface AlertProps {
  className?: string;
  children: React.ReactNode;
}

export const Alert = ({ className, children }: AlertProps) => {
  return (
    <div
      className={cx('w-full rounded-lg border-red bg-red-50 p-3', className)}
    >
      {children}
    </div>
  );
};
