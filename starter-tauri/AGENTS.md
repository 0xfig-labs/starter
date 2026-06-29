# AGENTS.md — starter-tauri project guide

This repository is a reusable Tauri desktop app template. Keep it small, boring, and easy to fork.

## Core stack

- Tauri 2 + Rust
- React 19 + TypeScript
- React Router browser routing, not hash routing
- Vite+ as the web toolchain
- Nub as the Node package/tool runner
- Tailwind CSS 4
- Base UI / shadcn-style local UI primitives
- Sonner for global toast
- next-themes for theme switching
- Zustand for client-side state management
- i18next + react-i18next for i18n
- SQLite via Rust `libsql`, stored under the Tauri app data directory
- Vitest for minimal unit tests

## Package/tool rules

- Use `nub` for Node package management and script execution.
- Use `nubx shadcn ...` for shadcn commands. Do **not** install or invoke a global shadcn CLI.
- Keep CLI-only tools such as `shadcn` in `devDependencies`.
- Do not use `npm`, `pnpm`, `yarn`, `bun`, or `npx` unless there is no viable Nub path.
- This template intentionally keeps `package-lock.json`; Nub uses the incumbent lockfile format.
- Avoid new dependencies unless the template clearly benefits from them. Prefer existing React/Tauri/platform APIs.

Common commands:

```bash
nub install
nub run dev
nub run tauri:dev
nub run check
nub run test
nub run build
nub run tauri:build
```

Rust validation:

```bash
cd src-tauri && cargo check
```

Before claiming done after code changes, run the narrowest relevant checks. For broad template changes, run:

```bash
nub run check
nub run test
nub run build
cd src-tauri && cargo check
```

Delete generated `dist/` after local builds so the template stays clean.

## Project shape

```text
src/
  app/              app bootstrap, config, providers, router, route/nav metadata
  assets/           bundled assets imported by code
  components/app/   reusable app-level components
  components/ui/    shadcn/Base UI primitives; keep generated style intact
  features/         feature modules grouped by api/model/ui
  layouts/          route layouts and shell UI
  lib/              compatibility helpers used by shadcn, especially utils.ts
  pages/            thin route entry files
  shared/           cross-feature APIs, hooks, stores, i18n
  styles/           global CSS and design tokens
src-tauri/
  src/              Rust commands, app database, Tauri setup
```

## Frontend conventions

### App config

- App branding lives in `src/app/config.tsx`.
- Keep `src/app/config.tsx`, `package.json`, `src-tauri/Cargo.toml`, and `src-tauri/tauri.conf.json` naming aligned when turning the template into a real app.
- Logo is configurable through `appConfig.logo.icon`. Prefer a React node; importing from `src/assets/` is fine.
- User/profile UI is not global config. Use `src/components/app/user.tsx` and pass user data from the layout or real auth state.

### Routing and navigation

- Use React Router browser routes only.
- Route, page title, and sidebar navigation metadata live in `src/app/navigation.tsx`.
- `src/app/router.tsx` derives routes from `appRoutes`.
- `src/layouts/default/default-layout.tsx` should derive breadcrumb/page title keys from `src/app/navigation.tsx`, not keep a second route map.
- `src/layouts/default/default-layout.tsx` owns the default shell and renders pages through `<Outlet />`.
- `src/pages/<route>/index.tsx` should be a thin route entry. Put real feature code under `src/features/<feature>/`.
- Add a route by updating `src/app/navigation.tsx` and adding the page file.

### Components

- Use `src/components/ui/` for shadcn/Base UI primitives. Avoid hand-editing generated components unless fixing a real issue or adapting project aliases.
- Use `src/components/app/` for template-level reusable components:
  - `PageHeader`
  - `LoadingState`
  - `EmptyState`
  - `ErrorState`
  - `ThemeToggle`
  - `User`
- Do not put business-specific widgets into `components/app`; place them under `features/<name>/ui`.

### shadcn

- Add shadcn components with `nubx shadcn add <component>`.
- If shadcn tries to install dependencies with npm and fails, install the dependency with `nub add ...` or `nub add -D ...`, then rerun `nubx shadcn add <component>`.
- Keep `components.json` aliases in sync with the source tree:
  - components: `@/components`
  - ui: `@/components/ui`
  - hooks: `@/shared/hooks`
  - css: `src/styles/globals.css`

