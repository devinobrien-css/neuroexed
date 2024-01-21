/* eslint-disable indent */
import {
  QueryKey,
  UseMutationOptions,
  UseQueryOptions,
  UseQueryResult,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

export type APIError = AxiosError<{
  message: string;
}>;

export type UseAPIQuery<TQueryFnData = unknown, TError = unknown> = (
  options?: Omit<UseQueryOptions<TQueryFnData, TError>, 'queryKey' | 'queryFn'>,
) => UseQueryResult<TQueryFnData, TError>;

export type AdditionalQueryOptions<
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

/**
 * A utility to easily define a typed useQuery hook that requires parameters for an API endpoint.
 * @param options function that takes in TParams and returns query options
 * @returns typed useQuery hook and queryKey
 */
export const createAPIQueryWithParams = <TData, TParams>(
  getOptions: (params: TParams) => UseQueryOptions<TData, APIError>,
) => {
  const useAPIQueryWithParams = (
    params: TParams,
    additionalOptions?: AdditionalQueryOptions<TData, APIError>,
  ) =>
    useQuery<TData, APIError>({
      ...getOptions(params),
      ...additionalOptions,
    });

  useAPIQueryWithParams.queryKeyFn = (params: TParams) =>
    getOptions(params).queryKey;

  return useAPIQueryWithParams;
};

export type AdditionalMutationOptions<
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

/**
 * A utility to easily define a typed useMutation hook for an API endpoint.
 * @param options function that takes in TParams and returns mutation options
 * @returns typed useMutation hook
 */
export const createAPIMutationWithParams = <
  TData,
  TVariables,
  TParams,
  TContext = unknown,
>(
  getOptions: (
    params: TParams,
  ) => UseMutationOptions<TData, APIError, TVariables, TContext>,
) => {
  const useAPIMutation = (
    params: TParams,
    additionalOptions?: AdditionalMutationOptions<
      TData,
      APIError,
      TVariables,
      TContext
    >,
  ) =>
    useMutation<TData, APIError, TVariables, TContext>({
      ...getOptions(params),
      ...additionalOptions,
    });

  return useAPIMutation;
};
