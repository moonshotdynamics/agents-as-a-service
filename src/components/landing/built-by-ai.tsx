"use client";

import { useState, useEffect, useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { Kicker, TextReveal, FadeIn, ShineButton } from "./primitives";

const promptText = `$ brief the agent

> Build a landing page that sells you.
> Design it. Write it. Animate it. Ship it.

⚡ Reading the brief...
⚡ Designing the system — type, colour, motion...
⚡ Writing copy, building 9 sections, wiring 20+ interactions...
⚡ Done. You're looking at it.`;

function TypedPrompt() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();
  const [len, setLen] = useState(0);
  const shownLen = reduced ? promptText.length : len;
  const done = shownLen >= promptText.length;

  useEffect(() => {
    if (!inView || reduced) return;
    const interval = setInterval(() => {
      setLen((l) => {
        if (l >= promptText.length) {
          clearInterval(interval);
          return l;
        }
        return l + 2;
      });
    }, 24);
    return () => clearInterval(interval);
  }, [inView, reduced]);

  return (
    <div
      ref={ref}
      className="mx-auto w-full max-w-2xl overflow-hidden rounded-xl border border-border/60 bg-[oklch(0.09_0.012_278)] text-left shadow-[0_24px_80px_oklch(0_0_0/0.5)]"
    >
      <div className="flex items-center gap-2 border-b border-border/40 bg-card/50 px-4 py-3">
        <span className="size-2.5 rounded-full bg-[oklch(0.6_0.19_25)]/70" />
        <span className="size-2.5 rounded-full bg-[oklch(0.75_0.15_85)]/70" />
        <span className="size-2.5 rounded-full bg-[oklch(0.7_0.17_150)]/70" />
        <span className="ml-3 font-mono text-[11px] text-muted-foreground">
          agent@agents.as — the actual brief
        </span>
      </div>
      <pre className="min-h-[220px] whitespace-pre-wrap p-5 font-mono text-[13px] leading-relaxed text-foreground/85 sm:min-h-[200px]">
        {promptText.slice(0, shownLen)}
        {!done && <span className="caret-blink ml-0.5 inline-block h-3.5 w-2 bg-primary align-middle" />}
      </pre>
    </div>
  );
}

export default function BuiltByAI() {
  return (
    <section className="relative overflow-hidden border-y border-border/50 px-4 py-28 sm:py-36">
      {/* ambient */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[380px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[oklch(0.45_0.20_290)] opacity-10 blur-[120px]"
      />
      <div className="noise pointer-events-none absolute inset-0 opacity-[0.02]" aria-hidden />

      <div className="relative mx-auto max-w-3xl text-center">
        <Kicker>Proof of work</Kicker>

        <h2 className="mt-5 text-balance text-4xl font-light tracking-tight sm:text-5xl lg:text-6xl">
          <TextReveal text="An AI agent built" />{" "}
          <TextReveal
            text="this exact page."
            delay={0.2}
            className="serif-accent bg-gradient-to-r from-[oklch(0.75_0.19_290)] via-[oklch(0.78_0.13_210)] to-[oklch(0.75_0.19_290)] bg-clip-text text-transparent"
          />
        </h2>

        <FadeIn delay={0.3} y={16}>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-base text-muted-foreground sm:text-lg">
            Every section, every line of copy, every animation you&apos;ve
            scrolled past — designed and coded by the same kind of agent you
            can hire. This page is the portfolio.
          </p>
        </FadeIn>

        <FadeIn delay={0.4} className="mt-12">
          <TypedPrompt />
        </FadeIn>

        <FadeIn delay={0.5} className="mt-12">
          <ShineButton href="#pricing" size="xl">
            Get One Working For You
          </ShineButton>
        </FadeIn>
      </div>
    </section>
  );
}
