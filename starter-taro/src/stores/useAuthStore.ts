/**
 * Zustand Auth Store
 *
 * 使用 persist 中间件将 Token 持久化到 Storage。
 * 小程序环境使用 Taro.getStorageSync/setStorageSync 适配。
 */

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import Taro from '@tarojs/taro'
import { injectTokenGetter } from '../services'

// ─── 类型 ───────────────────────────────────────────────────

export interface AuthState {
  token: string | null
  /** 用户信息（按需扩展） */
  user: { id: string; nickname: string; avatar: string } | null
  isLogin: boolean
}

export interface AuthAction {
  setToken: (token: string) => void
  setUser: (user: AuthState['user']) => void
  login: (token: string, user: AuthState['user']) => void
  logout: () => void
}

type AuthStore = AuthState & AuthAction

// ─── 小程序 Storage 适配 ────────────────────────────────────

const taroStorage = {
  getItem: (name: string) => {
    try {
      return Taro.getStorageSync(name) ?? null
    } catch {
      return null
    }
  },
  setItem: (name: string, value: string) => {
    Taro.setStorageSync(name, value)
  },
  removeItem: (name: string) => {
    Taro.removeStorageSync(name)
  },
}

// ─── Store ──────────────────────────────────────────────────

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isLogin: false,

      setToken: (token) => set({ token, isLogin: true }),
      setUser: (user) => set({ user }),
      login: (token, user) => set({ token, user, isLogin: true }),
      logout: () => set({ token: null, user: null, isLogin: false }),
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => taroStorage),
      partialize: (s) => ({
        token: s.token,
        user: s.user,
        isLogin: s.isLogin,
      }),
    },
  ),
)

// ─── 初始化注入 Token getter ───────────────────────────────

injectTokenGetter(() => useAuthStore.getState().token)

export default useAuthStore
