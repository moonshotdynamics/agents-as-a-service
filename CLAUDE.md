@AGENTS.md

# Design compliance (read before any UI change)

The visual identity of this site is a deliberate, documented system — not a
starting point to riff on. Before creating or modifying any page, section,
or component:

1. **Read `DESIGN.md` in full.** It is the single source of truth for
   color, typography, layout, motion, voice, and the component inventory.
2. **Build with the existing primitives** from
   `src/components/landing/primitives.tsx` — `TextReveal`, `FadeIn`,
   `CountUp`, `Magnetic`, `SpotlightCard`, `Kicker`, `SectionHeading`,
   `ShineButton`, `GhostButton` — and the shared easing `EASE`. Do not
   hand-roll parallel versions of these.
3. **Match the recipe, not just the vibe.** New surfaces must use the oklch
   tokens from `globals.css`, the three-font system (Geist / Geist Mono /
   Instrument Serif accents via `.serif-accent`), `rounded-2xl` translucent
   cards, mono uppercase kickers, and scroll-triggered entrances with
   `viewport={{ once: true }}`.
4. **Accessibility is part of the design:** every animated path needs a
   `useReducedMotion()` fallback (or membership in the CSS
   `prefers-reduced-motion` block), decorative layers are `aria-hidden`,
   and heading text must remain real, space-separated text nodes.
5. **Prove it visually.** After UI changes, run `npm run build` and
   `npm run lint` (zero errors), then load the affected pages and look at
   them (Playwright screenshots at 1440px and 390px) before calling the
   work done.
6. **If you extend the system** (new token, primitive, or pattern), update
   `DESIGN.md` in the same change so the next agent inherits it.

Read `DESIGN.md` §8 ("Hard-won gotchas") before writing animation or
effect code — the bugs listed there have already been made and fixed once.
