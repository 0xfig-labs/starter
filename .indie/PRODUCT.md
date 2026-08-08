# Hono Worker Starter 产品定义

## 1. Decision

**推荐：Keep / 新增 `starter-hono-worker`（P1）。**

- **目标方向**：个人项目的 Cloudflare Workers API 基座，优先覆盖 webhook、轻量 BFF、定时任务和内部工具 API。
- **信心**：中高。用户需求边界明确，且官方已有相同运行时的初始化与测试路径。
- **理由（Inference）**：当前仓库已有面向带 UI 的 `starter-tanstack`，但没有纯 API/edge 服务模板；新增独立 starter 能补齐产品空位，不会把 UI、数据库或业务约束带入 API 基座。
- **近邻替代**：直接使用 Hono 官方 `cloudflare-workers` 模板。若用户只需要一次性服务且不需要仓库统一约定，官方模板更省事；本仓库 starter 的价值在于可复制的目录、错误响应、请求 ID、测试和安全的环境变量示例。
- **反转条件**：若验证显示用户只接受官方原始模板、或本仓库维护成本明显高于复用收益，则取消新增，改为 README 链接到官方模板。

## 2. Problem & opportunity

### Target user

- **目标用户**：个人开发者、小团队开发者；需要快速部署 Cloudflare Workers API，熟悉 TypeScript，愿意使用 Wrangler。
- **排除用户**：需要 UI 的全栈产品（使用 `starter-tanstack`）；需要预置数据库、认证、支付、复杂事件编排或 OpenAPI 生成的产品；非 Cloudflare Workers 运行时用户。

### Job / problem

- **JTBD**：当我开始一个轻量 API、webhook 或 edge 任务时，我希望从一个可运行且可测试的 Hono Worker 起步，以便立即添加业务路由并安全部署，而不是先整理运行时入口、错误处理、请求追踪和 bindings 类型。
- **观察到的问题**：官方初始化模板能建立最小 Worker，但不会替本仓库定义统一的 health endpoint、错误响应、请求 ID和测试边界（Fact/Inference，需以实现验收确认）。
- **当前 workaround**：运行 Hono 官方 `cloudflare-workers` 模板，然后自行补齐路由拆分、测试、错误处理和环境变量示例。
- **期望结果**：复制 starter、安装依赖、启动本地 Wrangler、访问 health endpoint、运行测试并可部署；secret 只通过 bindings 进入运行时，不被示例代码读取或打印。

### Success signals

- 新用户能在一次 README 引导内完成本地启动并得到健康检查响应。
- health、错误响应、请求 ID均有可执行测试覆盖。
- 不引入默认数据库、认证、队列、KV/R2、支付、OpenAPI 或 ORM，避免 API 基座变成业务模板。

## 3. Reuse & references

### Repository reuse

- **Fact**：仓库规定每个 `starter-*` 完全自包含，根目录不做 workspace 管理；新 starter 必须自带 `.gitignore`、`README.md`、`AGENTS.md`（`AGENTS.md`，已检查 2026-08-08）。
- **Fact**：`starter-tanstack` 已覆盖带 UI 的 TanStack Start、server functions、API routes 和 Cloudflare 部署说明（`starter-tanstack/README.md`、`starter-tanstack/AGENTS.md`，已检查 2026-08-08）。
- **Decision**：不改造 `starter-tanstack`，新增独立目录；复用仓库的自包含 starter 约定和 README/AGENTS 文档形式。

### Official sources

1. **Hono — Cloudflare Workers guide**，https://hono.dev/docs/getting-started/cloudflare-workers，已检查 2026-08-08，官方文档，信心高。
   - **Fact**：官方提供 `create-hono` 的 `cloudflare-workers` 初始化模板；Hono app 可作为 module Worker 的 `fetch` handler，并可额外导出 `scheduled` handler；bindings 可通过 `c.env` 使用并进行类型化。
   - **Transferable mechanism**：`app.fetch` + `scheduled` 的 module Worker 入口、Hono 路由和 `app.request` 测试方式。
   - **Adopt**：采用 Cloudflare Workers module 入口、Hono app 独立化、Wrangler 本地开发/部署路径。

