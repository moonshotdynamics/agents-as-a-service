"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import {
  TextReveal,
  FadeIn,
  CountUp,
  ShineButton,
  GhostButton,
  EASE,
} from "./primitives";

const stats = [
  { value: 48, suffix: "h", label: "from sign-up to live agent" },
  { value: 24, suffix: "/7", label: "on shift, never off sick" },
  { value: 6, suffix: "+", label: "industries, fluently spoken" },
  { value: 499, prefix: "R", label: "per month, to start" },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 pt-24 pb-16"
    >
      {/* ── layered background ── */}
      <motion.div
        aria-hidden
        className="absolute inset-0"
        style={reduced ? undefined : { y: bgY }}
      >
        {/* aurora blobs */}
        <div className="aurora-1 absolute -top-[20%] left-[8%] h-[55vh] w-[55vw] rounded-full bg-[oklch(0.45_0.20_290)] opacity-25 blur-[120px]" />
        <div className="aurora-2 absolute -top-[10%] right-[5%] h-[45vh] w-[40vw] rounded-full bg-[oklch(0.50_0.13_220)] opacity-20 blur-[130px]" />
        <div className="aurora-1 absolute bottom-[0%] left-[35%] h-[35vh] w-[35vw] rounded-full bg-[oklch(0.42_0.18_320)] opacity-15 blur-[140px]" />

        {/* dot grid, masked to fade at edges */}
        <div
          className="absolute inset-0 opacity-[0.13]"
          style={{
            backgroundImage:
              "radial-gradient(circle, oklch(0.75 0.10 285) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage:
              "radial-gradient(ellipse 90% 70% at 50% 40%, black 30%, transparent 75%)",
          }}
        />
      </motion.div>

      {/* grain */}
      <div aria-hidden className="noise pointer-events-none absolute inset-0 opacity-[0.025]" />
      {/* bottom fade into page */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-background" />

      {/* ── content ── */}
      <motion.div
        className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center"
        style={reduced ? undefined : { y: contentY, opacity: fade }}
      >
        {/* status badge */}
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-border/70 bg-card/50 py-1.5 pl-2 pr-4 backdrop-blur-md"
        >
          <span className="relative flex size-2 items-center justify-center">
            <span className="status-ping relative inline-flex size-2 rounded-full bg-emerald-400 text-emerald-400" />
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Agents online · Built in South Africa
          </span>
        </motion.div>

        {/* headline */}
        <h1 className="text-balance text-[clamp(2.75rem,9vw,7.5rem)] font-light leading-[0.98] tracking-[-0.03em] text-foreground">
          <TextReveal text="Don’t hire more people." delay={0.25} />
          <br />
          <TextReveal text="Hire" delay={0.65} />{" "}
          <TextReveal
            text="the agent."
            delay={0.75}
            className="serif-accent bg-gradient-to-r from-[oklch(0.78_0.18_290)] via-[oklch(0.82_0.12_210)] to-[oklch(0.76_0.19_320)] bg-clip-text pr-2 text-transparent"
          />
        </h1>

        {/* subline */}
        <FadeIn delay={1.15} y={20}>
          <p className="mx-auto mt-7 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            A dedicated AI agent trained on your industry, your tools, and your
            tone of voice. It qualifies leads, drafts documents, answers
            clients, and files the busywork —{" "}
            <span className="text-foreground">
              while you do the work that needs you.
            </span>
          </p>
        </FadeIn>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 1.35 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <ShineButton href="#pricing" size="xl">
            Start Free Trial
          </ShineButton>
          <GhostButton href="/dashboard" size="xl">
            <span className="relative flex size-1.5">
              <span className="status-ping relative inline-flex size-1.5 rounded-full bg-primary text-primary" />
            </span>
            Watch It Work
          </GhostButton>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="mt-5 font-mono text-xs text-muted-foreground/70"
        >
          14-day free trial · No credit card · Cancel anytime
        </motion.p>

        {/* stat strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 1.7 }}
          className="mt-16 grid w-full max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border/60 bg-border/40 backdrop-blur-sm sm:grid-cols-4"
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center gap-1 bg-background/70 px-4 py-5"
            >
              <span className="text-2xl font-light tracking-tight text-foreground sm:text-3xl">
                <CountUp
                  to={s.value}
                  prefix={s.prefix ?? ""}
                  suffix={s.suffix ?? ""}
                  duration={1.8}
                />
              </span>
              <span className="text-center font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground/80">
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 1 }}
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2"
        aria-hidden
      >
        <div className="flex h-9 w-5.5 items-start justify-center rounded-full border border-border/80 p-1.5">
          <div className="scroll-hint-dot size-1.5 rounded-full bg-primary" />
        </div>
      </motion.div>
    </section>
  );
}
