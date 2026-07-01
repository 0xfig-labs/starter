# AGENTS.md — starter-taro

## 项目概述

Taro 4 小程序快速启动模板，基于 React 18 + TypeScript + Vite。

主要用途：快速创建微信/支付宝等小程序项目，开箱即用集成了常用技术栈。

## 技术栈

| 类别 | 技术 | 版本 |
|------|------|------|
| 框架 | Taro 4 | 4.2.0 |
| 语言 | TypeScript | ^5.4 |
| UI | React | ^18.0 |
| 编译器 | Vite | 4.x |
| 状态管理 | Zustand | 5.x |
| 服务端状态 | TanStack Query | 5.x |
| HTTP | Taro.request 封装 | 内置 |
| 表单 | React Hook Form + Zod | 7.x + 4.x |
| 日期 | Day.js | 1.x |
| 工具库 | lodash-es | 4.x |
| CSS | UnoCSS | 66.x |
| 图标 | Iconify (mingcute/logos/svg-spinners) | — |

## 目录结构

```
starter-taro/
├── config/
│   └── index.ts              # Taro 构建配置（含 UnoCSS/别名 Vite 插件）
├── src/
│   ├── app.tsx               # 入口（QueryClientProvider）
│   ├── app.css               # 全局样式
│   ├── app.config.ts         # 页面注册/窗口配置
│   ├── services/
│   │   ├── request.ts        # HTTP 客户端（拦截器链、Token 自动注入）
│   │   └── index.ts
│   ├── stores/
│   │   ├── useAuthStore.ts   # 用户认证 store（Zustand persist + Taro Storage）
│   │   ├── useCounterStore.ts # 计数器示例 store
│   │   └── index.ts
│   ├── hooks/
│   │   ├── queries.ts        # TanStack Query 封装（useAppQuery/useAppMutation）
│   │   └── index.ts
│   ├── utils/
│   │   ├── validation.ts     # Zod 校验 schemas（手机/邮箱/密码/登录/注册/分页）
│   │   ├── dayjs.ts          # Day.js 实例（zh-cn locale + 6 插件）
│   │   └── index.ts
│   └── pages/index/
│       └── index.tsx         # 首页（集成示例）
├── uno.config.ts             # UnoCSS 配置（presets/rules/shortcuts）
├── postcss.config.js
├── tsconfig.json
├── AGENTS.md                 # 本文件
└── README.md
```

## 页面路由

Taro 文件路由，配置在 `src/app.config.ts` 的 `pages` 数组中：

```
pages/index/index  →  首页
```

新增页面：
1. 在 `src/pages/` 下创建目录和文件
2. 在 `src/app.config.ts` 的 `pages` 数组中注册

## 开发命令

```bash
pnpm dev:weapp      # 微信小程序开发（热重载）
pnpm build:weapp    # 微信小程序生产构建
pnpm dev:h5         # H5 开发
pnpm build:h5       # H5 生产构建

# 其他平台
pnpm dev:alipay     # 支付宝
pnpm dev:swan       # 百度
pnpm dev:tt         # 抖音
pnpm dev:jd         # 京东
```

## 编码约定

### 导入路径
- `@/` 别名指向 `src/`，优先使用 `@/stores/useXxx` 而非相对路径
- 组件使用 `@tarojs/components`

### 状态管理
- **全局 UI/客户端状态** → Zustand store (`src/stores/`)
- **服务器数据/API 调用** → TanStack Query hooks (`src/hooks/queries.ts`)
- 认证信息用 `useAuthStore`（persist 中间件自动保存到 Taro Storage）

### HTTP 请求
```typescript
import { http } from '@/services'

// 自动注入 Token，统一错误处理（Toast）
const { data } = await http.get<User[]>('/users')
const res = await http.post('/users', { name: 'foo' })
```

### TanStack Query
```typescript
import { useAppQuery, useAppMutation } from '@/hooks'

// 自动重试 2 次，staleTime 30s，gcTime 5min
const { data, isLoading } = useAppQuery({
  queryKey: ['users'],
  queryFn: () => http.get<User[]>('/users').then(r => r.data),
})

const mutation = useAppMutation({
  mutationFn: (id: string) => http.delete(`/users/${id}`),
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
})
```

### 样式
- **UnoCSS 工具类** — 优先使用，小程序环境下已确保输出 `rpx` 单位
- CSS Modules 未启用，使用全局类名即可
- 直接写样式仅用于 UnoCSS 无法覆盖的场景

```tsx
<View className="flex-center gap-3 p-6 bg-white rounded-12">
  <Text className="text-28 text-blue-500">Hello</Text>
</View>
```

### 日期处理
```typescript
import { dayjs } from '@/utils'

dayjs().format('YYYY-MM-DD HH:mm:ss')   // 格式化
dayjs().fromNow()                        // 相对时间（中文）
dayjs().isToday()                        // 是否今天
dayjs.duration(1000).humanize()          // 时长中文
```

### 表单校验
```typescript
import { loginSchema, type LoginForm } from '@/utils'

// Zod 校验
const result = loginSchema.parse({ account: '...', password: '...' })
// React Hook Form + @hookform/resolvers
const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
  resolver: zodResolver(loginSchema),
})
```

## 构建设置要点

- `config/index.ts` 中 `compiler` 为对象形式以支持 `vitePlugins`
- `@unocss/preset-rem-to-px` 将 UnoCSS 的 `rem` 转为 `px`，再由 Taro 的 pxtransform 转为 `rpx`
- 路径别名 `@/` 通过自定义 Vite 插件 (`resolveTsPaths`) 解析
- Zustand persist 使用 `Taro.getStorageSync/setStorageSync` 替代 `localStorage`
