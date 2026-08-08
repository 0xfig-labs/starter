# starter

个人项目 starter 模板集合。每个目录是一个独立的模板，可通过 `tiged` 直接安装使用。

## 可用模板

| 模板 | 描述 | 技术栈 |
|------|------|--------|
| `starter-tauri` | Tauri 2 桌面应用 | Tauri 2 + React 19 + TypeScript + Vite+ + Tailwind 4 + shadcn + SQLite |
| `starter-react` | Vite React Web 应用 | React 19 + TypeScript + Vite+ + Tailwind 4 + shadcn + Zustand + i18next |
| `starter-nuxt` | Nuxt 4 全栈 SSR 应用 | Nuxt 4 + Nuxt UI + Tailwind CSS v4 + Pinia + Cloudflare Pages SSR + pnpm |
| `starter-taro` | Taro 4 小程序快速启动 | Taro 4 + React 18 + TypeScript + Vite + Zustand + TanStack Query + UnoCSS |
| `starter-wxt` | WXT 浏览器扩展 | WXT + React + TypeScript + Tailwind CSS + shadcn/ui |
| `starter-tanstack` | TanStack 全栈应用 | TanStack Start + React + TypeScript + Cloudflare Workers |
| `starter-hono-worker` | Hono Cloudflare Workers API | Hono + TypeScript + Wrangler + Zod |

选择建议：

- 需要页面、路由和全栈 UI：`starter-tanstack`
- 只需要 Cloudflare Workers API、webhook、BFF 或定时任务：`starter-hono-worker`

## 使用方式

依赖 [tiged](https://github.com/tiged/tiged)，一个更安全的 `degit` 替代：

```bash
# 安装 tiged（如果还没有）
npm install -g tiged

# Tauri 2 桌面应用
npx tiged 0xfig-labs/starter/starter-tauri my-app

# Vite + React Web 应用
npx tiged 0xfig-labs/starter/starter-react my-react-app

# TanStack 全栈应用
npx tiged 0xfig-labs/starter/starter-tanstack my-tanstack-app

# Nuxt 4 全栈应用
npx tiged 0xfig-labs/starter/starter-nuxt my-nuxt-app

# Taro 4 小程序
npx tiged 0xfig-labs/starter/starter-taro my-miniapp

# WXT 浏览器扩展
npx tiged 0xfig-labs/starter/starter-wxt my-extension

# Hono Cloudflare Workers API
npx tiged 0xfig-labs/starter/starter-hono-worker my-worker
```

进入项目后，按各模板的 README 指引进行配置和开发。

## 模板约定

- 每个 `starter-*` 目录完全自包含，独立管理依赖。
- 根目录不用 workspace，每个 starter 独立运行。
- `starter-react` 使用 Bun：`cd starter-react && bun install && bun run dev`
- 保持模板小巧、可复用、易于 fork。

## 开发

```bash
# 在具体 starter 目录下工作
cd starter-tauri && npm install && npm run dev
cd starter-react && bun install && bun run dev
cd starter-tanstack && bun install && bun run dev
cd starter-nuxt && pnpm install && pnpm dev
cd starter-taro && pnpm install && pnpm dev:weapp
cd starter-wxt && pnpm install && pnpm dev
cd starter-hono-worker && pnpm install && pnpm dev
```

## License

MIT
