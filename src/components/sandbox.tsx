"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading, FadeIn } from "@/components/landing/primitives";

/* ── industry demo data ──────────────────── */

interface DemoStep {
  role: "user" | "agent";
  text: string;
}

interface DashboardData {
  tasksCompleted: number;
  timeSaved: string;
  responseRate: number;
  clientSatisfaction: number;
  chart: { label: string; value: number; pct: string }[];
  recentActivity: { time: string; action: string }[];
}

interface IndustryDemo {
  label: string;
  icon: string;
  color: string;
  steps: DemoStep[];
  dashboard: DashboardData;
}

const demos: IndustryDemo[] = [
  {
    label: "Real Estate",
    icon: "🏠",
    color: "text-emerald-400",
    steps: [
      { role: "user", text: "I need a listing for a 3-bed house in Sandton with a pool. Make it sound premium." },
      { role: "agent", text: "On it. Pulling comps from the area…\n\n🏡 *3 Bed · 2.5 Bath · Sandton*\n\n**Price:** R4 200 000\n\n**Listing:**\nSun-drenched family home in the heart of Sandton's most sought-after boomed suburb. Open-plan living flows through stacking doors to a covered patio overlooking a sparkling saltwater pool. Chef's kitchen with Caesarstone counters, separate scullery. Three generous bedrooms, main en-suite with walk-in closet. Staff quarters, double garage, inverter-ready.\n\n📍 5 min from Sandton City | 3 min from Crawford\n\n**Suggested buyer nurture sequence:** 5-email drip over 14 days. Ready to schedule the open house?" },
    ],
    dashboard: {
      tasksCompleted: 847,
      timeSaved: "142 hrs",
      responseRate: 98,
      clientSatisfaction: 4.9,
      chart: [
        { label: "Listings drafted", value: 312, pct: "70%" },
        { label: "Leads qualified", value: 284, pct: "63%" },
        { label: "Viewings booked", value: 167, pct: "37%" },
        { label: "Offers negotiated", value: 84, pct: "19%" },
      ],
      recentActivity: [
        { time: "2 min ago", action: "Qualified buyer lead — Sandton R3.2M budget" },
        { time: "8 min ago", action: "Scheduled viewing for Mandeville property" },
        { time: "14 min ago", action: "Sent nurture email #3 to lead pool (47 recipients)" },
        { time: "22 min ago", action: "Drafted counter-offer for Bryanston listing" },
        { time: "1 hour ago", action: "Posted new listing to Property24 + Private Property" },
      ],
    },
  },
  {
    label: "Legal",
    icon: "⚖️",
    color: "text-amber-400",
    steps: [
      { role: "user", text: "Draft a demand letter. Tenant is 3 months behind on rent for a commercial property in Cape Town." },
      { role: "agent", text: "Referencing the Rental Housing Act 50 of 1999 and the lease agreement…\n\n───\n\n**LETTER OF DEMAND**\n\n**To:** Occupier, Unit 4B, The Firs, Cape Town\n**From:** [Landlord]  •  **Date:** 11 July 2026\n\nDear Sir/Madam,\n\nThis letter serves as formal notice that you are in breach of the lease agreement dated 12 January 2025. Rent for April, May, and June 2026 remains unpaid, totalling R78 000.00.\n\nIn terms of clause 9.2 of the lease and section 14 of the Rental Housing Act, you are hereby given **14 calendar days** from receipt of this letter to remedy the breach by paying all outstanding amounts into the trust account detailed below.\n\nFailure to comply will result in cancellation of the lease and legal proceedings to recover the arrears, interest at the prescribed rate of 11.50% per annum, and legal costs on the attorney-and-client scale.\n\n───\n\n⚠️  I've flagged three risk areas — want me to annotate them before you send?" },
    ],
    dashboard: {
      tasksCompleted: 523,
      timeSaved: "218 hrs",
      responseRate: 96,
      clientSatisfaction: 4.7,
      chart: [
        { label: "Contracts drafted", value: 198, pct: "82%" },
        { label: "Demand letters", value: 145, pct: "60%" },
        { label: "Case law research", value: 112, pct: "46%" },
        { label: "Discovery organised", value: 68, pct: "28%" },
      ],
      recentActivity: [
        { time: "1 min ago", action: "Completed case law search — Delictual liability precedent" },
        { time: "7 min ago", action: "Filed discovery index for Mthembu vs. City of Cape Town" },
        { time: "15 min ago", action: "Drafted heads of argument for opposed motion" },
        { time: "31 min ago", action: "Reviewed and annotated lease agreement (clause 14.3 flagged)" },
        { time: "2 hours ago", action: "Sent letter of demand — tenant arrears R78 000" },
      ],
    },
  },
  {
    label: "Marketing",
    icon: "📣",
    color: "text-pink-400",
    steps: [
      { role: "user", text: "We're launching a B2B SaaS tool for HR teams. Write LinkedIn ad copy — 3 variants for A/B testing." },
      { role: "agent", text: "Analysed top-performing B2B SaaS campaigns from Q1-Q2 2026. Here are 3 variants with distinct hooks:\n\n───\n\n**Variant A — Pain Point**\n\n200 hours. That's how much time your HR team spends on manual onboarding per new hire. We built [Product] to turn that into 20 minutes.\n\n**Variant B — Social Proof**\n\n\"We cut new-hire admin by 85% in the first month.\"\n— Head of People, [Unicorn Tech Co]\n\n**Variant C — Curiosity Gap**\n\nMost HR tools automate payroll. We automated everything *around* payroll — and nobody saw it coming.\n\n───\n\n📊 Suggested budget split: A:40% / B:35% / C:25%. Audience: HR Directors, 200-1 000 employees, South Africa + UK." },
    ],
    dashboard: {
      tasksCompleted: 1206,
      timeSaved: "96 hrs",
      responseRate: 94,
      clientSatisfaction: 4.8,
      chart: [
        { label: "Ad copy variants", value: 432, pct: "74%" },
        { label: "Performance reports", value: 298, pct: "51%" },
        { label: "A/B test analyses", value: 276, pct: "47%" },
        { label: "Content calendars", value: 200, pct: "34%" },
      ],
      recentActivity: [
        { time: "3 min ago", action: "A/B test report: Variant B outperforming by 23% CTR" },
        { time: "11 min ago", action: "Published 3 LinkedIn posts to content calendar" },
        { time: "19 min ago", action: "Generated 5 headline variants for Q3 campaign" },
        { time: "34 min ago", action: "Competitor ad spend analysis — 12 brands tracked" },
        { time: "1 hour ago", action: "Drafted monthly newsletter for 8 400 subscribers" },
      ],
    },
  },
  {
    label: "Finance",
    icon: "📊",
    color: "text-cyan-400",
    steps: [
      { role: "user", text: "Generate the monthly portfolio summary for client Mthembu. Flag anything unusual." },
      { role: "agent", text: "Pulling data from the last 30 trading days…\n\n───\n\n**Monthly Portfolio Summary — July 2026**\n**Client:** T. Mthembu  •  **Mandate:** Balanced Growth\n\n| Asset Class | Allocation | Δ MoM |\n|---|---|---|\n| Equity (JSE Top 40) | 52% | +2.7% |\n| Bonds (SA Gov) | 28% | −0.3% |\n| Offshore (S&P 500) | 12% | +4.1% |\n| Cash | 8% | − |\n\n**Total return:** +2.14% vs benchmark +1.90%\n\n───\n\n🚩 **Flag raised:** S&P 500 exposure is 2% above mandate ceiling. Rebalancing recommendation: sell $3 200 equivalent, rotate into SA retail bonds at 9.25% yield. Shall I prepare the trade instructions?" },
    ],
    dashboard: {
      tasksCompleted: 389,
      timeSaved: "173 hrs",
      responseRate: 99,
      clientSatisfaction: 4.9,
      chart: [
        { label: "Reports generated", value: 156, pct: "94%" },
        { label: "Anomalies flagged", value: 98, pct: "59%" },
        { label: "Rebalancing recs", value: 74, pct: "45%" },
        { label: "Transactions reconciled", value: 61, pct: "37%" },
      ],
      recentActivity: [
        { time: "4 min ago", action: "Flagged: Client Nkosi portfolio overweight SA equities" },
        { time: "9 min ago", action: "Generated Q2 tax summary for 14 client portfolios" },
        { time: "16 min ago", action: "Reconciled 47 transactions across 3 custodial accounts" },
        { time: "27 min ago", action: "Sent rebalancing alert: S&P exposure at ceiling" },
        { time: "1 hour ago", action: "Monthly performance report sent to 8 clients" },
      ],
    },
  },
  {
    label: "Healthcare",
    icon: "🏥",
    color: "text-red-400",
    steps: [
      { role: "user", text: "A patient just messaged: 'I've had a fever for 5 days and a rash on my chest. Should I come in?'" },
      { role: "agent", text: "⚠️  **This requires clinical judgment — I will triage but a doctor must review.**\n\nBased on the symptoms described (fever >3 days + rash), this could range from a viral exanthem to something requiring urgent attention.\n\n───\n\n**Triage recommendation:** Book an in-person consultation.\n\n**Next available slots with Dr Naidoo:**\n• Today — 14:30\n• Tomorrow — 09:15, 11:00\n\n**Pre-consult note drafted for the doctor:**\n\"Patient reports 5-day fever (unknown temperature) with new chest rash. No known allergies. Last visit: March 2026 for routine checkup. No recent travel reported.\"\n\n✉️  I've saved this as a draft response. Ready to send the booking link?" },
    ],
    dashboard: {
      tasksCompleted: 2104,
      timeSaved: "264 hrs",
      responseRate: 97,
      clientSatisfaction: 4.6,
      chart: [
        { label: "Patients triaged", value: 892, pct: "82%" },
        { label: "Appts booked", value: 634, pct: "58%" },
        { label: "Records summarised", value: 412, pct: "38%" },
        { label: "Follow-ups sent", value: 166, pct: "15%" },
      ],
      recentActivity: [
        { time: "1 min ago", action: "Triaged: fever + headache — routine consult, booked 15:00" },
        { time: "5 min ago", action: "Summarised new patient record for Dr Naidoo review" },
        { time: "12 min ago", action: "Sent appointment reminder to 23 patients for tomorrow" },
        { time: "18 min ago", action: "Flagged: prescription renewal due for Mrs van der Merwe" },
        { time: "45 min ago", action: "Responded to 6 patient queries via WhatsApp" },
      ],
    },
  },
  {
    label: "E-Commerce",
    icon: "🛒",
    color: "text-orange-400",
    steps: [
      { role: "user", text: "Customer wants to return a pair of sneakers. Order #ZA-8821. They say the size is wrong." },
      { role: "agent", text: "Pulled up the order…\n\n───\n\n**Order #ZA-8821**  •  Placed 3 July 2026  •  Delivered 8 July 2026\n\n📦 Nike Air Max 90 — Size UK 8 — R2 199\n📦 3-pack crew socks — R149\n\n✅  Within 30-day return window. Return reason: size issue.\n\n───\n\n**Customer reply (draft):**\n\nHi there 👋\n\nSorry the fit wasn't right! I've already created your return label — no charge. Here's what happens next:\n\n1. 📎 Return label attached to this email\n2. 📦 Drop the sneakers at any Pargo pickup point\n3. 💳 Once scanned, we'll process your exchange (UK 9) or refund — your choice\n\nThe socks are yours to keep. Reply with \"UK 9\" for exchange or \"refund\" and I'll handle it instantly.\n\n───\n\n📎  Return label generated: RET-ZA-8821-01\n🔄  Also flagged: this is the 3rd size return on UK 8 Air Max 90s this month — possible sizing chart issue?" },
    ],
    dashboard: {
      tasksCompleted: 3156,
      timeSaved: "312 hrs",
      responseRate: 95,
      clientSatisfaction: 4.5,
      chart: [
        { label: "Tickets resolved", value: 1456, pct: "89%" },
        { label: "Returns processed", value: 892, pct: "55%" },
        { label: "Cart recoveries", value: 534, pct: "33%" },
        { label: "Product Q&As", value: 274, pct: "17%" },
      ],
      recentActivity: [
        { time: "30 sec ago", action: "Resolved ticket #8841 — delivery address update" },
        { time: "3 min ago", action: "Processed return RET-ZA-8821-01 (Nike Air Max 90)" },
        { time: "8 min ago", action: "Sent abandoned cart email #2 — 14 carts, est. R8 200" },
        { time: "14 min ago", action: "Flagged sizing trend: UK 8 returns up 40% this month" },
        { time: "22 min ago", action: "Answered 12 product questions on PDPs" },
      ],
    },
  },
];

