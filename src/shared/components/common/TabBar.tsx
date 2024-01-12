import React from 'react';
import cx from 'classnames';

export interface Tab {
  label: React.ReactNode;
  id: string;
}

interface Props {
  className?: string;
  tabs: Tab[];
  selectedTabId: string | undefined;
  onTabSelected: (tabId: string) => void;
}

export const TabBar = ({
  tabs,
  selectedTabId,
  className,
  onTabSelected,
}: Props) => {
  return (
    <div
      className={cx(
        className,
        'sticky top-0 z-30 flex flex-wrap gap-4 bg-background',
      )}
    >
      {tabs.map((tab) => (
        <button
          className="flex flex-col whitespace-nowrap"
          key={tab.id}
          onClick={() => onTabSelected(tab.id)}
        >
          <div
            className={cx('p-2 font-semibold', {
              'text-grey-300': tab.id !== selectedTabId,
              '!font-bold': tab.id === selectedTabId,
            })}
          >
            {tab.label}
          </div>
          <div
            className={cx('h-1 w-full rounded-full ', {
              'bg-secondary': tab.id === selectedTabId,
            })}
          />
        </button>
      ))}
    </div>
  );
};
