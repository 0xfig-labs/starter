# Contributing

Thanks for contributing to the TanStack Start starter.

## Prerequisites

- [Bun](https://bun.sh) (package manager)
- [Wrangler](https://developers.cloudflare.com/workers/wrangler/) (deploy only)

## Local Setup

```bash
# Clone and install
git clone <repo-url>
cd starter-tanstack
bun install

# Start dev server
bun run dev        # http://localhost:3000

# Run tests
bun run test

# Lint and format
bun run check
```

### Environment

Copy `.env.local.example` to `.env.local` if needed. The default `DATABASE_URL` points to a local SQLite file (`dev.db`).

## Project Structure

```
src/
  routes/        # File-based routes
  components/    # React components (ui/, Header, Footer, etc.)
  db/            # Drizzle ORM schema and client
  hooks/         # TanStack Form field helpers
  integrations/  # TanStack Query setup
  shared/i18n/   # Internationalization (en-US, zh-CN)
  lib/           # Utility functions (cn)
```

## Branch Naming

Use conventional branch naming:

```
feature/short-description
bugfix/short-description
chore/short-description
release/version
```

## Commit Messages

Use conventional commits:

```
feat: add user dashboard
fix: resolve locale switch flash
chore: update dependencies
docs: add contributing guide
```

Keep commits atomic — one logical change per commit.

## PR Workflow

1. Create a branch from `main`
2. Make your changes
3. Run `bun run check` to lint and format
4. Run `bun run test` to verify tests pass
5. Open a PR against `main`
6. Add a clear description of what changed and why

### PR Checklist

- [ ] Code follows existing patterns
- [ ] Lint and format pass (`bun run check`)
- [ ] Tests pass (`bun run test`)
- [ ] New routes registered via `createFileRoute`
- [ ] Translation keys added to both `en-US.json` and `zh-CN.json` (if user-facing text)
- [ ] No new dependencies unless necessary

## Code Standards

- TypeScript strict mode — avoid `any`
- Use `#/` path aliases for imports
- Use `cn()` utility for conditional class merging
- Server logic goes in `createServerFn`, not client components
- Prefer route loaders over client-side fetching for initial data
- Add translation keys to both locale files for user-facing strings

## Regenerating Routes

After adding, removing, or renaming route files, run:

```bash
bun run generate-routes
```

This updates `src/routeTree.gen.ts`. The watcher in dev mode does this automatically.

## Database Changes

1. Edit `src/db/schema.ts`
2. Run `bun run db:generate` to create migration files
3. Run `bun run db:migrate` to apply them
4. Commit both the schema change and migration files
