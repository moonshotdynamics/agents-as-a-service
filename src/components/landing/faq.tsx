"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading, FadeIn, EASE } from "./primitives";
import { faq } from "./faq-data";

function Item({ item, index }: { item: (typeof faq)[number]; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <FadeIn delay={0.06 * index} y={16}>
      <div
        className={`overflow-hidden rounded-xl border transition-colors duration-300 ${
          open
            ? "border-primary/30 bg-card/70"
            : "border-border/50 bg-card/30 hover:border-border"
        }`}
      >
        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left"
        >
          <span className="flex items-baseline gap-4">
            <span className="font-mono text-[11px] text-primary/60">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className={`text-sm font-medium transition-colors sm:text-[15px] ${open ? "text-foreground" : "text-foreground/85"}`}>
              {item.q}
            </span>
          </span>
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="flex size-6 shrink-0 items-center justify-center rounded-full border border-border/70 text-muted-foreground"
            aria-hidden
          >
            <svg viewBox="0 0 16 16" className="size-3" fill="none">
              <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </motion.span>
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              <p className="px-5 pb-5 pl-[3.4rem] text-sm leading-relaxed text-muted-foreground">
                {item.a}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </FadeIn>
  );
}

export default function Faq() {
  return (
    <section id="faq" className="scroll-mt-24 px-4 py-28 sm:py-36">
      <div className="mx-auto max-w-2xl">
        <SectionHeading
          kicker="FAQ"
          title="Questions,"
          accent="answered."
          sub="Everything you'd ask before handing work to an agent."
        />
        <div className="mt-14 space-y-3">
          {faq.map((item, i) => (
            <Item key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
