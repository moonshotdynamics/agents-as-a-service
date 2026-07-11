"use client";

import { motion } from "framer-motion";
import { Wordmark } from "./nav";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border/50 px-4 pt-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-between gap-8 pb-14 sm:flex-row">
          <Wordmark />
          <div className="flex gap-8 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
            <a href="/privacy" className="transition-colors hover:text-foreground">Privacy</a>
            <a href="/terms" className="transition-colors hover:text-foreground">Terms</a>
            <a href="#" className="transition-colors hover:text-foreground">Contact</a>
          </div>
          <span className="font-mono text-xs text-muted-foreground/70">
            © {new Date().getFullYear()} Agents.as · Prices in ZAR
          </span>
        </div>
      </div>

      {/* giant wordmark bleeding off the bottom */}
      <div className="pointer-events-none relative mx-auto max-w-6xl select-none" aria-hidden>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="translate-y-[0.28em] bg-gradient-to-b from-[oklch(0.35_0.06_285)] to-transparent bg-clip-text text-center text-[clamp(4rem,17vw,15rem)] font-semibold leading-none tracking-tighter text-transparent"
        >
          Agents.as
        </motion.p>
      </div>
    </footer>
  );
}