### Theme

- Theme is provided by `next-themes` through `src/components/app/theme-provider.tsx`.
- Global provider is mounted in `src/app/providers.tsx`.
- Use `ThemeToggle` for the shadcn-style icon button. It supports light, dark, and system.
- `index.html` contains a tiny pre-hydration script to avoid dark-mode flash. Keep its storage key aligned with the theme provider.

### Toast

- Global Sonner `Toaster` is mounted in `src/app/providers.tsx`.
- Import `toast` directly from `sonner` in feature/page code when needed.
- The shadcn-added wrapper lives in `src/components/ui/sonner.tsx`.

### i18n

- i18n setup lives in `src/shared/i18n/`.
- Locale files live in `src/shared/i18n/locales/`.
- Use `useTranslation` from `src/shared/i18n/hooks.ts`, not directly from `react-i18next`, so future typing/config changes stay centralized.
- Add every user-facing string to all locale JSON files in the same change.
- Navigation entries have `translationKey` in `src/app/navigation.tsx`; sidebar/layout should render translated labels.
- Use `LanguageSwitcher` or `LanguageMenu` from `src/components/app/language-switcher.tsx` instead of duplicating language-switching UI.

### Data and feature code

- Feature code goes under `src/features/<name>/`:
  - `api/` typed frontend API wrappers
  - `model/` types and hooks
  - `ui/` feature UI
- Keep async UI states explicit: loading, submitting, empty, error.
- Prefer a feature-local hook for data fetching, like `src/features/notes/model/use-notes.ts`.
- Zustand stores live in `src/shared/stores/`.

### Assets and styles

- `src/styles/globals.css` is the Tailwind/shadcn global entrypoint.
- `src/assets/` is for assets imported by TypeScript/React code.
- `public/assets/` is for static files served as-is from `/assets/...`.
- Keep component-specific styling in component class names unless global tokens/reset are required.

### Tests

- Keep tests small and targeted.
- Existing example: `src/app/navigation.test.ts` checks route/nav metadata stays in sync.
- Add tests for shared pure logic or template conventions; do not add heavy UI testing scaffolding unless requested.

## Tauri/Rust conventions

- Rust app setup lives in `src-tauri/src/lib.rs`.
- SQLite initialization lives in `src-tauri/src/db.rs`.
- Example note commands live in `src-tauri/src/notes.rs`.
- Frontend Tauri invocation wrapper lives in `src/shared/api/tauri.ts`.
- Feature-specific command wrappers should live under `src/features/<feature>/api/`.
- Validate inputs at the Rust command boundary.
- Prefer SQL statements that return the affected row directly, such as SQLite `RETURNING`, over follow-up lookups like `last_insert_rowid()`.
- Keep Tauri plugins and `src-tauri/capabilities/default.json` permissions aligned. If you register a plugin, add only the matching minimal permissions.
- Only `core:default` and `opener:default` are granted by default. File system, shell, store, dialog, window-state, and updater are intentionally not registered/granted by default.
- SQLite files should be created under the Tauri app data directory, not in the repo.

## Template hygiene

- Do not commit generated output: `dist/`, `src-tauri/target/`, agent scratch dirs, local app data, or logs.
- Remove starter/demo code only when replacing it with an equally small reusable pattern.
- Prefer deleting template noise over adding framework layers.
- Keep README and AGENTS.md updated when changing conventions.
- Keep `components.json`, `tsconfig.json` aliases, and actual directories in sync.
- Keep `src/lib/utils.ts` because shadcn components import `@/lib/utils`.

## Vite+ notes

This project uses Vite+, a unified toolchain built on top of Vite, Rolldown, Vitest, tsdown, Oxlint, Oxfmt, and Vite Task. Vite+ is invoked through scripts such as `nub run dev`, `nub run build`, `nub run check`, and `nub run fix`.

Docs are local at `node_modules/vite-plus/docs` or online at https://viteplus.dev/guide/.

If setup, runtime, or package-manager behavior looks wrong, run:

```bash
vp env doctor
```

and include the output in the handoff.
