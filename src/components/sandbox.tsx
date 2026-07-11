"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";

/* ── industry demo data ──────────────────── */

interface DemoStep {
  role: "user" | "agent";
  text: string;
}

interface IndustryDemo {
  label: string;
  icon: string;
  color: string; // tailwind text color class
  steps: DemoStep[];
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
  },
  {
    label: "Legal",
    icon: "⚖️",
    color: "text-amber-400",
    steps: [
      { role: "user", text: "Draft a demand letter. Tenant is 3 months behind on rent for a commercial property in Cape Town." },
      { role: "agent", text: "Referencing the Rental Housing Act 50 of 1999 and the lease agreement…\n\n───\n\n**LETTER OF DEMAND**\n\n**To:** Occupier, Unit 4B, The Firs, Cape Town\n**From:** [Landlord]  •  **Date:** 11 July 2026\n\nDear Sir/Madam,\n\nThis letter serves as formal notice that you are in breach of the lease agreement dated 12 January 2025. Rent for April, May, and June 2026 remains unpaid, totalling R78 000.00.\n\nIn terms of clause 9.2 of the lease and section 14 of the Rental Housing Act, you are hereby given **14 calendar days** from receipt of this letter to remedy the breach by paying all outstanding amounts into the trust account detailed below.\n\nFailure to comply will result in cancellation of the lease and legal proceedings to recover the arrears, interest at the prescribed rate of 11.50% per annum, and legal costs on the attorney-and-client scale.\n\n───\n\n⚠️  I've flagged three risk areas — want me to annotate them before you send?" },
    ],
  },
  {
    label: "Marketing",
    icon: "📣",
    color: "text-pink-400",
    steps: [
      { role: "user", text: "We're launching a B2B SaaS tool for HR teams. Write LinkedIn ad copy — 3 variants for A/B testing." },
      { role: "agent", text: "Analysed top-performing B2B SaaS campaigns from Q1-Q2 2026. Here are 3 variants with distinct hooks:\n\n───\n\n**Variant A — Pain Point**\n\n200 hours. That's how much time your HR team spends on manual onboarding per new hire. We built [Product] to turn that into 20 minutes.\n\n**Variant B — Social Proof**\n\n\"We cut new-hire admin by 85% in the first month.\"\n— Head of People, [Unicorn Tech Co]\n\n**Variant C — Curiosity Gap**\n\nMost HR tools automate payroll. We automated everything *around* payroll — and nobody saw it coming.\n\n───\n\n📊 Suggested budget split: A:40% / B:35% / C:25%. Audience: HR Directors, 200-1 000 employees, South Africa + UK." },
    ],
  },
  {
    label: "Finance",
    icon: "📊",
    color: "text-cyan-400",
    steps: [
      { role: "user", text: "Generate the monthly portfolio summary for client Mthembu. Flag anything unusual." },
      { role: "agent", text: "Pulling data from the last 30 trading days…\n\n───\n\n**Monthly Portfolio Summary — July 2026**\n**Client:** T. Mthembu  •  **Mandate:** Balanced Growth\n\n| Asset Class | Allocation | Δ MoM |\n|---|---|---|\n| Equity (JSE Top 40) | 52% | +2.7% |\n| Bonds (SA Gov) | 28% | −0.3% |\n| Offshore (S&P 500) | 12% | +4.1% |\n| Cash | 8% | − |\n\n**Total return:** +2.14% vs benchmark +1.90%\n\n───\n\n🚩 **Flag raised:** S&P 500 exposure is 2% above mandate ceiling. Rebalancing recommendation: sell $3 200 equivalent, rotate into SA retail bonds at 9.25% yield. Shall I prepare the trade instructions?" },
    ],
  },
  {
    label: "Healthcare",
    icon: "🏥",
    color: "text-red-400",
    steps: [
      { role: "user", text: "A patient just messaged: 'I've had a fever for 5 days and a rash on my chest. Should I come in?'" },
      { role: "agent", text: "⚠️  **This requires clinical judgment — I will triage but a doctor must review.**\n\nBased on the symptoms described (fever >3 days + rash), this could range from a viral exanthem to something requiring urgent attention.\n\n───\n\n**Triage recommendation:** Book an in-person consultation.\n\n**Next available slots with Dr Naidoo:**\n• Today — 14:30\n• Tomorrow — 09:15, 11:00\n\n**Pre-consult note drafted for the doctor:**\n\"Patient reports 5-day fever (unknown temperature) with new chest rash. No known allergies. Last visit: March 2026 for routine checkup. No recent travel reported.\"\n\n✉️  I've saved this as a draft response. Ready to send the booking link?" },
    ],
  },
  {
    label: "E-Commerce",
    icon: "🛒",
    color: "text-orange-400",
    steps: [
      { role: "user", text: "Customer wants to return a pair of sneakers. Order #ZA-8821. They say the size is wrong." },
      { role: "agent", text: "Pulled up the order…\n\n───\n\n**Order #ZA-8821**  •  Placed 3 July 2026  •  Delivered 8 July 2026\n\n📦 Nike Air Max 90 — Size UK 8 — R2 199\n📦 3-pack crew socks — R149\n\n✅  Within 30-day return window. Return reason: size issue.\n\n───\n\n**Customer reply (draft):**\n\nHi there 👋\n\nSorry the fit wasn't right! I've already created your return label — no charge. Here's what happens next:\n\n1. 📎 Return label attached to this email\n2. 📦 Drop the sneakers at any Pargo pickup point\n3. 💳 Once scanned, we'll process your exchange (UK 9) or refund — your choice\n\nThe socks are yours to keep. Reply with \"UK 9\" for exchange or \"refund\" and I'll handle it instantly.\n\n───\n\n📎  Return label generated: RET-ZA-8821-01\n🔄  Also flagged: this is the 3rd size return on UK 8 Air Max 90s this month — possible sizing chart issue?" },
    ],
  },
];