2. **Hono — Testing guide**，https://hono.dev/docs/guides/testing，已检查 2026-08-08，官方文档，信心高。
   - **Fact**：官方建议用 Vitest；Hono 可通过 `app.request` 测试请求/响应，并可向第三个参数传入 bindings 环境。
   - **Adopt**：测试 app 而非只测试实现细节；至少覆盖成功、错误和请求 ID契约。

3. **Cloudflare Workers — Vitest integration**，https://developers.cloudflare.com/workers/testing/vitest-integration/，已由 Hono 文档引用，待实施阶段核验具体配置版本。
   - **Unknown**：最终采用轻量 `app.request` 测试，还是完整 `@cloudflare/vitest-pool-workers` 集成，取决于需要验证的 Workers runtime 行为；MVP 先保持可运行且低维护。

### Build vs reuse

- **Adopt**：Hono、Wrangler、TypeScript、Zod，以及官方推荐的测试路径。
- **Build**：本仓库特有的目录边界、health route、统一错误响应、请求 ID middleware、类型化 bindings 示例和 README 验收路径。
- **Reject for MVP**：数据库、认证、队列、KV/R2、支付、OpenAPI、ORM；这些是具体产品需求，不是 API 基座的共同需求。

## 4. Product scope

### MVP must-have

- 独立 `starter-hono-worker/`，包含自己的 `AGENTS.md`、`README.md`、`.gitignore`、`package.json`、`wrangler.jsonc`、`.dev.vars.example`。
- `src/index.ts`：Worker module 入口，连接 `fetch` 与 `scheduled`；`src/app.ts`：可独立测试的 Hono app。
- `src/routes/health.ts`：health endpoint，返回可机器读取的成功响应。
- `src/lib/env.ts`：类型化 Worker bindings；示例不读取、输出或提交 secret 值。
- 请求 ID：每个 HTTP 响应可取得请求 ID；客户端提供有效请求 ID时定义清晰的透传/覆盖行为，未提供时由服务生成。
- 错误响应：未知路由和运行时错误返回稳定的 JSON 错误结构与合适的 HTTP 状态码，不泄露 secret 或内部堆栈。
- `test/`：覆盖 health、错误响应、请求 ID及最小 scheduled 入口契约。
- README：安装、开发、测试、部署、bindings/secret 使用和复制后添加路由的最短路径。

### Explicit non-goals

- 不提供业务路由、数据库 schema 或持久化实现。
- 不提供认证/授权、webhook 签名校验或 rate limit；这些必须由具体业务明确加入。
- 不提供 KV、R2、D1、Durable Objects、Queues、支付、OpenAPI、ORM、日志平台和管理 UI 的默认配置。
- 不承诺 Safari、非 Cloudflare 部署、商店发布或后端控制面。

### Product stories

1. 作为 API 开发者，我可以复制 starter 并在本地启动，确认服务可用。
2. 作为 API 开发者，我可以把路由写在 app/ routes 结构中，并用测试直接验证 HTTP 行为。
3. 作为运维者，我可以区分成功、客户端错误、未知路由和服务端错误，并用请求 ID关联一次请求。
4. 作为 Cloudflare Workers 开发者，我可以通过 bindings 使用环境配置，而不把 secret 写进代码或日志。
5. 作为需要定时任务的开发者，我可以在保留 HTTP API 的同时添加 scheduled 处理逻辑。

## 5. Journey

1. 用户用 `tiged` 获取 `starter-hono-worker`。
2. 用户安装依赖，复制 `.dev.vars.example`（如需要），启动 Wrangler 本地开发服务。
3. 用户访问 health endpoint，看到成功状态、稳定响应和请求 ID。
4. 用户新增一个业务 route，在 `app` 测试链路中验证成功与失败响应。
5. 用户把非 secret 配置放入 Wrangler 配置，把 secret 放入本地 dev vars 或 Cloudflare secret bindings。
6. 用户运行测试并部署 Worker；需要定时任务时，在既有 scheduled 入口中添加业务处理。

