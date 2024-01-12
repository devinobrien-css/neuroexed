import {
  RankingInfo,
  compareItems,
  rankItem,
} from '@tanstack/match-sorter-utils';
import { FilterFn, SortingFn, sortingFns } from '@tanstack/react-table';

declare module '@tanstack/table-core' {
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({ itemRank });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

// Checks whether a filterValue of a list of possible values includes any value present in a list of values in the row
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const filterValueIncludesAny: FilterFn<any> = (
  row,
  columnId,
  filterValue: unknown[],
) => {
  if (filterValue.length === 0) return true;
  const value = row.getValue(columnId) as unknown[];
  return value.some((v) => filterValue.includes(v));
};

// Checks whether a filterValue of a list of possible values includes the value of the row
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const filterValueIncludes: FilterFn<any> = (
  row,
  columnId,
  filterValue: unknown[],
) => {
  return !filterValue?.length || filterValue.includes(row.getValue(columnId));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
  let dir = 0;

  // Only sort by rank if the column has ranking information
  if (rowA.columnFiltersMeta[columnId]) {
    dir = compareItems(
      rowA.columnFiltersMeta[columnId].itemRank,
      rowB.columnFiltersMeta[columnId].itemRank,
    );
  }

  // Provide an alphanumeric fallback for when the item ranks are equal
  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
};
