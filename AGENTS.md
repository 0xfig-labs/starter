# AGENTS.md — starter monorepo

## 这是什么

个人 starter 模板集合。每个子目录是一个独立的 starter 项目，通过 `tiged` 提供给用户安装。

## 仓库结构

```text
.
├── starter-tauri/    # Tauri 2 桌面应用模板
│   ├── README.md     # 模板说明
│   ├── AGENTS.md     # 模板专用 agent 指南
│   └── ...
└── ...               # 后续添加更多 starter
```

## 规则

- 每个 `starter-*` 目录完全独立，不共享依赖或配置。
- 根目录不做 workspace 管理。
- 新增 starter：新建 `starter-<name>/` 目录，确保该目录自包含。
- 每个 starter 必须有自己的 `.gitignore`、`README.md`、`AGENTS.md`。
- 根目录只放仓库级别的元文件（本文件、`.gitignore`、`README.md`）。

## 提交规范

- 根级别变更（README / AGENTS.md）单独提交。
- starter 内的变更在对应目录中处理，提交信息前缀 `starter-<name>:`。
- 使用 conventional commits。
