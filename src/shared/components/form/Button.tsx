import { ButtonHTMLAttributes } from 'react';
import cx from 'classnames';

interface ButtonProps {
  color: string;
  title: string;
  className?: string;
}
export const Button = ({
  color,
  title,
  className,
  ...rest
}: ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={cx(
        className,
        `bg-${color}-300 shadow hover:bg-${color}-200 border transition-colors hover:bg-opacity-50 active:scale-105 border-${color}-300 text-${color}-500 mx-2 h-min rounded px-4 py-1 text-lg`,
      )}
      {...rest}
    >
      {title}
    </button>
  );
};
