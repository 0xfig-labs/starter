# Decisions

## Cloudflare Pages SSR

Use Nitro `cloudflare_pages` and deploy the generated `dist` directory. This keeps the starter aligned with Cloudflare Pages Functions instead of generic Workers deployment.

## Indie product, not blog

The starter targets landing pages, pricing pages, dashboards, and small API products. Blog/CMS support is intentionally not included by default.

## Two layouts

- `default`: public marketing layout with header, footer, and regular content area.
- `dashboard`: product app shell using Nuxt UI dashboard sidebar and navbar.

## No auth by default

Dashboard pages are placeholders. Add auth only when pages contain private user data.

## No database by default

Use Cloudflare D1/Drizzle or NuxtHub only when persistence is required. Do not add ORM setup for static/product-shell work.

## No payments by default

Add Stripe, Lemon Squeezy, Paddle, or webhooks only when pricing and checkout are part of the requested feature.

## Dynamic OG image disabled

`@nuxtjs/seo` is kept, but dynamic OG image generation is disabled until a renderer dependency is intentionally selected.
