import { ButtonHTMLAttributes } from 'react';

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
      className={`${className} bg-${color}-100 shadow hover:bg-${color}-200 border bg-opacity-90  transition-colors active:scale-105 border-${color}-300 text-${color}-500 mx-2 h-min rounded px-4 py-1 text-lg`}
      {...rest}
    >
      {title}
    </button>
  );
};