详细页面、交互、视觉和响应式设计不属于本产品范围；该 starter 无 UI。

## 6. Acceptance

- **AC-01 本地可运行**：全新用户按 README 的安装和开发步骤执行后，本地 Worker 启动成功；访问 health endpoint 得到成功 HTTP 响应。
- **AC-02 可测试 app**：测试可直接向导出的 Hono app 发起请求，并验证 health endpoint 的状态、响应类型和必要字段。
- **AC-03 健康检查**：health endpoint 不依赖数据库、认证或 secret；正常情况下返回稳定的机器可读成功结构。
- **AC-04 错误边界**：未知路由返回非成功 HTTP 状态和稳定 JSON 错误结构；未捕获服务端错误不会把堆栈、bindings 值或 secret 暴露给客户端。
- **AC-05 请求追踪**：HTTP 响应始终包含请求 ID；调用方提供请求 ID时，行为符合 README 明确的约定；未提供时服务生成非空 ID。
- **AC-06 安全配置**：仓库只提交 `.dev.vars.example` 等占位示例，不提交 secret 实际值；示例代码和默认错误响应不读取或打印 secret。
- **AC-07 scheduled 兼容**：Worker 入口同时保留 HTTP fetch 与 scheduled 处理能力；scheduled 处理不破坏 HTTP app 的可测试性。
- **AC-08 部署路径**：README 给出 Wrangler 部署命令和 bindings/secret 的配置边界；在具备 Cloudflare 凭据的环境中可按该路径部署（凭据缺失时以配置解析和本地验证替代）。
- **AC-09 边界清晰**：默认依赖和示例不包含数据库、认证、队列、KV/R2、支付、OpenAPI 或 ORM；TanStack starter 仍是带 UI 的全栈产品入口。

## 7. Constraints & unknowns

### Constraints

- 每个 starter 独立管理依赖和配置，不新增根 workspace。
- 只新增 `starter-hono-worker` 产品边界；不顺手重构现有 starter。
- 默认 TypeScript + Hono + Wrangler + Zod + Worker 测试；具体版本遵循实施时的当前兼容版本和 lockfile。
- 运行时为 Cloudflare Workers module Worker；secret 不进入源码、示例输出或日志。

### Assumptions

- **Assumption**：目标用户接受 Cloudflare Workers 和 Wrangler 作为部署前提。
- **Assumption**：请求 ID和统一错误响应对 webhook/BFF/内部 API 的初始开发价值高于预置更多基础设施。
- **Assumption**：P1 级别先提供可复用基座，不需要先实现真实业务 API。

### Unknowns

- **Unknown**：测试是否必须使用 `@cloudflare/vitest-pool-workers` 才能覆盖最终需要的 Workers-specific 行为；实施时根据实际 runtime 代码确认。
- **Unknown**：请求 ID采用哪个 header 名称及客户端 ID 的信任策略；实施阶段需固定为稳定、可文档化的产品契约。
- **Unknown**：scheduled 默认示例是空处理器还是仅展示日志之外的可验证行为；不能打印 secret，需在实现验收前选定最小安全行为。

### Validation plan

| Uncertainty | Disposable validation artifact | Decision unlocked |
|---|---|---|
| Hono module entry 是否同时适合 HTTP 与 scheduled | 最小 `app.ts` + `index.ts` spike，运行本地 Wrangler 并执行一条 fetch/一条 scheduled 测试 | 保留双入口，或缩减为纯 HTTP starter |
| `app.request` 是否足以覆盖 MVP 契约 | 针对 health、未知路由、异常和 bindings 的最小测试 | 采用轻量测试，或升级 Workers pool |
| 请求 ID/错误结构是否有真实复用价值 | 用 webhook、BFF、内部 API 三个样例请求走 README 验收 | 固定 header/JSON 契约，或删除非必要约定 |
| 与 TanStack starter 的边界是否清楚 | 让一名新用户分别完成两种 starter 的首次启动并记录选择理由 | 保持两个 starter，或合并/调整定位 |

验证产物均为一次性 spike，不创建生产架构、持久化或 UI。
