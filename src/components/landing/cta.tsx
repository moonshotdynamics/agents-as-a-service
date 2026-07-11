"use client";

import { Kicker, TextReveal, FadeIn, ShineButton, GhostButton } from "./primitives";

export default function Cta() {
  return (
    <section className="relative overflow-hidden px-4 py-32 sm:py-44">
      {/* ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 bottom-0 h-[420px] w-[820px] -translate-x-1/2 translate-y-1/3 rounded-full bg-[oklch(0.45_0.20_290)] opacity-15 blur-[130px]"
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage:
            "radial-gradient(circle, oklch(0.75 0.10 285) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 60%, black 20%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-3xl text-center">
        <Kicker>Your move</Kicker>
        <h2 className="mt-6 text-balance text-5xl font-light leading-[1.02] tracking-[-0.03em] sm:text-6xl lg:text-7xl">
          <TextReveal text="You run the business." />
          <br />
          <TextReveal text="The agent runs" delay={0.25} />{" "}
          <TextReveal
            text="the busywork."
            delay={0.4}
            className="serif-accent bg-gradient-to-r from-[oklch(0.78_0.18_290)] via-[oklch(0.82_0.12_210)] to-[oklch(0.76_0.19_320)] bg-clip-text text-transparent"
          />
        </h2>
        <FadeIn delay={0.5} y={16}>
          <p className="mx-auto mt-6 max-w-lg text-pretty text-base text-muted-foreground sm:text-lg">
            Fourteen days free. Live in 48 hours. Cancel with one click if it
            doesn&apos;t earn its keep.
          </p>
        </FadeIn>
        <FadeIn delay={0.6} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <ShineButton size="xl">Start Free Trial</ShineButton>
          <GhostButton size="xl">Talk to Sales</GhostButton>
        </FadeIn>
      </div>
    </section>
  );
}
