<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Agents.as — Agent Guide

Instructions for AI agents (and humans) working in this repo. Read this
fully before changing code.

## What this project is

A single-product marketing site + demo dashboard for **Agents.as**, a
fictional "AI agent as a service" subscription for South African businesses
(prices in ZAR). The site is its own sales pitch: it was designed and built
by an AI agent, and the landing page says so. There is no backend — the
dashboard auth and all metrics are client-side demo data.

## Non-negotiables

1. **Follow `DESIGN.md`.** It defines the color tokens, type scale, motion
   rules, and component inventory. Read it before any UI work. If you extend
   the system, update `DESIGN.md` in the same change.
2. **Check the bundled Next.js 16 docs** (see the block at the top of this
   file) in `node_modules/next/dist/docs/` when touching framework APIs —
   they exist only after `npm install`.
3. **Reuse the primitives** in `src/components/landing/primitives.tsx`
   (`TextReveal`, `FadeIn`, `CountUp`, `Magnetic`, `SpotlightCard`,
   `Kicker`, `SectionHeading`, `ShineButton`, `GhostButton`) instead of
   re-implementing animations.
4. **Respect reduced motion.** New Framer Motion code checks
   `useReducedMotion()`; new CSS animation classes get added to the
   `prefers-reduced-motion` block in `globals.css`.
5. **No external runtime dependencies** — no CDN scripts, fonts, or embeds.
   Fonts load via `next/font/google`; everything else ships from the repo.
6. **Lint must pass with zero errors** (`npm run lint`). Note the repo
   treats `react-hooks/set-state-in-effect` as an error — see the gotchas
   in `DESIGN.md` §8 before writing effects.
7. **Keep the demo honest.** Dashboard numbers, testimonial-free copy, and
   "built by an AI agent" claims are part of the concept — don't invent
   fake customer logos, named testimonials, or unverifiable stats.

## Stack

- **Next.js 16** (App Router, Turbopack, static prerender), React 19,
  TypeScript
- **Tailwind CSS 4** (CSS-first config via `@theme` in
  `src/app/globals.css` — there is no `tailwind.config.*`)
- **Framer Motion 12** (imported from `framer-motion`)
- **@base-ui/react + shadcn-style components** in `src/components/ui/`
  (button, badge, card, etc. — mostly superseded by the landing primitives)
- Fonts: Geist, Geist Mono, Instrument Serif via `next/font/google`

## Commands

```bash
npm install     # required before anything (also materializes the Next docs)
npm run dev     # dev server on :3000
npm run build   # production build (all routes prerender statically)
npm run lint    # eslint — must pass with 0 errors
npm start       # serve the production build
```

There is no test suite. Verification = build + lint + actually loading the
pages (Playwright + a local Chromium works well for screenshots).

## Structure

```
src/
  app/
    layout.tsx          # fonts, metadata (root)
    globals.css         # design tokens (@theme + :root) and keyframes
    page.tsx            # landing page — composes landing/ sections (server)
    privacy/ terms/     # legal pages — thin wrappers around landing/legal
    dashboard/
      layout.tsx        # client AuthProvider gate (shows login if signed out)
      page.tsx          # demo analytics dashboard, per-industry data
      login/page.tsx    # fake login (any email + 3+ char password)
  components/
    landing/            # design-system primitives + one file per section
    sandbox.tsx         # interactive industry demo (terminal + dashboard)
    ui/                 # base shadcn-style components
  lib/
    auth.tsx            # fake client-side auth context
    utils.ts            # cn()
```

Conventions:

- Landing sections are client components composed by a server `page.tsx`.
  Data needed by both server and client lives in plain `.ts` modules
  (see `faq-data.ts`) — importing from a `"use client"` file into a server
  component gives you a client reference, not the value.
- One section = one file in `src/components/landing/`.
- Section anchors need `scroll-mt-24` and a matching link in `nav.tsx`.
- Use `next/link` for internal navigation (the linter enforces it).
