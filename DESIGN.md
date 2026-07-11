# Agents.as — Design System

This document is the source of truth for how this product looks, moves, and
reads. Any new page, section, or component must follow it. If you deviate,
update this file in the same change.

## 1. Design philosophy

**Dark editorial with electric restraint.** Near-black violet-tinted
backgrounds, huge light-weight display type, one signature accent move (the
gradient serif italic), and motion that rewards scrolling without ever
blocking reading. The page itself is the product demo — it must feel like it
was crafted by the same agent it sells.

Rules of thumb:

- One serif-italic gradient accent phrase per heading, never two.
- Glow is seasoning, not sauce: ambient blurs stay at opacity ≤ 0.25,
  shadows use the violet at ≤ 0.55 alpha.
- Copy is confident, concrete, and short. Prefer "Live in 48 hours" over
  "Rapid deployment timelines."
- Every decorative layer is `aria-hidden` and `pointer-events-none`.

## 2. Color

All colors are **oklch**, defined as CSS custom properties in
`src/app/globals.css` (`:root`). Never hardcode hex values; use the tokens or
inline `oklch()` matching these recipes.

| Token | Value | Use |
|---|---|---|
| `--background` | `oklch(0.11 0.014 278)` | page background |
| `--card` | `oklch(0.145 0.016 278)` | panels (usually at `/40`–`/80` alpha) |
| `--primary` | `oklch(0.66 0.21 287)` | electric violet — CTAs, active states |
| `--border` | `oklch(0.24 0.02 278)` | hairlines (usually at `/50`–`/70`) |
| `--muted-foreground` | `oklch(0.66 0.02 275)` | secondary text |
| `--glow-violet` | `oklch(0.62 0.23 290)` | ambient glows, beam gradients |
| `--glow-cyan` | `oklch(0.78 0.13 210)` | gradient second stop |
| `--glow-magenta` | `oklch(0.66 0.22 330)` | gradient third stop (sparingly) |

**Signature gradient** (for accent text):
`from-[oklch(0.75_0.19_290)] via-[oklch(0.78_0.13_210)] to-[oklch(0.75_0.19_290)]`
with `bg-clip-text text-transparent`.

**Semantic colors:** success = `emerald-400`, warning = `amber-400`,
destructive = `--destructive`. The dashboard assigns one Tailwind accent per
industry (emerald/amber/pink/cyan/red/orange) via its `colourMap`.

Deep surfaces (terminal windows, demo shells): `oklch(0.09 0.012 278)`.

## 3. Typography

Three fonts, loaded via `next/font/google` in `src/app/layout.tsx`:

| Font | Variable | Role |
|---|---|---|
| Geist | `--font-geist-sans` | everything by default |
| Geist Mono | `--font-geist-mono` | labels, kickers, terminal, meta, numbers-as-data |
| Instrument Serif (italic) | `--font-instrument-serif` | display accents only, via `.serif-accent` |

Scale and voice:

- **Hero display:** `text-[clamp(2.75rem,9vw,7.5rem)] font-light leading-[0.98] tracking-[-0.03em]`
- **Section headings:** `text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight`
- **Panel/section labels ("kickers"):** `font-mono text-[11px] uppercase tracking-[0.25em] text-primary/90`, flanked by gradient hairlines (use the `Kicker` primitive)
- **Dashboard panel titles:** `font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground`
- **Body:** `text-sm`/`text-base leading-relaxed text-muted-foreground`
- Headlines are `font-light`. Bold weights are reserved for small UI labels;
  never bold a display heading.
- The serif accent goes on the *emotional* word(s): "Hire *the agent*.",
  "Watch it *actually* work."

## 4. Layout

- Content widths: landing sections `max-w-6xl`, narrative/FAQ/legal
  `max-w-2xl`–`max-w-3xl`, demo panels `max-w-5xl`.
- Section rhythm: `px-4 py-28 sm:py-36`. Alternate plain sections with
  `border-y border-border/50 bg-card/20` bands.
- Cards: `rounded-2xl border border-border/50 bg-card/40..60`, hover to
  `border-primary/30`. Radius is 16px+ for cards, `rounded-full` for pills
  and buttons.
