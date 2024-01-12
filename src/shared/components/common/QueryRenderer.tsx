import { Spinner } from './Spinner';
import { Alert } from './Alert';
import { AxiosError } from 'axios';
import { UseQueryResult } from '@tanstack/react-query';
import { NonUndefined } from 'react-hook-form';

type Queries = { [key: string]: UseQueryResult<unknown, AxiosError> };

interface Props<R extends Queries> {
  queries: R;
  render: (queryData: {
    [K in keyof R]: NonUndefined<R[K]['data']>;
  }) => JSX.Element;
}

export const QueryRenderer = <R extends Queries>({
  queries,
  render,
}: Props<R>) => {
  const values = Object.values(queries);

  if (values.some((query) => query.isLoading)) {
    return <Spinner />;
  }

  const valueWithErr = values.find(
    (query) => query.isError || query.data === undefined,
  );
  if (valueWithErr) {
    return <Alert>{valueWithErr.error?.message ?? 'No Data'}</Alert>;
  }

  const dataMap = (Object.keys(queries) as (keyof R)[]).reduce<{
    [K in keyof R]: NonUndefined<R[K]['data']>;
  }>(
    (acc, key) => {
      acc[key] = queries[key].data as NonUndefined<R[keyof R]['data']>;
      return acc;
    },
    {} as { [K in keyof R]: NonUndefined<R[K]['data']> },
  );

  return render(dataMap);
};
