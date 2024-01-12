import cx from 'classnames';
import { ReactNode, useState } from 'react';
import { ReactComponent as ChevronDown } from '../../assets/icons/chevron-down.svg';
import { Card } from './Card';

interface CollapseProps {
  header?: ReactNode;
  children: ReactNode;
  className?: string;
}

export const Collapse = ({ header, children, className }: CollapseProps) => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Card className={className}>
      <div className="flex items-center justify-between">
        <div>{header}</div>
        <button onClick={() => setCollapsed((x) => !x)}>
          <ChevronDown
            className={cx('transition-transform', { 'rotate-180': !collapsed })}
          />
        </button>
      </div>
      {!collapsed && children}
    </Card>
  );
};
