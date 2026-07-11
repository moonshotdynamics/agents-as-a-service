# Agents.as — Agents as a Service

A dark, motion-rich marketing site for a fictional **AI-agent-as-a-service**
subscription aimed at South African businesses (priced in rands). The site
is self-referential by design: it was designed, written, and coded by an AI
agent, and its "Proof of work" section says exactly that — the page is the
portfolio.

> **Demo project.** There is no backend. The dashboard login is fake
> (any email + a 3+ character password), and every metric on the site and
> dashboard is illustrative demo data.

## What's inside

- **Landing page (`/`)** — full-viewport hero with aurora background and
  word-by-word headline reveal, live task marquee, industry bento grid with
  animated micro-visuals, an interactive terminal demo with per-industry
  scripts, scroll-driven process timeline, pricing with an animated border
  beam, a self-typing "the actual brief" terminal, FAQ accordion, and a
  giant-wordmark footer.
- **Demo dashboard (`/dashboard`)** — fake login, then a per-industry
  analytics view (KPIs, grouped bar chart, task queue, client table, live
  activity feed) across six industries.
- **Legal pages (`/privacy`, `/terms`)** — short, human-readable, styled to
  the same system.

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, static prerender) + React 19 + TypeScript |
| Styling | Tailwind CSS 4 (CSS-first `@theme`, oklch tokens, no config file) |
| Motion | Framer Motion 12 + a small set of CSS keyframe loops |
| Fonts | Geist, Geist Mono, Instrument Serif via `next/font/google` |
| UI base | @base-ui/react + shadcn-style components |

No external runtime dependencies — no CDN scripts, no embeds; everything
renders from this repo.

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build (all routes prerender)
npm run lint    # must pass with 0 errors
npm start       # serve the production build
```

## Documentation

- **`DESIGN.md`** — the design system: tokens, type, motion rules,
  component inventory, and the gotchas already paid for.
- **`AGENTS.md`** — working guide for AI agents and contributors: stack,
  commands, structure, conventions, and non-negotiables.
- **`CLAUDE.md`** — design-compliance directives for AI coding assistants.

## SEO & GEO

The site ships a full search/answer-engine layer: per-route metadata with
canonical URLs and a title template, a generated Open Graph / Twitter card,
a connected JSON-LD graph (Organization, WebSite, Service with real ZAR
offers, FAQPage, breadcrumbs), `robots.txt` with explicit allowances for AI
crawlers, `sitemap.xml`, a web manifest, and `public/llms.txt` for
generative engines. The canonical domain is configured once in
`src/lib/site.ts` (override with `NEXT_PUBLIC_SITE_URL`). The demo
dashboard is deliberately `noindex`.

## Accessibility

The whole motion system respects `prefers-reduced-motion` (Framer paths
check `useReducedMotion()`; CSS loops are disabled in a media query),
decorative layers are `aria-hidden`, and animated headings keep real,
space-separated text nodes for screen readers and SEO.
