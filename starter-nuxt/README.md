# starter-nuxt

Nuxt 4 starter for indie products deployed with **SSR on Cloudflare Pages**.

## Structure

```text
app/
  app.config.ts              # product name, links, UI theme
  app.vue                    # root shell only
  assets/css/main.css        # Tailwind / Nuxt UI theme
  components/
    app/                     # layout-level UI: header, footer, app shell
    marketing/               # landing-page sections
  composables/               # shared client/server-safe composables
  layouts/                   # Nuxt UI layouts: default marketing, dashboard app shell
  pages/                     # public routes and app routes
    dashboard/               # product app area placeholder
server/
  api/                       # Nitro API routes for Cloudflare Pages Functions
  utils/                     # server-only helpers
public/                      # static assets
```

## Stack

- Nuxt 4
- Nuxt UI
- Tailwind CSS v4
- Pinia
- Nuxt SEO / Image / Scripts / i18n
- Cloudflare Pages SSR via Nitro `cloudflare_pages` preset

## Setup

```bash
pnpm install
cp .dev.vars.example .dev.vars
```

## Development

```bash
pnpm dev
```

## Build for Cloudflare Pages

```bash
pnpm build
```

Nuxt builds with the Cloudflare Pages SSR preset and writes the deployable output to `dist/`.

## Preview Cloudflare Pages locally

```bash
pnpm preview:pages
```

## Deploy to Cloudflare Pages

```bash
pnpm deploy:pages
```

For Cloudflare dashboard deployments, use:

- Build command: `pnpm build`
- Build output directory: `dist`
- Environment variables: copy values from `.dev.vars.example`

## What to add per product

- Auth: add only when the dashboard stores private user data.
- Database: use D1/Drizzle or NuxtHub when persistence is needed.
- Storage: add R2 only for user uploads.
- Bot protection: add Turnstile when forms go public.
- Payments: add Stripe/Lemon Squeezy only when pricing is real.

## Layouts

- `default`: public marketing layout with header, footer, and landing pages.
- `dashboard`: app/product layout with Nuxt UI dashboard sidebar, navbar, and content panel.

Use `definePageMeta({ layout: "dashboard" })` for authenticated product pages.

The starter intentionally skips blog/CMS, auth, database, and payments by default.

## Agent development

This starter is prepared for Codex/agent-driven development. Start with:

- `AGENTS.md` for coding rules and validation
- `docs/decisions.md` for architecture decisions
- `docs/playbook.md` for common feature workflows

Use `pnpm verify` before handing off non-trivial changes.

## Responsive layout

- Public pages use the `default` layout with desktop navigation and a mobile dropdown menu.
- Product pages use the `dashboard` layout with a responsive Nuxt UI sidebar toggle and padded content panel.
- Prefer Tailwind responsive utilities (`sm:`, `md:`, `lg:`, `xl:`) before custom media queries.
