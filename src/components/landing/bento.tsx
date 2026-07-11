"use client";

import { motion } from "framer-motion";
import { SpotlightCard, SectionHeading, FadeIn } from "./primitives";

/* ── micro-visuals ────────────────────────── */

function ChatMock() {
  return (
    <div className="mt-6 space-y-2.5">
      {[
        { who: "lead", text: "Is the Bryanston house still available?" },
        { who: "agent", text: "It is — 3 bed, R2.9M. You're pre-qualified. Saturday 10:00 or 14:00 for a viewing?" },
        { who: "lead", text: "10:00 works." },
        { who: "agent", text: "Booked. Calendar invite + directions sent. ✓" },
      ].map((m, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.25 + i * 0.22 }}
          className={`flex ${m.who === "agent" ? "justify-end" : "justify-start"}`}
        >
          <span
            className={`max-w-[80%] rounded-xl px-3 py-1.5 text-xs leading-relaxed ${
              m.who === "agent"
                ? "rounded-br-sm bg-primary/20 text-foreground"
                : "rounded-bl-sm bg-secondary text-muted-foreground"
            }`}
          >
            {m.text}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

function DocMock() {
  const widths = ["w-3/4", "w-full", "w-5/6", "w-2/3", "w-full", "w-1/2"];
  return (
    <div className="mt-6 rounded-lg border border-border/50 bg-background/60 p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          letter_of_demand.pdf
        </span>
        <span className="rounded-full bg-emerald-400/10 px-2 py-0.5 font-mono text-[9px] text-emerald-400">
          DRAFTED
        </span>
      </div>
      <div className="space-y-2">
        {widths.map((w, i) => (
          <motion.div
            key={i}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.09 }}
            className={`h-1.5 origin-left rounded-full ${w} ${i === 3 ? "bg-primary/50" : "bg-border"}`}
          />
        ))}
      </div>
    </div>
  );
}

function SparkMock() {
  const bars = [34, 55, 42, 68, 51, 78, 62, 92];
  return (
    <div className="mt-6 flex h-24 items-end gap-1.5">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          whileInView={{ height: `${h}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
          className={`flex-1 rounded-t-sm ${i === bars.length - 1 ? "bg-gradient-to-t from-primary/60 to-[oklch(0.78_0.13_210)]" : "bg-primary/25"}`}
        />
      ))}
    </div>
  );
}

function LineMock() {
  return (
    <div className="mt-6">
      <svg viewBox="0 0 200 70" className="h-24 w-full" aria-hidden>
        <defs>
          <linearGradient id="fin-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.66 0.21 287)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="oklch(0.66 0.21 287)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d="M0 55 C 25 50, 40 58, 60 44 S 95 38, 115 30 S 155 26, 175 16 L 200 10"
          fill="none"
          stroke="oklch(0.72 0.17 287)"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: "easeOut", delay: 0.2 }}
        />
        <motion.path
          d="M0 55 C 25 50, 40 58, 60 44 S 95 38, 115 30 S 155 26, 175 16 L 200 10 V 70 H 0 Z"
          fill="url(#fin-fill)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.9 }}
        />
      </svg>
      <div className="flex items-center justify-between font-mono text-[10px] text-muted-foreground">
        <span>Portfolio return</span>
        <span className="text-emerald-400">+2.14% vs benchmark</span>
      </div>
    </div>
  );
}

function TriageMock() {
  const slots = ["Today 14:30", "Tomorrow 09:15", "Tomorrow 11:00"];
  return (
    <div className="mt-6 space-y-2">
      <div className="flex items-center gap-2 rounded-lg border border-amber-400/30 bg-amber-400/5 px-3 py-2">
        <span className="text-amber-400">⚠</span>
        <span className="text-xs text-muted-foreground">
          Fever + rash — routed to Dr Naidoo for review
        </span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {slots.map((s, i) => (
          <motion.span
            key={s}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 0.3 + i * 0.12 }}
            className={`rounded-full border px-2.5 py-1 font-mono text-[10px] ${
              i === 0
                ? "border-primary/50 bg-primary/15 text-foreground"
                : "border-border/60 text-muted-foreground"
            }`}
          >
            {s}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

function TicketMock() {
  const rows = [
    { id: "#8841", label: "Address update", state: "done" },
    { id: "#8821", label: "Return — wrong size", state: "done" },
    { id: "#8858", label: "Cart recovery ×14", state: "run" },
  ];
  return (
    <div className="mt-6 space-y-1.5">
      {rows.map((r, i) => (
        <motion.div
          key={r.id}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 + i * 0.13 }}
          className="flex items-center justify-between rounded-lg border border-border/50 bg-background/60 px-3 py-2"
        >
          <span className="font-mono text-[10px] text-muted-foreground">{r.id}</span>
          <span className="flex-1 px-3 text-xs text-foreground/80">{r.label}</span>
          {r.state === "done" ? (
            <span className="text-xs text-emerald-400">✓</span>
          ) : (
            <span className="relative flex size-1.5">
              <span className="status-ping relative inline-flex size-1.5 rounded-full bg-primary text-primary" />
            </span>
          )}
        </motion.div>
      ))}
    </div>
  );
}

/* ── data ─────────────────────────────────── */

const cells = [
  {
    title: "Real Estate",
    tag: "Lead gen",
    description:
      "Qualifies every lead the moment it lands, books viewings straight into your calendar, and drafts listings that sound like you wrote them on a good day.",
    visual: <ChatMock />,
    span: "lg:col-span-2",
  },
  {
    title: "Legal",
    tag: "Documents",
    description:
      "Demand letters, contracts, and case-law research — drafted, cited, and flagged for your review.",
    visual: <DocMock />,
    span: "",
  },
  {
    title: "Marketing",
    tag: "Content",
    description:
      "Campaign copy, A/B variants, and performance reports that tell you what to double down on.",
    visual: <SparkMock />,
    span: "",
  },
  {
    title: "Finance",
    tag: "Analysis",
    description:
      "Watches portfolios around the clock, flags anomalies before clients call, reconciles the books.",
    visual: <LineMock />,
    span: "",
  },
  {
    title: "Healthcare",
    tag: "Triage",
    description:
      "Triages patient messages responsibly, books the right consults, and preps notes for the doctor.",
    visual: <TriageMock />,
    span: "",
  },
  {
    title: "E-Commerce",
    tag: "Support",
    description:
      "Resolves tickets, processes returns, recovers abandoned carts — and spots the sizing-chart bug your returns data was hiding.",
    visual: <TicketMock />,
    span: "lg:col-span-2",
  },
];

/* ── section ──────────────────────────────── */

export default function Bento() {
  return (
    <section id="capabilities" className="relative scroll-mt-24 px-4 py-28 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          kicker="Capabilities"
          title="One agent,"
          accent="fluent"
          titleAfter="in your industry."
          sub="Not a chatbot with a script — an agent trained on your workflows, working inside the tools you already use."
        />

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cells.map((c, i) => (
            <FadeIn key={c.title} delay={0.08 * i} className={c.span}>
              <SpotlightCard className="h-full p-6 sm:p-7">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-medium tracking-tight text-foreground">
                    {c.title}
                  </h3>
                  <span className="rounded-full border border-border/60 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                    {c.tag}
                  </span>
                </div>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                  {c.description}
                </p>
                {c.visual}
              </SpotlightCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
