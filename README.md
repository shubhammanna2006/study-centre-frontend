# Study Centre — Next.js (App Router)

Converted from a TanStack Start project to Next.js 15 (App Router, React 19).

## Setup

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## What changed from the original TanStack Start app

- **Routing**: `src/routes/*.tsx` (TanStack file routes) → `app/**/page.tsx` (Next file routes).
  `courses.$slug.tsx` → `app/courses/[slug]/page.tsx`.
- **Root layout**: `src/routes/__root.tsx` → `app/layout.tsx`, using Next's `metadata` export
  for `<title>`/OG tags instead of TanStack's `head()` config.
- **Links**: `<Link to="...">` from `@tanstack/react-router` → `<Link href="...">` from `next/link`.
- **Active route detection**: `useRouterState` → `usePathname()` from `next/navigation` (`Header.tsx`).
- **Loaders / dynamic params**: the course detail page's TanStack `loader` became a Next
  `generateMetadata` + async server component reading `params`. `notFound()` now comes from
  `next/navigation`. Added `generateStaticParams` so all course pages can be statically generated.
- **404 / error boundaries**: TanStack's `notFoundComponent`/`errorComponent` → Next's
  `not-found.tsx` / `error.tsx` convention (a global one, plus a route-specific
  `app/courses/[slug]/not-found.tsx` for "Course not found").
- **Client vs. server components**: pages/components using `useState`, `onClick`, or browser
  APIs are marked `"use client"` (courses list, course detail's brochure button, login,
  register, admin, student, verify, contact, gallery, Header, Counter). Pages with no
  interactivity (home, faculty, achievements) stay as server components. All shadcn/ui
  primitives in `components/ui/*` are marked `"use client"` since they're interactive leaf
  components.
- **Metadata on client pages**: since a client component (`page.tsx`) can't export
  `metadata`, routes that needed both interactivity and per-page `<title>`/description got a
  small sibling `layout.tsx` that exports `metadata` and just passes `children` through.
- **Images**: the two imported assets (`hero-classroom.jpg`, `pattern-tech.jpg`) moved to
  `public/assets/` and are referenced by string path instead of Vite's module-import URL.
  They're still plain `<img>` tags — swap to `next/image` later if you want built-in
  optimization/lazy-loading.
- **Removed / no longer needed**: `src/router.tsx`, `src/start.ts`, `src/server.ts`,
  `src/routeTree.gen.ts`, `vite.config.ts`, and the Lovable-specific SSR error-reporting
  helpers (`lib/error-capture.ts`, `lib/error-page.ts`, `lib/lovable-error-reporting.ts`) —
  Next.js has its own server, build pipeline, and `error.tsx` mechanism, so these aren't
  needed.
- **Dependencies dropped**: `@tanstack/*`, `vite*`, `axios`, `@reduxjs/toolkit` and
  `react-redux` (Redux was in `package.json` but never actually used anywhere in the
  source), `nitro`, and the Lovable Vite config package. Added `next` and
  `eslint-config-next`.
- **Tailwind v4**: same CSS-first config (`app/globals.css`), just swapped the Vite
  `@tailwindcss/vite` plugin for `@tailwindcss/postcss` (see `postcss.config.mjs`) and
  removed the Vite-specific `source(none)` / `@source` directives — Tailwind v4 auto-detects
  content in a Next.js project.

## Notes

- All data is still the static/mock data from `lib/data.ts` — nothing here talks to a real
  backend yet (forms show a mock success toast, login/registration don't call an API). The
  original code had `// TODO(backend)` comments; those are preserved.
- I wasn't able to run `npm install`/`npm run build` in this sandbox (no network access), so
  please run a build locally to confirm before deploying. I did check that every file has
  balanced braces/parens and that every `@/...` import resolves to a real file, but that's not
  a substitute for `tsc`/`next build` actually compiling it.
