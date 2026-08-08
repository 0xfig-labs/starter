# Hono Worker Starter 技术与交付计划

> 产品定义：`.indie/PRODUCT.md`。本计划不重复定义 `AC-*`。

## 1. Readiness

**Ready for `/indie:build` after one bounded spike.**

- UI 不在范围内，不需要 `DESIGN.md`。
- 目标是新增独立 `starter-hono-worker/`；不改造现有 starter，不新增根 workspace。
- 唯一前置决策：先用最小运行时 spike 固定测试模式、请求 ID header 和 scheduled 最小行为；spike 通过后按下表实施。

## 2. Architecture and contracts

### System boundary

| Contract | Current seam | Change | Invariant/error/auth | Compatibility/rollback | Freeze owner |
|---|---|---|---|---|---|
| Worker entry | 新 starter 尚不存在；Hono 官方 module Worker 模式 | `src/index.ts` 导出 `{ fetch: app.fetch, scheduled }` | fetch 与 scheduled 共存；scheduled 不依赖 HTTP 请求上下文；无默认认证 | 删除新目录即可回滚；不影响其他 starter | Integrator |
| Hono app | Hono 官方 `new Hono()` + route handlers | `src/app.ts` 组装 health、错误处理、请求 ID middleware 和 routes | app 可直接 `app.request()`；错误响应 JSON 稳定且不泄露堆栈/secret | 保持 app 公共测试入口；可移除单个 route | Integrator |
| Health route | 新 starter 尚不存在 | `src/routes/health.ts` 注册健康检查 | 无 DB、binding、认证依赖；成功返回机器可读 JSON | route 可独立删除，不改变入口契约 | Route owner |
| Bindings | Hono `c.env` 类型机制 | `src/lib/env.ts` 定义最小 `Bindings` 类型并供 app 使用 | secret 只经 bindings；源码、示例响应、默认错误不得输出值 | 仅新增 binding 类型，不预置外部资源 | Integrator |
| Request ID | 新 starter 尚不存在 | middleware 读取约定 header，否则生成 ID；响应回写同一 header | 每个 HTTP 响应都有非空 ID；透传策略在 spike 后冻结 | 只影响新 starter；header 约定一旦发布需保留 | Integrator |
| Errors | Hono `notFound` / `onError` seams | 统一未知路由与运行时错误 JSON | 客户端收到稳定错误 code/message；服务端错误不返回堆栈或 binding 值 | 错误 schema 只在新 starter 内；可回滚为 Hono 默认处理前需同步 README/测试 | Integrator |
| Scheduled | Cloudflare module Worker scheduled handler | 提供无业务副作用的最小 handler，并留出业务扩展点 | 默认不打印 secret；不会改变 app 测试 | 可删除默认行为但保留入口形状 | Integrator |

### HTTP contract (to freeze in spike)

- Health：`GET /health`；成功状态；JSON 至少包含稳定的健康标识字段。
- Request ID：优先采用 `X-Request-ID`；默认生成非空值；响应始终回写。是否无条件信任客户端传入值由 spike 固定，默认不得把超长/非法值原样带入响应。
- Error：未知路由与运行时异常均为 JSON；至少包含稳定 `error`/`message` 语义和对应非成功状态；生产响应不含 stack、secret 或内部 binding 内容。
- Auth：MVP 无认证；业务 starter 使用者自行添加。
- Idempotency/versioning/timeouts：MVP 不定义；具体 webhook/业务 route 自行定义。

## 3. Dependency and reuse

