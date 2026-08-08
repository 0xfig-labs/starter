# starter-react project guide

这是独立的 Vite+ React Web starter。它与 `starter-tauri` 共享前端组织方式，但不共享依赖或配置。

## 技术栈

- React 19 + TypeScript
- Vite+ / Vite
- React Router browser routing
- Tailwind CSS 4
- Base UI / shadcn-style local UI primitives
- next-themes、Zustand、i18next、Sonner
- Bun 作为包管理和命令执行工具

## 规则

- 使用 `bun`，不要使用 npm、pnpm、yarn 或 nub。
- 页面放在 `src/pages/<name>/`，路由和导航元数据统一放在 `src/app/navigation.tsx`。
- 通用 UI 放在 `src/components/ui/`，应用级组件放在 `src/components/app/`。
- 共享状态放在 `src/shared/stores/`，国际化放在 `src/shared/i18n/`。
- 用户可见文本必须同步写入所有 locale JSON 文件。
- 不引入 Tauri、Rust 或桌面端专属 API。

## 常用命令

```bash
nub install
nub run dev
nub run check
nub run test
nub run build
```
