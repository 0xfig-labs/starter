# 根目录代理规则

## 作用域

- 本文件只约束仓库根目录及跨 starter 的操作。
- `starter-*` 是彼此独立、可通过 `tiged` 分发的模板项目；进入某个 starter 后，优先遵循其局部 `AGENTS.md`。
- 不把某个 starter 的框架、包管理器、构建方式或业务约定推广到其他 starter。

## 仓库边界

- 根目录不维护 workspace，不在根目录安装或共享依赖。
- 每个 starter 必须自包含自己的 manifest、lockfile、配置、`.gitignore`、`README.md` 和 `AGENTS.md`。
- 新增 starter 使用 `starter-<name>/` 目录，并提供独立的安装、开发、测试和构建说明。
- 根目录只放仓库级元文件和文档；不要把 starter 的源码、依赖或运行时配置移到根目录。
- 不修改、删除或回退其他 starter 中未由当前任务产生的用户变更。

## 工作方式

- 修改前确认目标 starter 的局部规则、README、manifest、lockfile 和实际脚本；不要凭根目录文档猜测命令。
- 只安装或更新目标 starter 的依赖；不要跨 starter 复用 lockfile 或配置。
- 遵循目标 starter 已声明的包管理器和脚本。根目录没有统一的 install、dev、test 或 build 命令。
- 生成文件、缓存和构建产物不应进入新的源码或文档约定；是否提交由目标 starter 的现有忽略规则决定。
- 根目录级文档只描述跨项目事实；详细技术说明放在对应 starter 的 README 或局部规则中。

## 验证

- 局部改动先运行受影响 starter 的最小脚本，再按风险扩大到该 starter 的类型检查、测试、构建或运行时 smoke。
- 修改共享边界（根 README、发布约定、目录约定）时，检查所有 starter 的分发路径和文档引用；不因惯例强制运行完整 CI。
- 模板改动必须验证“干净目录安装后”的用户路径，至少覆盖 README 声明的核心命令；需要凭据的部署只报告未验证，不伪造通过。
- 文档、规则或配置改动后检查 diff，确认没有 secrets、缓存、生成物或无关 starter 变更。

## 提交

- 使用 Conventional Commits。
- 根目录变更（例如根 `README.md`、`AGENTS.md`）单独提交。
- starter 内变更按 starter 分开提交，提交信息使用 `starter-<name>:` 前缀；同一 starter 的相关变更可合并为一个提交。
- 不在本文件中要求自动 commit、push、发布或部署；这些操作必须由当前请求明确授权。

## 参考入口

- 可用模板、复制命令和开发入口：`README.md`
- 产品定义与验收标准：`.indie/PRODUCT.md`
- Hono Worker 技术计划：`.indie/PLAN.md`