| Need | Existing/builtin/installed options | OSS/official source and license | Decision | Exact install/change command | Generated delta/removal | Verify |
|---|---|---|---|---|---|---|
| HTTP framework | 无可复用根依赖；Cloudflare Workers 原生 fetch 可直接使用 | Hono Cloudflare Workers guide，https://hono.dev/docs/getting-started/cloudflare-workers，MIT，已检查 2026-08-08 | 使用 Hono；其路由、错误和 `app.request` seam 避免手写 router | 实施时在新目录按官方 pnpm 初始化路径核对当前命令；不在 Plan 阶段安装 | 新目录 package/lockfile；删除目录即移除 | `pnpm install`、类型检查、health 请求 |
| Runtime CLI | 现有 `starter-tanstack` 已使用 Wrangler，但依赖不共享 | Wrangler 官方配置/CLI文档；版本须实施时核验 | 新 starter 自己的 dev/deploy 脚本与 Wrangler 配置 | 按当前官方 CLI 与仓库 pnpm 约定落盘 | 仅新 starter lockfile/config | `pnpm dev`、`pnpm build`/`wrangler deploy --dry-run`（按当前 CLI能力核验） |
| Validation | repo 已使用 Zod，但 starter 独立，不跨目录复用 | Zod 官方包，MIT；只在需要校验 env/request ID 时使用 | 保留 Zod 作为明确的 MVP 默认依赖；不为 health 写过度 schema | `pnpm add hono zod`；dev deps 按官方当前模板核验 | 只生成新 package/lockfile | 未知/非法输入测试；无 schema 的路径不添加 Zod |
| Test runner | Hono 官方推荐 Vitest；Cloudflare 可选 Workers pool | Hono testing guide，https://hono.dev/docs/guides/testing，MIT 生态，已检查 2026-08-08 | 先采用 `app.request` + Vitest；仅当 spike 证明需 runtime 行为才加 pool | `pnpm add -D vitest`；pool 是否加入由 spike 决定 | 默认不生成 pool 配置；避免无必要运行时依赖 | health/error/request ID deterministic tests |
| Worker types | Cloudflare bindings 需要类型 | Hono guide 指向 `@cloudflare/workers-types` 与 `wrangler types` | 优先 Wrangler 类型生成；不手写资源 binding | 实施时核对当前 `wrangler types --env-interface ...` 命令 | 可能生成 `worker-configuration.d.ts`；若不需要则不提交 | `tsc --noEmit` 与 Wrangler dry run |

**依赖纪律**：不加入数据库、认证、队列、KV/R2、支付、OpenAPI、ORM、日志平台或 UI 依赖。所有版本和 lockfile 在 build 阶段按当前 package registry/官方模板核验，不在 Plan 阶段安装。

## 4. Bounded pre-plan spike

### Spike S1 — 入口与测试模式

- **Question**：Hono `app.request` 是否覆盖 AC-02/04/05，且 module Worker 能同时提供 fetch 与 scheduled。
- **Method**：在系统临时目录创建一次性最小 Hono app；运行一条 health、未知路由、抛错、带 binding 请求和 scheduled 调用；比较轻量 Vitest 与 Workers pool 的必要性。
- **Bound**：只验证入口/测试 API，不创建 starter 文件、不安装持久化、不做 UI；完成后删除临时产物。
- **Evidence**：命令输出、响应状态/JSON/header、类型检查结果。
- **Decision**：固定测试依赖、scheduled 默认行为、`X-Request-ID` 透传/校验规则。
- **Owner**：Integrator。

## 5. Vertical slices

