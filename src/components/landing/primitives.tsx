"use client";

import {
  Fragment,
  useRef,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
  type MouseEvent,
} from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useReducedMotion,
  animate,
} from "framer-motion";

export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ── TextReveal — word-by-word blur/rise ─────────────────── */

export function TextReveal({
  text,
  className = "",
  delay = 0,
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: "span" | "h1" | "h2" | "p";
}) {
  const reduced = useReducedMotion();
  const words = text.split(" ");
  // NB: className goes on each word, not the wrapper — background-clip:text
  // does not propagate through children with transforms/filters. Spaces stay
  // as real text nodes so textContent reads normally.
  return (
    <Tag>
      {words.map((word, i) => (
        <Fragment key={i}>
          <motion.span
            className={`inline-block will-change-transform ${className}`}
            initial={
              reduced
                ? { opacity: 0 }
                : { opacity: 0, y: "0.6em", filter: "blur(8px)" }
            }
            whileInView={
              reduced
                ? { opacity: 1 }
                : { opacity: 1, y: 0, filter: "blur(0px)" }
            }
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: delay + i * 0.06, ease: EASE }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && " "}
        </Fragment>
      ))}
    </Tag>
  );
}

/* ── FadeIn — section-level entrance ─────────────────────── */

export function FadeIn({
  children,
  className = "",
  delay = 0,
  y = 28,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduced ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* ── CountUp — animated number on scroll into view ───────── */

export function CountUp({
  to,
  duration = 1.6,
  decimals = 0,
  className = "",
  prefix = "",
  suffix = "",
}: {
  to: number;
  duration?: number;
  decimals?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState("0");

  const format = (v: number) =>
    v.toLocaleString("en-ZA", {
      maximumFractionDigits: decimals,
      minimumFractionDigits: decimals,
    });

  useEffect(() => {
    if (!inView || reduced) return;
    const controls = animate(0, to, {
      duration,
      ease: EASE,
      onUpdate: (v) => setDisplay(format(v)),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, to, duration, decimals, reduced]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {reduced ? format(to) : display}
      {suffix}
    </span>
  );
}

/* ── Magnetic — element gently follows the cursor ────────── */

export function Magnetic({
  children,
  strength = 0.25,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const onMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (reduced || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      x.set((e.clientX - rect.left - rect.width / 2) * strength);
      y.set((e.clientY - rect.top - rect.height / 2) * strength);
    },
    [x, y, strength, reduced]
  );

  const onLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}

/* ── SpotlightCard — radial glow follows the cursor ──────── */

export function SpotlightCard({
  children,
  className = "",
  spotlightColor = "oklch(0.62 0.23 290 / 0.14)",
  borderGlow = true,
}: {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
  borderGlow?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: -999, y: -999 });
  const [hovering, setHovering] = useState(false);

  const onMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className={`group/spotlight relative overflow-hidden rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm transition-colors duration-300 hover:border-primary/40 ${className}`}
    >
      {/* cursor-tracked glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: hovering ? 1 : 0,
          background: `radial-gradient(420px circle at ${pos.x}px ${pos.y}px, ${spotlightColor}, transparent 65%)`,
        }}
      />
      {borderGlow && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
          style={{
            opacity: hovering ? 1 : 0,
            background: `radial-gradient(280px circle at ${pos.x}px ${pos.y}px, oklch(0.66 0.21 287 / 0.4), transparent 60%)`,
            mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            maskComposite: "exclude",
            padding: 1,
          }}
        />
      )}
      <div className="relative">{children}</div>
    </div>
  );
}

/* ── Kicker — mono section label ─────────────────────────── */

export function Kicker({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <FadeIn
      y={12}
      className={`flex items-center justify-center gap-3 ${className}`}
    >
      <span className="h-px w-8 bg-gradient-to-r from-transparent to-primary/60" />
      <span className="font-mono text-[11px] font-medium uppercase tracking-[0.25em] text-primary/90">
        {children}
      </span>
      <span className="h-px w-8 bg-gradient-to-l from-transparent to-primary/60" />
    </FadeIn>
  );
}

/* ── SectionHeading — kicker + display heading + sub ─────── */

export function SectionHeading({
  kicker,
  title,
  accent,
  titleAfter,
  sub,
  className = "",
}: {
  kicker: string;
  title: string;
  accent?: string;
  titleAfter?: string;
  sub?: string;
  className?: string;
}) {
  return (
    <div className={`text-center ${className}`}>
      <Kicker>{kicker}</Kicker>
      <h2 className="mt-5 text-balance text-4xl font-light tracking-tight text-foreground sm:text-5xl lg:text-6xl">
        <TextReveal text={title} />{" "}
        {accent && (
          <>
            <TextReveal
              text={accent}
              className="serif-accent bg-gradient-to-r from-[oklch(0.75_0.19_290)] via-[oklch(0.78_0.13_210)] to-[oklch(0.75_0.19_290)] bg-clip-text text-transparent"
              delay={0.15}
            />
            {titleAfter && (
              <>
                {" "}
                <TextReveal text={titleAfter} delay={0.25} />
              </>
            )}
          </>
        )}
      </h2>
      {sub && (
        <FadeIn delay={0.25} y={16}>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-base text-muted-foreground sm:text-lg">
            {sub}
          </p>
        </FadeIn>
      )}
    </div>
  );
}

/* ── ShineButton — primary CTA with sweeping highlight ───── */

export function ShineButton({
  children,
  href,
  className = "",
  size = "lg",
}: {
  children: ReactNode;
  href?: string;
  className?: string;
  size?: "lg" | "xl";
}) {
  const sizeCls =
    size === "xl"
      ? "h-13 px-8 text-base"
      : "h-11 px-6 text-sm";
  const Comp = href ? "a" : "button";
  return (
    <Magnetic strength={0.2}>
      <Comp
        href={href}
        className={`btn-shine group relative inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-primary font-medium text-primary-foreground shadow-[0_0_24px_oklch(0.62_0.23_290/0.35),inset_0_1px_0_oklch(1_0_0/0.2)] transition-all duration-300 hover:bg-[oklch(0.70_0.21_287)] hover:shadow-[0_0_44px_oklch(0.62_0.23_290/0.55),inset_0_1px_0_oklch(1_0_0/0.2)] ${sizeCls} ${className}`}
      >
        {children}
        <svg
          className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden
        >
          <path
            d="M6 3.5 10.5 8 6 12.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Comp>
    </Magnetic>
  );
}

/* ── GhostButton — secondary CTA ─────────────────────────── */

export function GhostButton({
  children,
  href,
  className = "",
  size = "lg",
}: {
  children: ReactNode;
  href?: string;
  className?: string;
  size?: "lg" | "xl";
}) {
  const sizeCls = size === "xl" ? "h-13 px-8 text-base" : "h-11 px-6 text-sm";
  const Comp = href ? "a" : "button";
  return (
    <Magnetic strength={0.2}>
      <Comp
        href={href}
        className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-border bg-card/40 font-medium text-foreground backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-card ${sizeCls} ${className}`}
      >
        {children}
      </Comp>
    </Magnetic>
  );
}
