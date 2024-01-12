import { DayPicker, SelectSingleEventHandler } from 'react-day-picker';
import {
  CustomDropdownButtonToggle,
  DropdownButton,
  OverlayFunc,
} from '../common/Dropdown/DropdownButton';
import { addDays, startOfWeek } from 'date-fns';
import cx from 'classnames';
import { Icon } from '@iconify/react';

interface DatePickerProps {
  selected?: Date | undefined;
  defaultSelected?: Date | undefined;
  onSelect?: SelectSingleEventHandler | undefined;
  menuFooter?: OverlayFunc;
  disabled?: boolean;
  workWeek?: boolean;
  fromDate?: Date | undefined;
  toDate?: Date | undefined;
  className?: string;
  dateClassName?: string;
  inline?: boolean;
  label?: string;
  showLabel?: boolean;
  showChevron?: boolean;
}

export function DatePicker({
  selected,
  defaultSelected,
  onSelect,
  menuFooter,
  disabled = false,
  workWeek = false,

  fromDate = new Date(1970, 0, 1),
  toDate = new Date(2100, 0, 1),

  label = 'Select Date',
  showLabel = false,

  showChevron = true,
  inline = true,

  className,
  dateClassName,
}: DatePickerProps) {
  if (defaultSelected) {
    selected = selected ?? defaultSelected;
  }

  if (typeof selected === 'string') {
    selected = new Date(selected);
  }
  const showDate =
    selected?.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }) ?? label;

  return (
    <DropdownButton
      className={cx('p-2', className)}
      menuClassName="z-55 border bg-white rounded-lg shadow-lg"
      inline={inline}
      showChevron={showChevron}
      label={showDate}
      customToggle={
        inline ? undefined : (
          <CustomDropdownButtonToggle
            onClick={(e) => e.preventDefault()}
            className={cx(
              'min-h-14 text-18 w-full rounded-lg  bg-white px-3',
              dateClassName,
            )}
          >
            {showLabel && (
              <label className={'block text-left text-lg'}>{label}</label>
            )}
            <div
              className={cx(
                'flex justify-between rounded-b border-t bg-white p-2 transition-colors hover:bg-gray-100',
                {
                  'my-auto': showLabel,
                },
              )}
            >
              {showDate}
              <Icon
                icon="tabler:chevron-down"
                className="my-auto rounded-full hover:scale-105"
                width={24}
              />
            </div>
          </CustomDropdownButtonToggle>
        )
      }
      disabled={disabled}
      overlay={({ show, toggle }) =>
        show ? (
          <div className="z-60 mx-auto rounded-lg  bg-white p-4 shadow-lg">
            <DayPicker
              disabled={disabled}
              mode="single"
              showOutsideDays
              required
              selected={selected}
              defaultMonth={selected}
              initialFocus
              captionLayout="dropdown-buttons"
              fromDate={fromDate}
              toDate={toDate}
              onSelect={(day, selectedDay, activeModifiers, e) => {
                // toggle();
                if (workWeek) {
                  day = addDays(startOfWeek(day ?? selectedDay), 1);
                }
                onSelect?.(day, selectedDay, activeModifiers, e);
              }}
              classNames={{
                caption: 'flex [&>*]:my-auto justify-between [&>*]:flex',
                caption_label: 'hidden',

                dropdown: 'p-0 border-none',
                dropdown_month:
                  '[&>*]:my-auto [&>span]:hidden  border-b-2 [&>*]:bg-transparent p-1',
                dropdown_year:
                  '[&>*]:my-auto [&>span]:hidden  border-b-2 [&>*]:bg-transparent p-1',

                table: 'mx-auto w-full mt-4',
                head: '[&>*]:font-light',
                head_cell: 'text-center font-light text-lg',
                cell: 'text-center py-2 transition-all hover:bg-blue-100',
                row: 'border-t',

                day: 'text-lg font-lato',
                nav_button: 'border p-2 mx-1 rounded-full',
              }}
              modifiersClassNames={{
                today: 'fontbold',
                outside: 'text-gray-300',
                disabled: 'text-gray-100',
                selected:
                  'text-blue-500 underline text-center rounded-full font-bold',
              }}
              className="z-60 mx-auto"
            />
            {menuFooter && (
              <div className="p-4">{menuFooter({ show, toggle })}</div>
            )}
          </div>
        ) : (
          <div />
        )
      }
    />
  );
}
