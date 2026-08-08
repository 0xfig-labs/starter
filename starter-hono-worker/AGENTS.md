# starter-hono-worker

Cloudflare Workers API starter using Hono and TypeScript.

- Use pnpm; do not change other starters or the root workspace.
- Keep `src/app.ts` independently testable through Hono `app.request`.
- Keep secrets in `.dev.vars` or Wrangler secrets; never commit, return, or log secret values.
- Add product-specific bindings and authentication only when the product requires them.

```bash
pnpm install
pnpm dev
pnpm test
pnpm typecheck
pnpm build
pnpm deploy
```
