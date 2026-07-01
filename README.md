# starter

个人项目 starter 模板集合。每个目录是一个独立的模板，可通过 `tiged` 直接安装使用。

## 可用模板

| 模板 | 描述 | 技术栈 |
|------|------|--------|
| `starter-tauri` | Tauri 2 桌面应用 | Tauri 2 + React 19 + TypeScript + Vite+ + Tailwind 4 + shadcn + SQLite |
| `starter-nuxt` | Nuxt 4 全栈 SSR 应用 | Nuxt 4 + Nuxt UI + Tailwind CSS v4 + Pinia + Cloudflare Pages SSR + pnpm |
| `starter-taro` | Taro 4 小程序快速启动 | Taro 4 + React 18 + TypeScript + Vite + Zustand + TanStack Query + UnoCSS |

## 使用方式

依赖 [tiged](https://github.com/tiged/tiged)，一个更安全的 `degit` 替代：

```bash
# 安装 tiged（如果还没有）
npm install -g tiged

# 复制指定 starter 到新目录
tiged 0xfig-labs/starter/starter-tauri my-app

# 或者一步到位
npx tiged 0xfig-labs/starter/starter-tauri my-app

# Nuxt 4 全栈应用
npx tiged 0xfig-labs/starter/starter-nuxt my-nuxt-app

# Taro 4 小程序
npx tiged 0xfig-labs/starter/starter-taro my-miniapp
```

进入项目后，按各模板的 README 指引进行配置和开发。

## 模板约定

- 每个 `starter-*` 目录完全自包含，独立管理依赖。
- 根目录不用 workspace，每个 starter 独立运行。
- 各 starter 使用各自项目的包管理器（`nub`/`pnpm`），不统一。
- 保持模板小巧、可复用、易于 fork。

## 开发

```bash
# 在具体 starter 目录下工作
cd starter-tauri && nub install && nub run dev
cd starter-nuxt && pnpm install && pnpm dev
cd starter-taro && pnpm install && pnpm dev:weapp
```

## License

MIT
