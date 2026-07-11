"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { SectionHeading, FadeIn } from "./primitives";

const steps = [
  {
    n: "01",
    title: "Brief us like you'd brief a new hire",
    body: "Pick your industry, describe the workflow, point at the busywork. Fifteen minutes, no technical anything.",
    detail: "intake · 15 min",
  },
  {
    n: "02",
    title: "We configure and train your agent",
    body: "Your tone of voice, your templates, your tools — email, Slack, WhatsApp, your CRM. We wire it all in and stress-test it.",
    detail: "setup · 48 hours",
  },
  {
    n: "03",
    title: "Delegate, monitor, scale",
    body: "Hand off the repetitive work and watch it happen in your dashboard. Tweak behaviour anytime. Add capacity when you grow.",
    detail: "live · ongoing",
  },
];

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 55%"],
  });
  const line = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <section id="process" className="relative scroll-mt-24 border-y border-border/50 bg-card/20 px-4 py-28 sm:py-36">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          kicker="Process"
          title="Live in"
          accent="48 hours,"
          titleAfter="not 48 days."
          sub="No engineering team. No six-month rollout. We do the heavy lifting; you do the delegating."
        />

        <div ref={ref} className="relative mx-auto mt-20 max-w-2xl">
          {/* rail */}
          <div className="absolute left-[22px] top-2 bottom-2 w-px bg-border/60 sm:left-[27px]" aria-hidden />
          <motion.div
            className="absolute left-[22px] top-2 bottom-2 w-px origin-top bg-gradient-to-b from-primary via-[oklch(0.78_0.13_210)] to-primary sm:left-[27px]"
            style={{ scaleY: line }}
            aria-hidden
          />

          <div className="space-y-14">
            {steps.map((s, i) => (
              <FadeIn key={s.n} delay={0.1 * i} className="relative flex gap-6 sm:gap-8">
                {/* node */}
                <div className="relative z-10 flex size-11 shrink-0 items-center justify-center rounded-full border border-border/70 bg-background font-mono text-xs text-primary shadow-[0_0_20px_oklch(0.62_0.23_290/0.25)] sm:size-14 sm:text-sm">
                  {s.n}
                </div>
                <div className="pt-1 sm:pt-2.5">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-lg font-medium tracking-tight text-foreground sm:text-xl">
                      {s.title}
                    </h3>
                    <span className="rounded-full border border-border/60 bg-card/60 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                      {s.detail}
                    </span>
                  </div>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                    {s.body}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