/* ── typing hook ──────────────────────────── */

function useTypingEffect(text: string, speed = 18, enabled = true) {
  const [displayed, setDisplayed] = useState("");
  const indexRef = useRef(0);

  useEffect(() => {
    if (!enabled) return;
    indexRef.current = 0;
    // first tick resets to the empty string, avoiding a sync setState here
    const interval = setInterval(() => {
      if (indexRef.current > text.length) {
        clearInterval(interval);
        return;
      }
      setDisplayed(text.slice(0, indexRef.current));
      indexRef.current += 1;
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, enabled]);

  return enabled ? displayed : text;
}

/* ── dashboard sub-components ────────────── */

function KpiCard({ label, value, suffix = "", color }: { label: string; value: string | number; suffix?: string; color: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-lg border border-border/40 bg-background/60 p-4"
    >
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className={`text-2xl font-semibold ${color}`}>
        {typeof value === "number" ? value.toLocaleString() : value}
        {suffix}
      </p>
    </motion.div>
  );
}

function BarChart({ data, color }: { data: { label: string; value: number; pct: string }[]; color: string }) {
  const max = Math.max(...data.map((d) => d.value));
  return (
    <div className="space-y-3">
      {data.map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: i * 0.08 }}
        >
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-muted-foreground">{item.label}</span>
            <span className={color}>{item.pct}</span>
          </div>
          <div className="h-2 rounded-full bg-secondary overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${color.replace("text-", "bg-")}`}
              initial={{ width: 0 }}
              animate={{ width: `${(item.value / max) * 100}%` }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function ActivityFeed({ activities }: { activities: { time: string; action: string }[] }) {
  return (
    <div className="space-y-0">
      {activities.map((a, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.25, delay: 0.5 + i * 0.06 }}
          className="flex items-start gap-2 py-2 border-b border-border/20 last:border-0"
        >
          <span className="text-[10px] text-muted-foreground whitespace-nowrap mt-0.5 font-mono">
            {a.time}
          </span>
          <span className="text-xs text-foreground/80">{a.action}</span>
        </motion.div>
      ))}
    </div>
  );
}

/* ── sandbox component ────────────────────── */

export default function Sandbox() {
  const [active, setActive] = useState(0);
  const [step, setStep] = useState(0);
  const [typingEnabled, setTypingEnabled] = useState(true);
  const [view, setView] = useState<"demo" | "dashboard">("demo");
  const demo = demos[active];
  const currentStep = demo.steps[step];
  const terminalRef = useRef<HTMLDivElement>(null);

  const displayedText = useTypingEffect(
    step < demo.steps.length ? currentStep.text : "",
    16,
    typingEnabled && step < demo.steps.length && currentStep.role === "agent"
  );

  // Auto-advance after typing completes
  useEffect(() => {
    if (view !== "demo" || !typingEnabled || step >= demo.steps.length) return;
    if (currentStep.role === "user") {
      const t = setTimeout(() => setStep((s) => s + 1), 1200);
      return () => clearTimeout(t);
    }
    const totalMs = currentStep.text.length * 16 + 600;
    const t = setTimeout(() => setStep((s) => s + 1), totalMs);
    return () => clearTimeout(t);
  }, [step, active, typingEnabled, view]); // eslint-disable-line react-hooks/exhaustive-deps

  const switchIndustry = useCallback((i: number) => {
    setActive(i);
    setStep(0);
    setTypingEnabled(true);
  }, []);

  const replay = useCallback(() => {
    setStep(0);
    setTypingEnabled(true);
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [displayedText, step, active]);

  const pillBg = (v: "demo" | "dashboard") =>
    view === v
      ? "bg-primary/20 text-foreground"
      : "text-muted-foreground hover:text-foreground";

  return (
    <section id="demo" className="relative scroll-mt-24 border-y border-border/50 bg-card/20 px-4 py-28 sm:py-36">
      {/* ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-24 h-[320px] w-[640px] -translate-x-1/2 rounded-full bg-[oklch(0.45_0.20_290)] opacity-[0.08] blur-[110px]"
      />
      <div className="relative mx-auto max-w-5xl">
        <SectionHeading
          kicker="Live demo"
          title="Watch it"
          accent="actually"
          titleAfter="work."
          sub="Pick an industry. This is the agent in real time — then flip to the dashboard it reports into."
          className="mb-12"
        />

        {/* Industry tabs */}
        <FadeIn delay={0.15} className="mb-8 flex flex-wrap justify-center gap-2">
          {demos.map((d, i) => (
            <button
              key={d.label}
              onClick={() => switchIndustry(i)}
              className={`inline-flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 font-mono text-xs uppercase tracking-[0.1em] transition-all duration-300
                ${i === active
                  ? "border border-primary/50 bg-primary/15 text-foreground shadow-[0_0_24px_oklch(0.62_0.23_290/0.25)]"
                  : "border border-border/50 bg-card/40 text-muted-foreground hover:border-border hover:text-foreground"
                }`}
            >
              <span className="text-sm">{d.icon}</span>
              <span className="hidden sm:inline">{d.label}</span>
            </button>
          ))}
        </FadeIn>

        {/* Panel */}
        <motion.div
          key={`${active}-${view}`}
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden rounded-2xl border border-border/60 bg-[oklch(0.09_0.012_278)] shadow-[0_32px_90px_oklch(0_0_0/0.55)]"
        >
          {/* Title bar */}
          <div className="flex items-center gap-2 border-b border-border/40 bg-card/50 px-4 py-3">
            <div className="flex gap-1.5">
              <span className="size-2.5 rounded-full bg-[oklch(0.6_0.19_25)]/70" />
              <span className="size-2.5 rounded-full bg-[oklch(0.75_0.15_85)]/70" />
              <span className="size-2.5 rounded-full bg-[oklch(0.7_0.17_150)]/70" />
            </div>
            <span className="ml-3 font-mono text-xs text-muted-foreground">
              {view === "demo"
                ? `agent@${active === 0 ? "realestate" : active === 1 ? "legal" : active === 2 ? "marketing" : active === 3 ? "finance" : active === 4 ? "healthcare" : "ecommerce"} — live`
                : `${demo.label} — dashboard`}
            </span>
            <div className="ml-auto flex items-center gap-2">
              {/* View toggle */}
              <div className="mr-2 flex rounded-full border border-border/50 bg-background/60 p-0.5">
                <button
                  onClick={() => { setView("demo"); setStep(0); setTypingEnabled(true); }}
                  className={`cursor-pointer rounded-full px-3 py-1 font-mono text-[11px] font-medium transition-colors ${pillBg("demo")}`}
                >
                  Demo
                </button>
                <button
                  onClick={() => setView("dashboard")}
                  className={`cursor-pointer rounded-full px-3 py-1 font-mono text-[11px] font-medium transition-colors ${pillBg("dashboard")}`}
                >
                  Dashboard
                </button>
              </div>
              {view === "demo" && (
                <button
                  onClick={replay}
                  className="cursor-pointer font-mono text-[11px] text-muted-foreground transition-colors hover:text-foreground"
                >
                  ↺ Replay
                </button>
              )}
            </div>
          </div>

          {/* Panel body */}
          <div
            ref={terminalRef}
            className="p-5 max-h-[480px] overflow-y-auto"
          >
            <AnimatePresence mode="wait">
              {view === "demo" ? (
                /* ── TERMINAL VIEW ──────────────── */
                <motion.div
                  key="terminal"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="font-mono text-sm leading-relaxed space-y-4"
                >
                  {demo.steps.slice(0, step).map((s, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: s.role === "user" ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className={s.role === "user" ? "text-cyan-400/80" : demo.color}>
                        <span className="select-none opacity-50 mr-2">{s.role === "user" ? "❯" : "⚡"}</span>
                        <span className="whitespace-pre-wrap">{s.text}</span>
                      </div>
                    </motion.div>
                  ))}

                  {step < demo.steps.length && (
                    <motion.div
                      key={`current-${step}`}
                      initial={{ opacity: 0, x: currentStep.role === "user" ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className={currentStep.role === "user" ? "text-cyan-400/80" : demo.color}>
                        <span className="select-none opacity-50 mr-2">{currentStep.role === "user" ? "❯" : "⚡"}</span>
                        <span className="whitespace-pre-wrap">
                          {currentStep.role === "user" ? currentStep.text : displayedText}
                        </span>
                        {currentStep.role === "agent" && displayedText.length < currentStep.text.length && (
                          <motion.span
                            animate={{ opacity: [1, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity }}
                            className="inline-block w-2 h-4 ml-0.5 bg-current align-middle"
                          />
                        )}
                      </div>
                    </motion.div>
                  )}

                  {step >= demo.steps.length && (
                    <div className="text-muted-foreground/40 text-center pt-6 select-none">
                      ⏎ Demo complete.{" "}
                      <button onClick={replay} className="underline hover:text-muted-foreground cursor-pointer">Replay</button>
                      {" "}or pick another industry above.
                    </div>
                  )}
                </motion.div>
              ) : (
                /* ── DASHBOARD VIEW ──────────────── */
                <motion.div
                  key="dashboard"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  {/* KPIs */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <KpiCard label="Tasks completed" value={demo.dashboard.tasksCompleted} color={demo.color} />
                    <KpiCard label="Time saved" value={demo.dashboard.timeSaved} color={demo.color} />
                    <KpiCard label="Response rate" value={demo.dashboard.responseRate} suffix="%" color={demo.color} />
                    <KpiCard label="Client rating" value={demo.dashboard.clientSatisfaction} suffix=" / 5" color={demo.color} />
                  </div>

                  {/* Chart + Activity */}
                  <div className="grid sm:grid-cols-5 gap-6">
                    <div className="sm:col-span-3">
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                        Task breakdown — last 30 days
                      </h4>
                      <BarChart data={demo.dashboard.chart} color={demo.color} />
                    </div>
                    <div className="sm:col-span-2">
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                        Recent activity
                      </h4>
                      <ActivityFeed activities={demo.dashboard.recentActivity} />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Bottom toggle */}
        <div className="mt-5 flex justify-center gap-6">
          {view === "demo" && (
            <button
              onClick={() => setTypingEnabled((v) => !v)}
              className="cursor-pointer font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground/70 transition-colors hover:text-foreground"
            >
              {typingEnabled ? "⏩ Skip typing" : "⌨ Type it out"}
            </button>
          )}
          <button
            onClick={() => setView(view === "demo" ? "dashboard" : "demo")}
            className="cursor-pointer font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground/70 transition-colors hover:text-foreground"
          >
            {view === "demo" ? "→ View the dashboard" : "→ Back to the demo"}
          </button>
        </div>
      </div>
    </section>
  );
}
