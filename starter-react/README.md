# starter-react

基于 Vite+ 和 React 19 的 Web 应用 starter，保留 starter-tauri 的前端结构与 UI 组件，但不包含 Tauri/Rust。

## 技术栈

- React 19 + TypeScript
- Vite+（Vite、Oxlint/Oxfmt、Vitest）
- React Router
- Tailwind CSS 4
- Base UI + shadcn 风格本地组件
- next-themes
- Zustand
- i18next + react-i18next
- Sonner

## 命令

```bash
bun install
bun run dev
bun run check
bun run test
bun run build
bun run preview
```

## 目录约定

- `src/app/`：应用启动、Provider、路由和导航配置
- `src/layouts/`：页面布局
- `src/components/app/`：应用级组件
- `src/components/ui/`：通用 UI 原语
- `src/pages/`：路由页面及其 feature 代码
- `src/shared/`：共享 hooks、stores、i18n
- `src/styles/`：全局样式和设计令牌

添加页面时，在 `src/pages/<route>/index.tsx` 创建页面，并更新 `src/app/navigation.tsx`。
