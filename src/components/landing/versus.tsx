"use client";

import { motion } from "framer-motion";
import { SpotlightCard, SectionHeading, FadeIn } from "./primitives";

const chatbotRows = [
  { text: "You write the prompt. Every. Single. Time." },
  { text: "Forgets everything between sessions" },
  { text: "Gives advice — you do the work" },
];

const agentRows = [
  { text: "Trained once. Works forever." },
  { text: "Remembers your clients, workflows, history" },
  { text: "Executes — sends, books, tracks, reports" },
];

function ChatMock() {
  return (
    <div className="mt-6 space-y-2 rounded-lg border border-border/30 bg-[oklch(0.09_0.012_278)] p-4">
      <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 mb-3">chat.openai.com</div>
      {[
        { who: "you", text: "Write a follow-up email for a lead who viewed a property 3 days ago" },
        { who: "it", text: "Sure. Here's a draft: \"Subject: Just checking in…\"" },
        { who: "you", text: "Can you personalize it for Mr. Nkosi?" },
        { who: "it", text: "I don't remember Mr. Nkosi. Can you tell me about him?" },
      ].map((m, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 + i * 0.15 }}
          className={`flex ${m.who === "it" ? "justify-start" : "justify-end"}`}
        >
          <span className={`max-w-[85%] rounded-lg px-2.5 py-1 text-[11px] leading-relaxed ${
            m.who === "it" ? "rounded-tl-sm bg-secondary text-muted-foreground" : "rounded-tr-sm bg-primary/15 text-foreground/80"
          }`}>
            {m.text}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

function AgentMock() {
  return (
    <div className="mt-6 space-y-2 rounded-lg border border-primary/20 bg-[oklch(0.09_0.012_278)] p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-[10px] uppercase tracking-widest text-primary/70">agent@your-business</span>
        <span className="flex items-center gap-1 font-mono text-[9px] text-emerald-400">
          <span className="relative flex size-1.5"><span className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping bg-emerald-400" /><span className="relative inline-flex rounded-full size-1.5 bg-emerald-400" /></span>
          LIVE
        </span>
      </div>
      {[
        "Found 14 leads who haven't replied in 5+ days. Drafting follow-ups…",
        "14 emails sent. 12 opened so far. Mr. Nkosi just replied — forwarding.",
        "Calendar cleared for Tuesday viewings. 3 confirmations received.",
      ].map((text, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.1 + i * 0.18 }}
          className="flex items-start gap-2"
        >
          <span className="mt-0.5 text-[10px] text-primary/60">⚡</span>
          <span className="text-[11px] leading-relaxed text-foreground/80">{text}</span>
        </motion.div>
      ))}
    </div>
  );
}

export default function Versus() {
  return (
    <section className="px-4 py-28 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          kicker="The difference"
          title="They give you answers."
          accent="This one does the work."
          sub="You already use ChatGPT, Claude, or Gemini. Here's why your business needs more than a chatbot."
        />

        <FadeIn delay={0.15} className="mt-14 grid gap-6 lg:grid-cols-2">
          {/* ── Chatbots ── */}
          <SpotlightCard className="p-6 sm:p-8" spotlightColor="oklch(0.66 0.22 330 / 0.10)">
            <div className="flex items-center gap-2 mb-5">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-red-400/80">AI Chatbots</span>
              <span className="text-[10px] text-muted-foreground/50">ChatGPT · Claude · Gemini</span>
            </div>
            <ul className="space-y-3">
              {chatbotRows.map((r, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.25 + i * 0.1 }}
                  className="flex items-start gap-3 text-sm text-muted-foreground"
                >
                  <span className="mt-0.5 shrink-0 text-red-400/60">✕</span>
                  {r.text}
                </motion.li>
              ))}
            </ul>
            <ChatMock />
          </SpotlightCard>

          {/* ── Agent ── */}
          <SpotlightCard className="p-6 sm:p-8" spotlightColor="oklch(0.62 0.23 290 / 0.14)">
            <div className="flex items-center gap-2 mb-5">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary/90">Your Agent</span>
              <span className="text-[10px] text-muted-foreground/50">Trained on your business</span>
            </div>
            <ul className="space-y-3">
              {agentRows.map((r, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.25 + i * 0.1 }}
                  className="flex items-start gap-3 text-sm text-foreground/80"
                >
                  <span className="mt-0.5 shrink-0 text-primary">✓</span>
                  {r.text}
                </motion.li>
              ))}
            </ul>
            <AgentMock />
          </SpotlightCard>
        </FadeIn>
      </div>
    </section>
  );
}
