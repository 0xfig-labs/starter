# AGENTS.md — starter-nuxt

## Project shape

This is a Nuxt 4 starter for indie products deployed with SSR on Cloudflare Pages. It is not a blog starter.

## Stack

- Nuxt 4
- Nuxt UI
- Tailwind CSS v4
- Pinia
- Nuxt SEO / Image / Scripts / i18n
- Cloudflare Pages SSR through Nitro `cloudflare_pages`
- pnpm

## Directory rules

- Public marketing pages: `app/pages/`
- Product app pages: `app/pages/dashboard/`
- Public layout: `app/layouts/default.vue`
- Product layout: `app/layouts/dashboard.vue`
- Layout-level UI: `app/components/app/`
- Landing sections: `app/components/marketing/`
- Shared composables: `app/composables/`
- Nitro API routes: `server/api/`
- Server-only helpers: `server/utils/`

## Defaults

Do not add auth, database, payments, CMS, analytics SDKs, or Cloudflare bindings by default. Add them only when the user asks or the feature truly needs them.

Prefer Nuxt UI components before custom CSS. Prefer deleting/reusing over adding new abstractions.

## Cloudflare constraint

Keep Cloudflare Pages SSR working:

- `nuxt.config.ts` must keep Nitro preset `cloudflare_pages`
- deploy output stays `dist`
- API code must be compatible with the Cloudflare runtime

## Common tasks

- Add landing section: create `app/components/marketing/<Name>.vue`, then use it in `app/pages/index.vue`.
- Add dashboard page: create route under `app/pages/dashboard/` and use `definePageMeta({ layout: "dashboard" })`.
- Add API route: create `server/api/<name>.<method>.ts`.
- Add env vars: commit examples to `.dev.vars.example`; never commit real `.dev.vars`.

## Validation

Run the smallest useful command first. For final verification use:

```bash
pnpm verify
```

If only layout/UI changed, `pnpm build` is enough when type/lint cost is not justified.
