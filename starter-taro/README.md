# starter-taro

Taro 4 小程序 starter。基于 React 18 + TypeScript + Vite，优先支持微信小程序，同时保留 H5 和其他 Taro 平台构建能力。

这个模板不绑定具体业务：首页是一个中性的「模板启动台」，用于展示工程能力和常用小程序组件积木。

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
| CSS | UnoCSS 66 |
| 图标 | Iconify (mingcute / logos / svg-spinners) |
| 工具库 | lodash-es |

## 快速开始

```bash
pnpm install

pnpm dev:weapp      # 微信小程序开发
pnpm dev:h5         # H5 开发

pnpm typecheck      # TypeScript 检查
pnpm lint           # ESLint 检查
```

生产构建：

```bash
pnpm build:weapp
pnpm build:h5
```

## 目录结构

```text
src/
├── app.tsx                 # 应用入口（QueryClientProvider）
├── app.css                 # 全局样式
├── app.config.ts           # 页面注册 & 窗口配置
├── components/
│   └── index.tsx           # 通用模板组件
├── hooks/
│   ├── queries.ts          # TanStack Query 封装
│   └── index.ts
├── pages/
│   └── index/
│       ├── index.tsx       # 中性 starter 首页
│       ├── index.config.ts
│       └── index.css
├── services/
│   ├── request.ts          # HTTP 客户端
│   └── index.ts
├── stores/
│   ├── useAuthStore.ts     # 认证状态（Zustand + Storage）
│   ├── useCounterStore.ts
│   └── index.ts
└── utils/
    ├── dayjs.ts            # Day.js 实例
    ├── validation.ts       # Zod schemas
    └── index.ts
```

## 内置模板组件

组件位于 `src/components/index.tsx`，保持轻量，方便复制、删除和改造。

| 组件 | 用途 |
|------|------|
| `PageShell` | 页面背景、安全区、底部固定区域骨架 |
| `AppHeader` | 标题、副标题、右侧操作区 |
| `Card` | 通用卡片容器 |
| `Section` | 内容区块标题 + 描述 + extra |
| `Badge` | 状态标签 |
| `ActionGrid` | 快捷入口宫格 |
| `StatCard` | 指标卡片 |
| `ListItem` | 设置项/菜单项/列表项 |
| `EmptyState` | 空状态 |
| `LoadingState` | 加载骨架 |
| `ErrorState` | 错误状态 |

示例：

```tsx
import { ActionGrid, PageShell, Section } from '@/components'

export default function Page() {
  return (
    <PageShell>
      <Section title="功能入口" desc="替换为你的业务模块">
        <ActionGrid
          items={[
            { title: '订单', icon: 'i-mingcute-list-check-line' },
            { title: '设置', icon: 'i-mingcute-settings-3-line' },
          ]}
        />
      </Section>
    </PageShell>
  )
}
```

## HTTP 请求

```typescript
import { http } from '@/services'

const { data } = await http.get<User[]>('/users')
const res = await http.post('/users', { name: 'test' })
```

Token 自动从 auth store 读取并注入请求头；错误会抛出，便于 TanStack Query 接管重试和错误态。

## 服务端数据

```typescript
import { useAppQuery, useAppMutation } from '@/hooks'
import { http } from '@/services'

const { data, isLoading } = useAppQuery({
  queryKey: ['todos'],
  queryFn: () => http.get<Todo[]>('/todos').then(r => r.data),
})

const mutation = useAppMutation({
  mutationFn: (title: string) => http.post('/todos', { title }),
})
```

## 状态管理

```typescript
import { useAuthStore, useCounterStore } from '@/stores'

const { count, increment } = useCounterStore()
const { isLogin, user, login } = useAuthStore()
```

`useAuthStore` 使用 Taro Storage 持久化，适配小程序环境。

## 表单校验

```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, type LoginForm } from '@/utils'

const form = useForm<LoginForm>({
  resolver: zodResolver(loginSchema),
})
```

内置：`phoneSchema`、`emailSchema`、`passwordSchema`、`loginSchema`、`registerSchema`。

## 样式与图标

优先使用 UnoCSS：

```tsx
<View className="flex-between rounded-20 bg-white p-5">
  <Text className="text-28 font-bold text-slate-900">标题</Text>
  <View className="i-mingcute-settings-3-line text-32 text-blue-500" />
</View>
```

项目约定：`text-28` 表示 `28px` 设计稿字号。`uno.config.ts` 已覆盖 Uno 默认字号规则，避免 H5 下 `text-40` 被解析成 `10rem`。

常用快捷类：

- `flex-center`
- `flex-between`
- `text-ellipsis`

## 环境变量

在 `.env.development` / `.env.production` 中配置：

```env
VITE_API_BASE_URL=https://api.example.com
```

通过 `import.meta.env.VITE_*` 访问。

## 文档分工

- `README.md`：给开发者看的使用说明
- `AGENTS.md`：给 AI 编码代理看的项目约定
