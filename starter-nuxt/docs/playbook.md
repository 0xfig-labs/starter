# Development playbook

## Add a landing section

1. Create `app/components/marketing/<SectionName>.vue`.
2. Build with Nuxt UI components first.
3. Mount it from `app/pages/index.vue`.
4. Run `pnpm build`.

## Add a public page

1. Create `app/pages/<route>.vue`.
2. Use the default layout implicitly.
3. Add page SEO with `useSeoMeta` when copy is real.

## Add a dashboard page

1. Create `app/pages/dashboard/<route>.vue`.
2. Add:

```ts
definePageMeta({ layout: "dashboard" })
```

3. Keep it placeholder-only unless auth/data is requested.

## Add an API route

1. Create `server/api/<name>.get.ts` or `server/api/<name>.post.ts`.
2. Validate inputs at the API boundary.
3. Keep code Cloudflare-runtime compatible.
4. Use `.dev.vars.example` for required env vars.

## Add Cloudflare bindings

Add D1/KV/R2/Turnstile only when the feature needs it. Update:

- `wrangler.toml`
- `.dev.vars.example`
- `README.md`

## Add a dependency

Only add dependencies that remove real complexity. Prefer Nuxt/Nuxt UI/platform features first. After adding one, run:

```bash
pnpm verify
```
