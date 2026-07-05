# Development playbook

## Add a landing section

1. Create `app/components/marketing/<SectionName>.vue`.
2. Build with shadcn-vue components first.
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

Only add dependencies that remove real complexity. Prefer Nuxt/shadcn-vue/platform features first. After adding one, run:

```bash
pnpm verify
```

## Add a composable

1. Create `app/composables/use<Name>.ts`.
2. Use auto-imported Vue/Nuxt APIs (ref, computed, useI18n, etc.).
3. Return only what consumers need.
4. Example: `useFormatDate` in `app/composables/`.

## Add a route middleware

1. Create `app/middleware/<name>.ts`.
2. Export a `defineNuxtRouteMiddleware` callback.
3. Return `navigateTo()` to redirect or `abortNavigation()` to block.
4. Example redirect middleware in `app/middleware/redirect.ts`.

## Validate API input

1. Define a Zod schema for the expected query/body/params.
2. Pass the schema to `getValidatedQuery(event, schema.parse)` or `readValidatedBody`.
3. Invalid input returns a 400 automatically. Example: `server/api/health.get.ts` (query), `server/api/contact.post.ts` (body).

## Add a toast notification

1. Import `toast` from `vue-sonner` in any component.
2. Call `toast.success('Saved')`, `toast.error('Failed')`, etc.
3. `<Toaster />` is already mounted in `app/app.vue`.

## Add a test

1. Component/unit tests: `tests/components/<Name>.test.ts`.
2. API/e2e tests: `tests/api/<name>.test.ts`.
3. Run with `pnpm test` or `pnpm test:watch`.
