# Hono Worker Starter

Minimal Cloudflare Workers API starter for webhooks, lightweight BFFs, scheduled jobs, and internal tools.

## Included

- Hono + TypeScript
- `GET /health`
- JSON 404 and 500 responses
- `X-Request-ID` on every HTTP response
- `fetch` and `scheduled` Worker handlers
- Vitest tests through `app.request`
- Wrangler local development and deployment

Intentionally excluded: database, authentication, queues, KV/R2, payments, OpenAPI, ORM, and UI.

## Quick start

```bash
pnpm install
pnpm dev
```

Open <http://localhost:8787/health>. A successful response is:

```json
{ "status": "ok" }
```

Every response includes `X-Request-ID`. A valid caller-provided ID is reused; invalid or missing IDs are replaced with a generated ID.

## Project structure

```text
src/
├── app.ts              # Testable Hono application
├── index.ts            # Worker fetch and scheduled handlers
├── lib/env.ts          # Binding types and request ID validation
└── routes/health.ts    # Health endpoint
test/app.test.ts        # HTTP contract tests
wrangler.jsonc          # Worker configuration
```

## Verify

```bash
pnpm test        # Unit and HTTP contract tests
pnpm typecheck   # TypeScript
pnpm build       # Wrangler deploy dry-run
```

## Add a route

Create a module under `src/routes/`, register it from `src/app.ts`, and test the HTTP behavior with `app.request`. Keep business-specific bindings and validation close to the route that uses them.

## Environment and secrets

For local-only values:

```bash
cp .dev.vars.example .dev.vars
```

Edit `.dev.vars` locally. It is ignored by Git and must never be committed, returned in a response, or logged. For production, configure secrets through Wrangler:

```bash
pnpm wrangler secret put YOUR_SECRET
```

Non-secret variables and Cloudflare bindings belong in `wrangler.jsonc`. Add only the bindings required by the product.

## Deploy

Authenticate Wrangler once, then deploy:

```bash
pnpm wrangler login
pnpm deploy
```

`pnpm build` only validates the upload with `--dry-run`; it does not deploy.

## Scheduled jobs

The Worker exports a `scheduled` handler in `src/index.ts`. Add product-specific work there when needed, without coupling it to the HTTP app.
