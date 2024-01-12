import { Table as ReactTable, Row, flexRender } from '@tanstack/react-table';
import cx from 'classnames';
import { ReactComponent as SortIcon } from '../../../assets/icons/sort.svg';
import { ReactComponent as SortDescIcon } from '../../../assets/icons/sort-desc.svg';
import { ReactComponent as SortAscIcon } from '../../../assets/icons/sort-asc.svg';

interface TableProps<T> {
  table: ReactTable<T>;
  showRowSeperator?: boolean;
  highlightRowOnHover?: boolean;
  className?: string;
  noResultsComponent?: React.ReactNode;
  noResultsMessage?: string;
  stickyHeader?: boolean;
  loading?: boolean;
  padding?: string;
}

export interface RowProps<T extends object> {
  row: Row<T>;
}

export function Table<T extends object>({
  className,
  showRowSeperator,
  highlightRowOnHover,
  table,
  noResultsComponent,
  noResultsMessage,
  stickyHeader,
  loading = false,
  padding = 'p-2',
}: Readonly<TableProps<T>>) {
  return (
    <>
      <table className={cx('w-full', className)}>
        <thead
          className={stickyHeader ? 'sticky top-0 z-45 shadow-b' : 'shadow-b'}
        >
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className={`bg-background ${padding} text-left`}
                  >
                    {header.isPlaceholder ? null : (
                      <button
                        className={cx('flex items-center gap-2', {
                          'cursor-pointer select-none':
                            header.column.getCanSort(),
                        })}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {header.column.getCanSort() ? (
                          <div
                            className={cx(
                              'flex h-5 w-5 items-center justify-center rounded-sm ',
                              {
                                'bg-primary': header.column.getIsSorted(),
                              },
                            )}
                          >
                            {{
                              asc: <SortAscIcon />,
                              desc: <SortDescIcon />,
                            }[header.column.getIsSorted() as string] ?? (
                              <SortIcon className="text-grey" />
                            )}
                          </div>
                        ) : null}
                      </button>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody className="mt-4">
          <tr className="h-2" />
          {table.getRowModel().rows.map((row) => {
            let bgColor: string | undefined;
            if ('bgColor' in row.original) {
              bgColor = (row.original.bgColor as string) ?? undefined;
            }

            return (
              <tr
                key={row.id}
                onClick={row.getToggleSelectedHandler()}
                className={cx({
                  'border-b border-grey last:border-b-0': showRowSeperator,
                  'hover:bg-grey-100/50': highlightRowOnHover,
                  'bg-grey-100': row.getIsSelected(),
                  'hover:bg-grey-200/40':
                    row.getIsSelected() && highlightRowOnHover,

                  [`bg-${bgColor}`]: bgColor,
                })}
              >
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id} className={`cursor-pointer ${padding}`}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {table.getRowModel().rows.length === 0 &&
        !loading &&
        (noResultsComponent ?? (
          <div className="mx-auto block w-full py-32">
            <p className="text-center text-16">
              {noResultsMessage ?? 'No results found'}
            </p>
          </div>
        ))}
    </>
  );
}
