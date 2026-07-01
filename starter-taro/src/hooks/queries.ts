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
    err instanceof Error ? err.message : (err as any)?.message ?? '请求失败'
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
    // 全局兜底：网络重连后自动刷新、窗口聚焦时刷新（H5 有效）
    refetchOnWindowFocus: false,
    // 默认 5 分钟缓存
    staleTime: 5 * 60 * 1000,
    // 默认 30 分钟垃圾回收
    gcTime: 30 * 60 * 1000,
    // 默认 3 次重试
    retry: 2,
  })
}

// ─── 封装 useMutation ───────────────────────────────────────

export function useAppMutation<TData, TError = Error, TVariables = void>(
  options: UseMutationOptions<TData, TError, TVariables>,
) {
  const queryClient = useQueryClient()

  return useMutation<TData, TError, TVariables>({
    ...options,
    onError: (err, vars, ctx) => {
      onQueryError(err)
      options.onError?.(err, vars, ctx)
    },
    onSettled: (data, err, vars, ctx) => {
      options.onSettled?.(data, err, vars, ctx)
    },
  })
}

// ─── 工具：刷新某个 queryKey ────────────────────────────────

export function useRefreshQuery() {
  const qc = useQueryClient()
  return (key: QueryKey) => qc.invalidateQueries({ queryKey: key })
}

export { useQueryClient }
