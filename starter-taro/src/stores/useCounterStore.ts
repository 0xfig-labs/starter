/**
 * Zustand 计数器 Store（示例 / 教学用途）
 */

import { create } from 'zustand'

interface CounterState {
  count: number
  increment: () => void
  decrement: () => void
  reset: () => void
  setCount: (n: number) => void
}

export const useCounterStore = create<CounterState>()((set) => ({
  count: 0,
  increment: () => set((s) => ({ count: s.count + 1 })),
  decrement: () => set((s) => ({ count: s.count - 1 })),
  reset: () => set({ count: 0 }),
  setCount: (count) => set({ count }),
}))

export default useCounterStore