| Slice | Observable outcome | AC/risk | Files/boundaries | Depends on | Owner | Verify | Rollback |
|---|---|---|---|---|---|---|---|
| S1 Spike | 本地最小 app 同时验证 HTTP 与 scheduled，测试方案已冻结 | AC-02/07；R1/R2 | 临时目录 only | 官方 Hono/Wrangler 当前文档核验 | Integrator | Wrangler dev、Vitest/app.request、类型检查 | 删除临时目录 |
| S2 Scaffold + health | 用户复制新 starter、安装并启动，`GET /health` 成功 | AC-01/03/09 | `starter-hono-worker/package.json`、lockfile、`wrangler.jsonc`、`.gitignore`、`src/app.ts`、`src/index.ts`、`src/routes/health.ts` | S1 | Integrator | clean-directory `pnpm install`；`pnpm dev` + HTTP request；test | 删除新目录 |
| S3 Errors + request ID | 未知路由/异常得到稳定安全 JSON；每个响应有 request ID | AC-04/05/06；R3 | `src/app.ts`、`src/lib/env.ts`、必要 middleware/error seam、`test/` | S1, S2 | Integrator | deterministic tests：状态、JSON、header、无 stack/secret；手动 curl smoke | 回滚 middleware/error handler，保留 S2 health |
| S4 Docs + env boundary | 新用户知道开发、测试、部署和 secret/bindings 边界 | AC-06/08/09 | `README.md`、`AGENTS.md`、`.dev.vars.example` | S2, S3 | Integrator | 按 README 在 clean copy 执行 install/test/dev；静态检查示例无实际 secret | 回滚文档到最小官方路径 |
| S5 Integrated proof | 新 starter 从安装到测试、构建/部署预检的完整路径可复现 | AC-01..09；全部风险 | 新目录全量 | S2–S4 | Integrator | package scripts、测试、类型检查、Wrangler config parse/dry run；具备凭据时再 deploy | 删除整个新目录，不改现有 starter |

No multi-agent split: all slices share the new package manifest, lockfile, app contract and documentation; parallel ownership would add merge risk without reducing work.

## 6. Risks

| Risk | Likelihood/impact | Earliest signal | Mitigation/spike | Fallback | Owner |
|---|---|---|---|---|---|
| R1：轻量 `app.request` 测试无法证明所需 Workers runtime 行为 | 中/中 | binding 或 scheduled 测试只能在 Node 行为下通过 | S1 对比 `@cloudflare/vitest-pool-workers` 当前官方配置 | 仅在需要时加入 pool；否则保持轻量测试 | Integrator |
| R2：scheduled 类型/配置与当前 Wrangler 版本不兼容 | 中/高 | `tsc` 或 Wrangler config parse 失败 | S1 使用当前官方 module Worker 示例核验 | 保留 scheduled 导出，调整最小类型/配置，不引入额外框架 | Integrator |
| R3：客户端 request ID 信任造成响应头污染或不可追踪 | 中/中 | 超长/非法 header 在测试中原样返回 | S1 固定长度/字符集和生成规则；测试边界 | 不透传不合规值，生成服务端 ID | Integrator |
| R4：错误处理误把调试信息泄露到响应 | 低/高 | 异常测试发现 stack、binding 值或内部信息 | S3 只断言公开稳定字段并检查敏感值不出现 | 生产错误使用固定公开 message；开发信息仅本地日志且不含 secret | Integrator |
| R5：starter 依赖随官方模板漂移 | 中/中 | install/build 与文档命令不一致 | S2/S5 以当前官方文档和 package manager 实测为准 | 缩减依赖到 Hono + Wrangler + Vitest 必需集合 | Integrator |

## 7. Integration and completion gate

1. S1 完成并冻结 HTTP/error/request ID/scheduled 合约。
2. Integrator 在新目录创建 package/config/lockfile 与最小 app；不得修改根 workspace 或其他 starter。
3. 逐 slice 运行窄验证；所有 AC 至少映射到一个测试或 README/运行时验收。
4. 执行全量新 starter 验收：安装、测试、类型检查、开发 smoke、Wrangler 配置解析或 dry run；凭据可用时追加真实部署，不以部署替代本地测试。
5. 检查 diff 仅包含 `starter-hono-worker/` 与必要的产品/计划文档；保留用户已有修改。
6. `/indie:proof` 独立核验 AC-01..09 后再考虑发布。

### Rollback

- 实现阶段失败：删除整个 `starter-hono-worker/`，恢复 `.indie/PLAN.md` 中对应未完成状态；不回退其他 starter 或用户改动。
- 运行时契约变更：先更新 `PRODUCT.md` 对应 AC，再同步 app、tests、README；禁止保留旧 header/schema 别名。
