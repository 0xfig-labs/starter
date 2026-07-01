# starter-taro

Taro 4 小程序快速启动模板。React 18 + TypeScript + Vite，集成了企业级项目常用的技术栈。

## 技术栈

| 功能 | 方案 |
|------|------|
| 框架 | Taro 4 (React 18) |
| 语言 | TypeScript |
| 编译器 | Vite 4 |
| 状态管理 | Zustand 5 |
| 服务端状态 | TanStack Query 5 |
| 数据校验 | Zod 4 |
| 表单 | React Hook Form 7 |
| HTTP 请求 | Taro.request 封装 |
| 日期 | Day.js (中文 locale) |
| CSS 方案 | UnoCSS 66 (原子化 CSS) |
| 图标 | Iconify (mingcute / logos / svg-spinners) |
| 工具库 | lodash-es |

## 快速开始

```bash
# 1. 安装依赖
pnpm install

# 2. 启动开发
pnpm dev:weapp     # 微信小程序
pnpm dev:h5        # H5 页面
```

## 目录结构

```
src/
├── app.tsx               # 应用入口（QueryClientProvider）
├── app.css               # 全局样式
├── app.config.ts         # 页面注册 & 窗口配置
├── services/
│   ├── request.ts        # HTTP 客户端（拦截器 / Token / 错误处理）
│   └── index.ts
├── stores/
│   ├── useAuthStore.ts   # 认证状态（Zustand + 持久化）
│   ├── useCounterStore.ts
│   └── index.ts
├── hooks/
│   ├── queries.ts        # TanStack Query 封装
│   └── index.ts
├── utils/
│   ├── validation.ts     # Zod 校验 schemas
│   ├── dayjs.ts          # Day.js 实例
│   └── index.ts
└── pages/
    └── index/            # 首页
        ├── index.tsx
        ├── index.config.ts
        └── index.css
```

## 开发命令

| 命令 | 说明 |
|------|------|
| `pnpm dev:weapp` | 微信小程序开发（热重载） |
| `pnpm build:weapp` | 微信小程序生产构建 |
| `pnpm dev:h5` | H5 开发 |
| `pnpm build:h5` | H5 生产构建 |
| `pnpm dev:alipay` | 支付宝小程序 |
| `pnpm dev:swan` | 百度小程序 |
| `pnpm dev:tt` | 抖音小程序 |
| `pnpm dev:jd` | 京东小程序 |

## 使用指南

### HTTP 请求

```typescript
import { http } from '@/services'

// GET
const { data } = await http.get<User[]>('/users')

// POST
const res = await http.post('/users', { name: 'test' })

// 带查询参数
const list = await http.get<Item[]>('/items', {
  header: { 'X-Custom': 'value' },
})
```

Token 自动从 Zustand auth store 读取并注入请求头。

### 状态管理

```typescript
import { useCounterStore, useAuthStore } from '@/stores'

function Page() {
  const { count, increment } = useCounterStore()
  const { isLogin, user, login } = useAuthStore()

  // Auth store 自动持久化到 Storage
  login('token', { id: '1', nickname: 'foo', avatar: '' })
}
```

### 服务端数据

```typescript
import { useAppQuery, useAppMutation } from '@/hooks'

// 查询
const { data, isLoading } = useAppQuery({
  queryKey: ['todos'],
  queryFn: () => http.get<Todo[]>('/todos').then(r => r.data),
})

// 变更（自动失效查询）
const mutation = useAppMutation({
  mutationFn: (title: string) => http.post('/todos', { title }),
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
})
```

### 表单校验

```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, type LoginForm } from '@/utils'

const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
  resolver: zodResolver(loginSchema),
})
```

预设校验规则：

- `phoneSchema` — 中国大陆手机号
- `emailSchema` — 邮箱
- `passwordSchema` — 8~32 位含字母数字
- `loginSchema` / `registerSchema` — 登录/注册表单

### 日期处理

```typescript
import { dayjs } from '@/utils'

dayjs().format('YYYY-MM-DD HH:mm:ss')         // 2026-07-01 12:00:00
dayjs('2026-07-01').fromNow()                 // 3 天前（中文）
dayjs().isToday()                              // true
dayjs.duration(7200).humanize()               // 2 小时（中文）
```

### 样式

使用 UnoCSS 原子化类：

```tsx
<View className="flex items-center justify-between p-6 bg-white rounded-12">
  <Text className="text-28 font-bold text-gray-800">标题</Text>
  <View className="i-mingcute-setting text-32 text-blue-500" />
</View>
```

快捷方式：

- `flex-center` — flex + items-center + justify-center
- `flex-between` — flex + items-center + justify-between
- `text-ellipsis` — 单行省略

图标使用：

```tsx
// MingCute 图标集
<View className="i-mingcute-add text-32" />
<View className="i-mingcute-delete text-32 text-red-500" />
<View className="i-mingcute-setting-line text-32" />

// 技术栈 logo
<View className="i-logos-taro text-40" />
<View className="i-logos-react text-40" />

// 加载动画
<View className="i-svg-spinners-ring-resize text-40 text-blue-500" />
```

## 配置参考

**`config/index.ts`** 中可配置：

- `designWidth` — 设计稿宽度（默认 750）
- `compiler.vitePlugins` — 自定义 Vite 插件
- `defineConstants` — 编译时常量

**`uno.config.ts`** 中可配置：

- `presets` — UnoCSS 预设
- `rules` — 自定义规则
- `shortcuts` — 快捷组合
- 图标集合（当前加载 mingcute / logos / svg-spinners）

## 环境变量

在 `.env.development` / `.env.production` 中配置：

```
VITE_API_BASE_URL=https://api.example.com
```

通过 `import.meta.env.VITE_*` 访问。

## 与 AGENTS.md 的关系

- **README.md**（本文件）→ 面向人类开发者，侧重使用方法和命令
- **AGENTS.md** → 面向 AI 编码代理（Claude Code / Copilot），侧重编码约定和模式参考

两个文件均可作为 AI 辅助开发的上下文输入。
