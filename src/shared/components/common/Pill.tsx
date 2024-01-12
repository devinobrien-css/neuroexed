import cx from 'classnames';

interface PillProps {
  className?: string;
  children: React.ReactNode | string;
}
export const Pill = ({ className, children }: PillProps) => {
  return (
    <span
      className={cx(
        'rounded-lg bg-grey-100 px-2 py-1 text-14 font-semibold shadow',
        className,
      )}
    >
      {children}
    </span>
  );
};
