# starter

个人项目 starter 模板集合。每个目录是一个独立的模板，可通过 `tiged` 直接安装使用。

## 可用模板

| 模板 | 描述 | 技术栈 |
|------|------|--------|
| `starter-tauri` | Tauri 2 桌面应用 | Tauri 2 + React 19 + TypeScript + Vite+ + Tailwind 4 + shadcn + SQLite |

## 使用方式

依赖 [tiged](https://github.com/tiged/tiged)，一个更安全的 `degit` 替代：

```bash
# 安装 tiged（如果还没有）
npm install -g tiged

# 复制指定 starter 到新目录
tiged 0xfig-labs/starter/starter-tauri my-app

# 或者一步到位
npx tiged 0xfig-labs/starter/starter-tauri my-app
```

进入项目后，按各模板的 README 指引进行配置和开发。

## 模板约定

- 每个 `starter-*` 目录完全自包含，独立管理依赖。
- 根目录不用 workspace，每个 starter 独立运行。
- 所有 starter 使用 `nub` 作为 Node 包管理器。
- 保持模板小巧、可复用、易于 fork。

## 开发

```bash
# 在具体 starter 目录下工作
cd starter-tauri
nub install
nub run dev
```

## License

MIT
