/* eslint-disable indent */
import {
  QueryKey,
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

type APIError = AxiosError<{
  message: string;
}>;

type AdditionalQueryOptions<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> = Omit<
  UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
  'queryKey' | 'queryFn'
>;

/**
 * A utility to easily define a typed useQuery hook for an API endpoint.
 * @param options query options
 * @returns typed useQuery hook and queryKey
 */
export const createAPIQuery = <TData>(
  options: UseQueryOptions<TData, APIError>,
) => {
  const useAPIQuery = (
    additionalOptions?: AdditionalQueryOptions<TData, APIError>,
  ) =>
    useQuery<TData, APIError>({
      ...options,
      ...additionalOptions,
    });

  useAPIQuery.queryKey = options.queryKey;
  return useAPIQuery;
};

type AdditionalMutationOptions<
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown,
> = Omit<
  UseMutationOptions<TData, TError, TVariables, TContext>,
  'mutationKey' | 'mutationFn'
>;

/**
 * A utility to easily define a typed useMutation hook for an API endpoint.
 * @param options mutation options
 * @returns typed useMutation hook
 */
export const createAPIMutation = <TData, TVariables, TContext = unknown>(
  options: UseMutationOptions<TData, APIError, TVariables, TContext>,
) => {
  const useAPIMutation = (
    additionalOptions?: AdditionalMutationOptions<
      TData,
      APIError,
      TVariables,
      TContext
    >,
  ) =>
    useMutation<TData, APIError, TVariables, TContext>({
      ...options,
      ...additionalOptions,
    });

  return useAPIMutation;
};
