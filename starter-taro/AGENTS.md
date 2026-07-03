# AGENTS.md — starter-taro

## 项目概述

Taro 4 小程序快速启动模板，基于 React 18 + TypeScript + Vite。

目标：提供一个业务无关、可运行、可复制改造的小程序 starter。首页应展示模板能力和通用组件，不绑定生活服务、商城、订单等具体业务。

优先保证：

1. 微信小程序可编译运行
2. H5 可用于快速 UI 验证
3. 组件轻量、可删除、可复制

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | Taro 4 |
| UI | React 18 |
| 语言 | TypeScript |
| 编译器 | Vite |
| 状态管理 | Zustand |
| 服务端状态 | TanStack Query |
| HTTP | Taro.request 封装 |
| 表单 | React Hook Form + Zod |
| 日期 | Day.js |
| CSS | UnoCSS |
| 图标 | Iconify (mingcute/logos/svg-spinners) |

## 目录结构

```text
starter-taro/
├── config/
│   └── index.ts              # Taro 构建配置（含 UnoCSS/别名 Vite 插件）
├── src/
│   ├── app.tsx               # 入口（QueryClientProvider）
│   ├── app.css               # 全局样式
│   ├── app.config.ts         # 页面注册/窗口配置
│   ├── components/
│   │   └── index.tsx         # 通用模板组件
│   ├── hooks/
│   │   ├── queries.ts        # TanStack Query 封装
│   │   └── index.ts
│   ├── pages/index/
│   │   ├── index.tsx         # 中性 starter 首页
│   │   ├── index.config.ts
│   │   └── index.css
│   ├── services/
│   │   ├── request.ts        # HTTP 客户端
│   │   └── index.ts
│   ├── stores/
│   │   ├── useAuthStore.ts   # 认证状态（Zustand persist + Taro Storage）
│   │   ├── useCounterStore.ts
│   │   └── index.ts
│   └── utils/
│       ├── dayjs.ts
│       ├── validation.ts
│       └── index.ts
├── uno.config.ts
├── tsconfig.json
├── AGENTS.md
└── README.md
```

## 页面路由

Taro 页面注册在 `src/app.config.ts`：

```text
pages/index/index  →  首页
```

新增页面：

1. 在 `src/pages/` 下创建页面目录
2. 在 `src/app.config.ts` 的 `pages` 数组中注册

## 开发命令

```bash
pnpm dev:weapp      # 微信小程序开发
pnpm build:weapp    # 微信小程序生产构建
pnpm dev:h5         # H5 开发 / UI 验证
pnpm build:h5       # H5 生产构建
pnpm typecheck      # TypeScript 检查
pnpm lint           # ESLint 检查
```

如果 Taro 构建在沙箱内触发 macOS `system-configuration` panic，按环境权限规则改用非沙箱执行同一构建命令验证。

## 通用组件约定

组件集中在 `src/components/index.tsx`，当前是 starter 级别的轻量模板组件，不是完整 UI 组件库。

内置组件：

- `PageShell` — 页面骨架、背景、底部 fixed 区域
- `AppHeader` — 标题、副标题、右侧操作
- `Card` — 通用卡片
- `Section` — 区块标题、描述、extra
- `Badge` — 状态标签
- `ActionGrid` — 功能宫格
- `StatCard` — 指标卡片
- `ListItem` — 列表/设置项
- `EmptyState` — 空状态
- `LoadingState` — 加载骨架
- `ErrorState` — 错误状态

组件原则：

- 不做完整设计系统
- 不新增依赖
- 不做复杂主题系统
- 优先用 `@tarojs/components`
- 业务项目需要时再扩展 props
- 单项目只用一次的抽象不要加进 components

## 编码约定

### 导入路径

- `@/` 指向 `src/`
- 优先使用 `@/components`、`@/stores`、`@/services`
- Taro UI 元素从 `@tarojs/components` 导入

### 状态管理

- 全局 UI/客户端状态 → Zustand (`src/stores/`)
- 服务端数据/API 调用 → TanStack Query (`src/hooks/queries.ts`)
- 认证信息 → `useAuthStore`，使用 Taro Storage 持久化

### HTTP 请求

```typescript
import { http } from '@/services'

const { data } = await http.get<User[]>('/users')
const res = await http.post('/users', { name: 'foo' })
```

错误应抛出，让调用方或 TanStack Query 处理 loading/error/retry。

### TanStack Query

```typescript
import { useAppQuery, useAppMutation } from '@/hooks'
import { http } from '@/services'

const query = useAppQuery({
  queryKey: ['users'],
  queryFn: () => http.get<User[]>('/users').then(r => r.data),
})

const mutation = useAppMutation({
  mutationFn: (id: string) => http.delete(`/users/${id}`),
})
```

### 样式

- 优先 UnoCSS 工具类
- 页面特有复杂视觉写在页面 CSS
- 跨页面组件样式可以放在使用页面 CSS 或后续抽出全局样式，别过早建主题系统
- CSS Modules 未启用

重要约定：

- `text-28` 表示 `28px` 设计稿字号
- `uno.config.ts` 已自定义 `text-(\d+)` 规则覆盖 Uno 默认字号 scale
- 避免使用会生成 WXSS 不友好选择器的类，如 `text-white/85`；需要透明色时写普通 CSS 类

```tsx
<View className="flex-center gap-3 rounded-20 bg-white p-5">
  <Text className="text-28 text-blue-500">Hello</Text>
</View>
```

### 日期处理

```typescript
import { dayjs } from '@/utils'

dayjs().format('YYYY-MM-DD HH:mm:ss')
dayjs().fromNow()
dayjs().isToday()
dayjs.duration(1000).humanize()
```

### 表单校验

```typescript
import { loginSchema, type LoginForm } from '@/utils'

const result = loginSchema.parse({ account: '...', password: '...' })
```

## 首页方向

首页应保持 starter 中性：

- 展示模板技术栈
- 展示内置工程能力
- 展示通用组件用法
- 展示 loading / empty / error 状态

不要把首页设计成具体业务 App，例如：

- 生活服务
- 商城
- 订单中心
- 优惠券活动
- 本地门店

## 构建设置要点

- `config/index.ts` 中 `compiler` 使用对象形式以支持 `vitePlugins`
- UnoCSS 通过 Vite 插件接入
- `@unocss/preset-rem-to-px` 将 rem 转 px，再交给 Taro pxtransform
- `@/` 路径别名通过 Vite 插件解析
- Zustand persist 使用 `Taro.getStorageSync/setStorageSync` 替代 `localStorage`

## 验证要求

非文档改动至少运行：

```bash
pnpm typecheck
pnpm build:weapp
```

涉及 H5 UI 时运行：

```bash
pnpm dev:h5
pnpm build:h5
```

并用浏览器检查移动端宽度下的首页视觉。
