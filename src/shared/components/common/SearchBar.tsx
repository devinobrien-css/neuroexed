import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg';
import { ReactComponent as FilterIcon } from '../../assets/icons/filter-bars.svg';
import cx from 'classnames';

interface Props {
  placeholder?: string;
  className?: string;
  onChange: (value: string) => void;
  onFilterToggle?: () => void;
}

export const SearchBar = ({
  placeholder,
  className,
  onChange,
  onFilterToggle,
}: Props) => {
  return (
    <div
      className={cx(
        className,
        'border-gray-700 border-grey-700 sticky top-1 z-30 flex h-min shrink-0 items-center self-end overflow-hidden rounded-full border-2 bg-background py-1 pl-2 pr-4 text-12',
      )}
    >
      <SearchIcon width={24} height={24} className="shrink-0" />
      <input
        onChange={(e) => onChange(e.target.value.trim())}
        placeholder={placeholder ?? 'Search'}
        className="w-min border-none p-0 placeholder:text-grey-400 focus:ring-0 focus:ring-offset-0"
      />
      {onFilterToggle && (
        <button className="flex gap-3" onClick={onFilterToggle}>
          <FilterIcon />
        </button>
      )}
    </div>
  );
};
