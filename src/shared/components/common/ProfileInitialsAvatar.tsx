import cx from 'classnames';

interface ProfileInitialsAvatarProps {
  first_name: string;
  last_name: string;
  className?: string;
}

export const ProfileInitialsAvatar = ({
  first_name,
  last_name,
  className = '',
}: ProfileInitialsAvatarProps) => {
  const initials = [first_name, last_name]
    .filter((a) => a)
    .map((a) => a[0])
    .join('');

  return (
    <div
      className={cx(
        className,
        'flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary font-semibold uppercase',
      )}
    >
      <p>{initials}</p>
    </div>
  );
};
