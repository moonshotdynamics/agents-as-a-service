"use client";

const tasks = [
  { icon: "◆", text: "Qualified buyer lead — Sandton, R3.2M budget" },
  { icon: "◇", text: "Drafted letter of demand — arrears R78 000" },
  { icon: "◆", text: "A/B test shipped — variant B +23% CTR" },
  { icon: "◇", text: "Portfolio flagged — S&P exposure at ceiling" },
  { icon: "◆", text: "Patient triaged — consult booked for 14:30" },
  { icon: "◇", text: "Return processed — label RET-ZA-8821-01" },
  { icon: "◆", text: "Nurture email #3 sent to 47 leads" },
  { icon: "◇", text: "Case law research filed — delictual liability" },
  { icon: "◆", text: "Abandoned carts recovered — est. R8 200" },
  { icon: "◇", text: "Monthly reports sent to 8 clients" },
];

export default function Marquee() {
  const row = [...tasks, ...tasks];
  return (
    <section
      aria-label="Live agent activity"
      className="relative border-y border-border/50 bg-card/30 py-4"
    >
      <div className="marquee-mask overflow-hidden">
        <div
          className="animate-marquee flex w-max items-center gap-10 pr-10"
          style={{ "--marquee-duration": "55s" } as React.CSSProperties}
        >
          {row.map((t, i) => (
            <span
              key={i}
              className="flex shrink-0 items-center gap-3 font-mono text-xs text-muted-foreground"
            >
              <span className="text-primary/70">{t.icon}</span>
              {t.text}
            </span>
          ))}
        </div>
      </div>
      <div className="pointer-events-none absolute left-4 top-1/2 hidden -translate-y-1/2 items-center gap-2 rounded-full border border-border/60 bg-background/90 px-3 py-1 backdrop-blur-sm md:flex">
        <span className="relative flex size-1.5">
          <span className="status-ping relative inline-flex size-1.5 rounded-full bg-emerald-400 text-emerald-400" />
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          Live feed
        </span>
      </div>
    </section>
  );
}
