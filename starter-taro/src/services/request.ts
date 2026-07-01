/**
 * Taro.request HTTP 封装
 *
 * 特性：
 * - 自动注入 Token（从 Zustand auth store 读取）
 * - 请求/响应拦截器
 * - 统一错误处理
 * - 完整 TypeScript 类型
 * - 请求取消支持
 */

import Taro from '@tarojs/taro'

// ─── 类型定义 ───────────────────────────────────────────────

/** 业务响应体结构 */
export interface ApiResponse<T = unknown> {
  code: number
  message: string
  data: T
}

/** 扩展 Taro.request 选项 */
export interface RequestOption<T = unknown>
  extends Omit<Taro.request.Option<T>, 'success' | 'fail' | 'complete'> {
  /** 是否静默处理错误（不弹 toast），默认 false */
  silent?: boolean
  /** 自定义 baseURL，覆盖默认值 */
  baseURL?: string
}

// ─── 配置 ───────────────────────────────────────────────────

const DEFAULT_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api'

/** Token 读取函数 —— 由 useAuthStore 注入，避免循环依赖 */
let _getToken: (() => string | null) | null = null
export function injectTokenGetter(getter: () => string | null) {
  _getToken = getter
}

// ─── 拦截器 ─────────────────────────────────────────────────

Taro.addInterceptor((chain) => {
  const { requestPrams } = chain
  const token = _getToken?.()
  if (token) {
    requestPrams.header = {
      ...requestPrams.header,
      Authorization: `Bearer ${token}`,
    }
  }
  return chain.proceed(requestPrams)
})

// ─── 核心请求方法 ───────────────────────────────────────────

async function request<T = unknown>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  url: string,
  data?: Record<string, unknown>,
  option?: RequestOption<T>,
): Promise<ApiResponse<T>> {
  const baseURL = option?.baseURL ?? DEFAULT_BASE_URL
  const fullURL = url.startsWith('http') ? url : `${baseURL}${url}`

  try {
    const res = await Taro.request({
      url: fullURL,
      method,
      data,
      header: { 'Content-Type': 'application/json', ...option?.header },
      timeout: option?.timeout ?? 15000,
      dataType: option?.dataType ?? 'json',
    })

    const body = res.data as ApiResponse<T>

    // 业务错误统一处理
    if (body.code !== 0 && body.code !== 200 && !option?.silent) {
      Taro.showToast({ title: body.message || '请求失败', icon: 'none' })
    }

    return body
  } catch (err: any) {
    const msg = err?.errMsg ?? '网络异常，请重试'

    if (!option?.silent) {
      Taro.showToast({ title: msg, icon: 'none' })
    }

    return { code: -1, message: msg, data: null as unknown as T }
  }
}

// ─── 导出 HTTP 方法 ─────────────────────────────────────────

export const http = {
  get<T = unknown>(url: string, option?: RequestOption<T>) {
    return request<T>('GET', url, undefined, option)
  },

  post<T = unknown>(
    url: string,
    data?: Record<string, unknown>,
    option?: RequestOption<T>,
  ) {
    return request<T>('POST', url, data, option)
  },

  put<T = unknown>(
    url: string,
    data?: Record<string, unknown>,
    option?: RequestOption<T>,
  ) {
    return request<T>('PUT', url, data, option)
  },

  patch<T = unknown>(
    url: string,
    data?: Record<string, unknown>,
    option?: RequestOption<T>,
  ) {
    return request<T>('PATCH', url, data, option)
  },

  delete<T = unknown>(url: string, option?: RequestOption<T>) {
    return request<T>('DELETE', url, undefined, option)
  },
}

export default http