- Backgrounds are layered, in order: aurora blobs (`.aurora-1/2`, blurred
  100px+), masked dot grid (`radial-gradient` dots, 44px cell, radial mask),
  grain (`.noise` at opacity ≤ 0.025), then content.
- **Any section containing an absolutely-positioned ambient layer wider
  than the mobile viewport (glows, auroras) must have `overflow-hidden`** —
  otherwise it creates horizontal scroll on phones. `html` also carries
  `overflow-x: clip` as a backstop, but fix it at the section.
- Anchored sections need `scroll-mt-24` (the nav is fixed).

## 5. Motion

Framer Motion everywhere; CSS keyframes for infinite loops. The single
easing: `cubic-bezier(0.22, 1, 0.36, 1)` — exported as `EASE` from
`src/components/landing/primitives.tsx`.

Rules:

- **Entrances** trigger on scroll via `whileInView` + `viewport={{ once: true }}`.
  Durations 0.4–0.9s. Stagger children by 0.06–0.15s.
- **Headings** animate word-by-word with `TextReveal` (blur 8px → 0, rise
  0.6em, per-word 0.06s stagger).
- **Numbers** count up with `CountUp` when scrolled into view.
- **Hover:** cards glow via `SpotlightCard` (cursor-tracked radial); CTAs use
  `Magnetic` (strength ~0.2) plus the `.btn-shine` sweep; arrows nudge
  `translate-x-0.5`.
- **Infinite loops** live in `globals.css`: `.animate-marquee`,
  `.border-beam`, `.aurora-1/2`, `.caret-blink`, `.status-ping`,
  `.scroll-hint-dot`. Add new loops there, and add them to the
  `prefers-reduced-motion` block.
- **Reduced motion is not optional.** Components check `useReducedMotion()`
  and fall back to opacity-only; every CSS loop is disabled in the
  `@media (prefers-reduced-motion: reduce)` block.

## 6. Component inventory

Reusable primitives — `src/components/landing/primitives.tsx`:

| Primitive | What it does |
|---|---|
| `TextReveal` | word-by-word blur/rise heading reveal; className applies **per word** (required for gradient text — see gotcha below) |
| `FadeIn` | standard section entrance (y 28, once) |
| `CountUp` | animated number, `en-ZA` formatted, prefix/suffix |
| `Magnetic` | cursor-follow spring wrapper for CTAs |
| `SpotlightCard` | card with cursor-tracked radial glow + border glow |
| `Kicker` / `SectionHeading` | section label + display heading with serif accent slot |
| `ShineButton` / `GhostButton` | primary (violet glow pill) and secondary (glass pill) CTAs |

Sections — `src/components/landing/`: `nav` (fixed pill nav + scroll
progress, exports `Wordmark`), `hero`, `marquee`, `bento`, `process`,
`pricing`, `built-by-ai`, `faq` (+ `faq-data.ts`), `cta`, `footer`,
`legal` (shared shell for /privacy and /terms).

The interactive demo is `src/components/sandbox.tsx`; the authenticated demo
dashboard is `src/app/dashboard/`.

## 7. Voice and copy

- Direct second person, plain verbs, no filler adjectives.
- Headline pattern: short declarative + serif accent twist.
- Kickers are one or two words: "Capabilities", "Proof of work", "Your move".
- South African context is a feature: rand pricing, local place names in
  demo data, `en-ZA` number formatting (space thousands separator).
- The self-referential angle ("an AI agent built this page") is the core
  conversion argument — keep it honest and concrete.

## 8. Hard-won gotchas (do not relearn these)

1. **`background-clip: text` breaks through animated children.** A gradient
   on a parent whose children have transforms/filters renders invisible
   text in Chromium. Apply gradient classes to each word span (what
   `TextReveal` does), not the wrapper.
2. **Never wrap inter-word spaces inside `inline-block` spans** — trailing
   whitespace gets trimmed and words fuse. Keep spaces as sibling text
   nodes.
3. **Don't import values from `"use client"` modules into server
   components** — you get a client reference, not the value (that's why
   `faq-data.ts` exists separately from `faq.tsx`).
4. **No sync `setState` in effect bodies** — the repo lints
   `react-hooks/set-state-in-effect` as an error. Derive values instead, or
   set state inside interval/animation callbacks.
5. **No external runtime dependencies on the page** — no CDN scripts, no
   unpkg embeds. Everything renders from this repo.
