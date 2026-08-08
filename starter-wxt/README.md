# starter-wxt

基于 WXT、React、TypeScript、Tailwind CSS 和 shadcn/ui 的浏览器扩展 starter。

## 技术栈

- WXT 0.21 + React 19 + TypeScript
- Tailwind CSS 4
- shadcn/ui 源码组件
- Chrome MV3、Firefox MV2 构建目标

## 使用

```bash
pnpm install
pnpm dev
```

开发服务启动后，在浏览器扩展管理页加载 WXT 输出的开发目录。示例 content script 只匹配 `https://example.com/*`，用于避免申请宽泛 host permissions。

## 构建与打包

```bash
pnpm check
pnpm build
pnpm build:firefox
pnpm zip
pnpm zip:firefox
```

生产目录位于 `.output/chrome-mv3/` 和 `.output/firefox-mv2/`；zip 位于 `.output/`。Chrome 使用 MV3，Firefox 使用 MV2，这是 WXT 当前 0.21.3 构建结果的实际目标。Firefox 构建可能提示 data collection permissions 和 extension ID 警告；本模板没有数据收集功能，发布前应按 Firefox 发布要求补充元数据。

## 目录

- `entrypoints/popup/`：扩展 popup
- `entrypoints/options/`：扩展设置页
- `entrypoints/content.ts`：页面 content script 示例
- `entrypoints/background.ts`：后台生命周期与消息示例
- `components/ui/`：shadcn/ui 源码组件
- `components.json`：shadcn/ui 配置
- `assets/globals.css`：Tailwind 与语义主题 token

删除示例入口或替换匹配规则后，重新运行 `pnpm check` 和目标浏览器构建。