/* ── typing hook ──────────────────────────── */

function useTypingEffect(text: string, speed = 18, enabled = true) {
  const [displayed, setDisplayed] = useState("");
  const indexRef = useRef(0);

  useEffect(() => {
    if (!enabled) {
      setDisplayed(text);
      return;
    }
    setDisplayed("");
    indexRef.current = 0;
    const interval = setInterval(() => {
      indexRef.current += 1;
      if (indexRef.current > text.length) {
        clearInterval(interval);
      }
      setDisplayed(text.slice(0, indexRef.current));
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, enabled]);

  return displayed;
}

/* ── sandbox component ────────────────────── */

export default function Sandbox() {
  const [active, setActive] = useState(0);
  const [step, setStep] = useState(0);
  const [typingEnabled, setTypingEnabled] = useState(true);
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
    if (!typingEnabled || step >= demo.steps.length) return;
    if (currentStep.role === "user") {
      const t = setTimeout(() => setStep((s) => s + 1), 1200);
      return () => clearTimeout(t);
    }
    const totalMs = currentStep.text.length * 16 + 600;
    const t = setTimeout(() => setStep((s) => s + 1), totalMs);
    return () => clearTimeout(t);
  }, [step, active, typingEnabled]); // eslint-disable-line react-hooks/exhaustive-deps

  // Reset when switching industries
  const switchIndustry = useCallback(
    (i: number) => {
      setActive(i);
      setStep(0);
      setTypingEnabled(true);
    },
    []
  );

  // Replay
  const replay = useCallback(() => {
    setStep(0);
    setTypingEnabled(true);
  }, []);

  // Scroll terminal to bottom on new content
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [displayedText, step, active]);

  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-10">
          <Badge variant="secondary" className="mb-4">See It In Action</Badge>
          <h2 className="text-3xl font-light tracking-tight sm:text-4xl">
            Watch the agent work
          </h2>
          <p className="mt-3 text-muted-foreground">
            Pick an industry below. The agent responds in real time — drafting, analysing, handling tasks exactly as it would for you.
          </p>
        </div>

        {/* Industry tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {demos.map((d, i) => (
            <button
              key={d.label}
              onClick={() => switchIndustry(i)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 cursor-pointer
                ${i === active
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-105"
                  : "bg-card text-muted-foreground hover:text-foreground hover:bg-card/80 border border-border/50"
                }`}
            >
              <span>{d.icon}</span>
              <span className="hidden sm:inline">{d.label}</span>
            </button>
          ))}
        </div>

        {/* Terminal window */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="rounded-xl border border-border/60 bg-[#0d0d14] shadow-2xl shadow-primary/5 overflow-hidden"
        >
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border/40 bg-[#0a0a10]">
            <div className="flex gap-1.5">
              <span className="size-3 rounded-full bg-red-500/70" />
              <span className="size-3 rounded-full bg-amber-500/70" />
              <span className="size-3 rounded-full bg-green-500/70" />
            </div>
            <span className="ml-3 text-xs text-muted-foreground font-mono">
              agent@{active === 0 ? "realestate" : active === 1 ? "legal" : active === 2 ? "marketing" : active === 3 ? "finance" : active === 4 ? "healthcare" : "ecommerce"} — zsh
            </span>
            <div className="ml-auto flex items-center gap-2">
              <button
                onClick={replay}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                ↩ Replay
              </button>
            </div>
          </div>

          {/* Terminal body */}
          <div
            ref={terminalRef}
            className="p-5 font-mono text-sm leading-relaxed max-h-[460px] overflow-y-auto space-y-4"
          >
            <AnimatePresence mode="wait">
              {/* Past steps */}
              {demo.steps.slice(0, step).map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: s.role === "user" ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className={
                      s.role === "user"
                        ? "text-cyan-400/80"
                        : `${demo.color}`
                    }
                  >
                    <span className="select-none opacity-50 mr-2">
                      {s.role === "user" ? "❯" : "⚡"}
                    </span>
                    <span className="whitespace-pre-wrap">{s.text}</span>
                  </div>
                </motion.div>
              ))}

              {/* Current step — typing */}
              {step < demo.steps.length && (
                <motion.div
                  key={`current-${step}`}
                  initial={{ opacity: 0, x: currentStep.role === "user" ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className={
                      currentStep.role === "user"
                        ? "text-cyan-400/80"
                        : `${demo.color}`
                    }
                  >
                    <span className="select-none opacity-50 mr-2">
                      {currentStep.role === "user" ? "❯" : "⚡"}
                    </span>
                    <span className="whitespace-pre-wrap">
                      {currentStep.role === "user"
                        ? currentStep.text
                        : displayedText}
                    </span>
                    {currentStep.role === "agent" &&
                      displayedText.length < currentStep.text.length && (
                        <motion.span
                          animate={{ opacity: [1, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity }}
                          className="inline-block w-2 h-4 ml-0.5 bg-current align-middle"
                        />
                      )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Empty state padding */}
            {step >= demo.steps.length && (
              <div className="text-muted-foreground/40 text-center pt-6 select-none">
                ⏎ Demo complete.{" "}
                <button
                  onClick={replay}
                  className="underline hover:text-muted-foreground cursor-pointer"
                >
                  Replay
                </button>{" "}
                or pick another industry above.
              </div>
            )}
          </div>
        </motion.div>

        {/* Speed toggle */}
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => setTypingEnabled((v) => !v)}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            {typingEnabled ? "⚡ Instant mode" : "⌨️ Typing mode"}
          </button>
        </div>
      </div>
    </section>
  );
}
