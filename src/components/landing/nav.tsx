"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const links = [
  { label: "Capabilities", href: "#capabilities" },
  { label: "Live Demo", href: "#demo" },
  { label: "Process", href: "#process" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <a href="#" className={`group flex items-center gap-2 ${className}`}>
      <span className="relative flex size-2.5 items-center justify-center">
        <span className="status-ping relative inline-flex size-2.5 rounded-full bg-primary text-primary" />
      </span>
      <span className="text-[15px] font-semibold tracking-tight text-foreground">
        Agents<span className="text-primary">.</span>as
      </span>
    </a>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* scroll progress */}
      <motion.div
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-primary via-[oklch(0.78_0.13_210)] to-[oklch(0.66_0.22_330)]"
        style={{ scaleX: progress }}
      />

      <motion.header
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="fixed inset-x-0 top-3 z-50 px-4"
      >
        <nav
          className={`mx-auto flex h-14 max-w-5xl items-center justify-between rounded-full border px-5 transition-all duration-500 ${
            scrolled
              ? "border-border/70 bg-background/70 shadow-[0_8px_32px_oklch(0_0_0/0.4)] backdrop-blur-xl"
              : "border-transparent bg-transparent"
          }`}
        >
          <Wordmark />

          <div className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group relative rounded-full px-3.5 py-2 text-[13px] font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
              >
                {l.label}
                <span className="absolute inset-x-3.5 -bottom-px h-px origin-center scale-x-0 bg-gradient-to-r from-transparent via-primary to-transparent transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            ))}
          </div>

          <a
            href="#pricing"
            className="btn-shine relative inline-flex h-9 cursor-pointer items-center justify-center rounded-full bg-primary px-4.5 text-[13px] font-medium text-primary-foreground shadow-[0_0_20px_oklch(0.62_0.23_290/0.3)] transition-all duration-300 hover:bg-[oklch(0.70_0.21_287)] hover:shadow-[0_0_32px_oklch(0.62_0.23_290/0.5)]"
          >
            Hire Your Agent
          </a>
        </nav>
      </motion.header>
    </>
  );
}
