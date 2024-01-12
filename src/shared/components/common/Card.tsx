import React from 'react';
import cx from 'classnames';

export interface CardProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  shadow?: boolean;
}

export const Card = ({ className, shadow = false, ...props }: CardProps) => {
  return (
    <div
      className={cx(
        'rounded-lg border-grey-100 bg-background px-6 py-4 md:border-2',
        className,
        {
          'md:shadow-xl': shadow,
        },
      )}
      {...props}
    />
  );
};
