/**
 * TanStack Query 通用 Hooks
 *
 * 提供基于业务规范的基础 useQuery / useMutation 封装，
 * 内置自动 Toast 错误提示。
 */

import {
  useQuery,
  useMutation,
  useQueryClient,
  type UseQueryOptions,
  type UseMutationOptions,
  type QueryKey,
} from '@tanstack/react-query'
import Taro from '@tarojs/taro'

// ─── 通用错误处理 ───────────────────────────────────────────

function onQueryError(err: unknown) {
  const msg =
    err instanceof Error ? err.message : (err as { message?: string })?.message ?? '请求失败'
  Taro.showToast({ title: msg, icon: 'none' })
}

// ─── 封装 useQuery ──────────────────────────────────────────

export function useAppQuery<TData, TError = Error>(
  options: UseQueryOptions<TData, TError, TData, QueryKey> & {
    queryKey: QueryKey
    queryFn: () => Promise<TData>
  },
) {
  return useQuery<TData, TError, TData, QueryKey>({
    ...options,
  })
}

// ─── 封装 useMutation ───────────────────────────────────────

export function useAppMutation<
  TData,
  TError = Error,
  TVariables = void,
  TOnMutateResult = unknown,
>(
  options: UseMutationOptions<TData, TError, TVariables, TOnMutateResult>,
) {
  return useMutation<TData, TError, TVariables, TOnMutateResult>({
    ...options,
    onError: (err, vars, onMutateResult, ctx) => {
      onQueryError(err)
      options.onError?.(err, vars, onMutateResult, ctx)
    },
    onSettled: (data, err, vars, onMutateResult, ctx) => {
      options.onSettled?.(data, err, vars, onMutateResult, ctx)
    },
  })
}

// ─── 工具：刷新某个 queryKey ────────────────────────────────

export function useRefreshQuery() {
  const qc = useQueryClient()
  return (key: QueryKey) => qc.invalidateQueries({ queryKey: key })
}

export { useQueryClient }
