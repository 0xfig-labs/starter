# starter-tauri

A small Tauri 2 + React + TypeScript template for desktop apps.

## Stack

- Tauri 2
- React 19
- Vite+ / Tailwind CSS 4
- React Router browser routing
- next-themes for theme switching
- Sonner toast
- Zustand for client-side state management
- Base UI + shadcn-style local components
- SQLite via local Rust commands
- Nub for Node package/tool execution

## Commands

```bash
nub install
nub run dev          # frontend only
nub run tauri:dev    # desktop dev
nub run check        # format/lint/type checks
nub run test         # unit tests
nub run fix          # auto-fix checks
nub run build        # frontend build
nub run tauri:build  # desktop bundle
```

## Before creating a real app

Change these first:

- `package.json#name`
- `src/app/config.tsx#appConfig`
- `src-tauri/tauri.conf.json#productName`
- `src-tauri/tauri.conf.json#identifier`
- `src-tauri/icons/*`
- `src-tauri/Cargo.toml#description` and `authors`
- window title and size in `src-tauri/tauri.conf.json`

Keep `src/app/config.tsx`, `package.json`, `src-tauri/Cargo.toml`, and `src-tauri/tauri.conf.json` naming in sync when turning this template into a real app.

## Template conventions

- `src/app/` owns app bootstrapping, providers, router, and app-wide state.
- `src/layouts/` owns route layouts and shell UI.
- `src/components/app/` owns reusable app-level components such as page headers and state views.
- `src/pages/` owns route entry files; keep page files thin.
- `src/features/` owns feature code, grouped by `api/`, `model/`, and `ui/`.
- `src/shared/` owns cross-feature APIs and hooks.
- `src/styles/` owns global CSS and design-token entrypoints.
- `src/assets/` owns bundled assets imported from code, including the example logo.
- `public/assets/` owns static assets served as-is.
- `src/components/ui/` keeps generated shadcn-style primitives.
- `src/lib/utils.ts` stays in place for shadcn imports.
- Tauri commands live under `src-tauri/src/`.
- Keep Tauri permissions minimal; add `fs`, `shell`, updater, or database permissions only when the app actually uses them.

## Tauri permissions

The default capability only enables core app APIs and opener. File system, shell, store, dialog, window-state, and updater are intentionally not registered or granted by default.

## Common changes

### Add a page

1. Add `src/pages/<route>/index.tsx`.
2. Add it to `src/app/navigation.tsx`; router, breadcrumb title, and sidebar nav derive from that config.

### Add a feature

Put feature code under `src/features/<name>/` using the existing `api/`, `model/`, and `ui/` split. Keep `src/pages/` as route entry files.

### Add a Tauri command

1. Add a Rust module under `src-tauri/src/`.
2. Register the command in `src-tauri/src/lib.rs`.
3. Add a typed wrapper in `src/shared/api/` or a feature `api/` folder.

### Enable a Tauri plugin

Add both pieces: the Rust plugin registration and the matching permission in `src-tauri/capabilities/default.json`.

## Package manager

Use `nub`. This template intentionally keeps `package-lock.json`; Nub uses the incumbent lockfile format.

Use `nubx shadcn ...` for shadcn commands; `shadcn` is a dev-only tool.

## Frontend patterns

- Use `PageHeader` for page titles and primary actions.
- Use `ThemeToggle` for the shadcn-style icon theme switcher.
- Use `toast` from `sonner`; global `Toaster` is mounted in `src/app/providers.tsx`.
- Use `LoadingState`, `EmptyState`, and `ErrorState` for common async states.
- Put reusable app components in `src/components/app/`; keep shadcn primitives in `src/components/ui/`.
- Keep data-fetching hooks near the feature, for example `src/features/notes/model/use-notes.ts`.
- Environment examples live in `.env.example`; only expose browser variables with the `VITE_` prefix.
