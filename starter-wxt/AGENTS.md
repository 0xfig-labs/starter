# starter-wxt project guide

这是独立的 WXT 浏览器扩展 starter，使用 React、TypeScript、Tailwind CSS 和 shadcn/ui 源码组件。

## 规则

- 使用 pnpm，不要改动仓库其他 starter 的依赖或配置。
- WXT 入口放在 `entrypoints/`；popup/options 使用 React。
- shadcn/ui 源码放在 `components/ui/`，组合组件放在 `components/`。
- `components.json`、Tailwind CSS 和 TypeScript aliases 必须保持一致。
- 默认权限保持最小；修改 `wxt.config.ts` 中权限前先确认入口实际需要。
- 不引入后端、认证、数据库、商店发布或 Safari 原生工程。

## 常用命令

```bash
pnpm install
pnpm dev
pnpm dev:firefox
pnpm check
pnpm build
pnpm build:firefox
pnpm zip
pnpm zip:firefox
```
