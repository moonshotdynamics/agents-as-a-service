"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Wordmark } from "./nav";
import { FadeIn, EASE } from "./primitives";
import { SITE_URL, SITE_NAME } from "@/lib/site";

export interface LegalSection {
  title: string;
  body: string;
}

export default function LegalPage({
  kicker,
  title,
  accent,
  intro,
  sections,
  updated,
  path,
  pageName,
}: {
  kicker: string;
  title: string;
  accent: string;
  intro: string;
  sections: LegalSection[];
  updated: string;
  path: string;
  pageName: string;
}) {
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: SITE_NAME, item: SITE_URL },
      { "@type": "ListItem", position: 2, name: pageName, item: `${SITE_URL}${path}` },
    ],
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      {/* ambient background */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-[20%] left-[15%] h-[45vh] w-[45vw] rounded-full bg-[oklch(0.45_0.20_290)] opacity-[0.08] blur-[130px]" />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "radial-gradient(circle, oklch(0.75 0.10 285) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage:
              "radial-gradient(ellipse 80% 45% at 50% 0%, black 20%, transparent 70%)",
          }}
        />
        <div className="noise absolute inset-0 opacity-[0.015]" />
      </div>

      {/* minimal nav */}
      <header className="relative z-10 mx-auto flex h-16 max-w-2xl items-center justify-between px-4">
        <Wordmark />
        <Link
          href="/"
          className="group inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-foreground"
        >
          <svg
            viewBox="0 0 16 16"
            className="size-3 transition-transform duration-300 group-hover:-translate-x-0.5"
            fill="none"
            aria-hidden
          >
            <path d="M9.5 3.5 5 8l4.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to site
        </Link>
      </header>

      <main className="relative z-10 mx-auto max-w-2xl px-4 pb-28 pt-16 sm:pt-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.25em] text-primary/90">
            {kicker}
          </p>
          <h1 className="mt-4 text-4xl font-light tracking-tight sm:text-5xl">
            {title}{" "}
            <span className="serif-accent bg-gradient-to-r from-[oklch(0.75_0.19_290)] to-[oklch(0.78_0.13_210)] bg-clip-text text-transparent">
              {accent}
            </span>
          </h1>
          <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">
            {intro}
          </p>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground/60">
            Last updated · {updated}
          </p>
        </motion.div>

        <div className="mt-14 space-y-4">
          {sections.map((s, i) => (
            <FadeIn key={s.title} delay={0.08 * i} y={16}>
              <section className="rounded-2xl border border-border/50 bg-card/40 p-6 transition-colors duration-300 hover:border-border">
                <h2 className="flex items-baseline gap-4 text-base font-medium tracking-tight">
                  <span className="font-mono text-[11px] text-primary/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {s.title}
                </h2>
                <p className="mt-2.5 pl-[2.1rem] text-sm leading-relaxed text-muted-foreground">
                  {s.body}
                </p>
              </section>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3} className="mt-14 text-center">
          <p className="text-sm text-muted-foreground">
            Questions? We answer like humans.{" "}
            <a href="#" className="text-foreground underline decoration-primary/50 underline-offset-4 transition-colors hover:decoration-primary">
              Contact us
            </a>
          </p>
        </FadeIn>
      </main>

      <footer className="relative z-10 border-t border-border/50 px-4 py-8">
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <span className="font-mono text-[11px] text-muted-foreground/70">
            © {new Date().getFullYear()} Agents.as
          </span>
          <div className="flex gap-6 font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
            <Link href="/privacy" className="transition-colors hover:text-foreground">Privacy</Link>
            <Link href="/terms" className="transition-colors hover:text-foreground">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
