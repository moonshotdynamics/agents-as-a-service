"use client";

import { SectionHeading, FadeIn, SpotlightCard, ShineButton, GhostButton } from "./primitives";

const plans = [
  {
    name: "Starter",
    price: "R499",
    period: "/month",
    blurb: "One agent, one industry. Perfect for testing the water.",
    features: [
      "Dedicated AI agent",
      "Up to 1 000 tasks/month",
      "One industry focus",
      "Email support",
      "Analytics dashboard",
    ],
    cta: "Start Free Trial",
    featured: false,
  },
  {
    name: "Professional",
    price: "R1 499",
    period: "/month",
    blurb: "The full team member. Most businesses land here.",
    features: [
      "Everything in Starter",
      "Up to 5 000 tasks/month",
      "Multi-industry coverage",
      "Priority Slack support",
      "Custom integrations",
      "Advanced analytics",
    ],
    cta: "Start Free Trial",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "R4 999",
    period: "/month",
    blurb: "Unlimited scale, custom workflows, your infrastructure.",
    features: [
      "Everything in Professional",
      "Unlimited tasks",
      "Dedicated success manager",
      "Custom workflow development",
      "On-premise deployment",
      "SLA guarantee",
    ],
    cta: "Talk to Sales",
    featured: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative scroll-mt-24 px-4 py-28 sm:py-36">
      {/* ambient glow behind featured card */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[oklch(0.45_0.20_290)] opacity-[0.07] blur-[110px]"
      />
      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          kicker="Pricing"
          title="Hire for less than"
          accent="a day"
          titleAfter="of salary."
          sub="Flat monthly subscription in rands. No per-task billing, no usage anxiety, no hidden fees."
        />

        <div className="mt-16 grid items-stretch gap-5 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <FadeIn key={plan.name} delay={0.1 * i} className="h-full">
              <div className={`relative h-full rounded-2xl ${plan.featured ? "lg:-my-3" : ""}`}>
                {plan.featured && <div className="border-beam" aria-hidden />}
                <SpotlightCard
                  className={`flex h-full flex-col p-7 ${
                    plan.featured
                      ? "border-primary/30 bg-card/80 shadow-[0_0_60px_oklch(0.62_0.23_290/0.12)]"
                      : ""
                  }`}
                  borderGlow={!plan.featured}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      {plan.name}
                    </h3>
                    {plan.featured && (
                      <span className="rounded-full bg-primary/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-primary">
                        Most popular
                      </span>
                    )}
                  </div>

                  <div className="mt-5 flex items-baseline gap-1.5">
                    <span className="text-5xl font-light tracking-tight text-foreground">
                      {plan.price}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">
                      {plan.period}
                    </span>
                  </div>
                  <p className="mt-2.5 text-sm text-muted-foreground">{plan.blurb}</p>

                  <div className="my-6 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

                  <ul className="flex-1 space-y-2.5">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-foreground/85">
                        <svg
                          className="mt-0.5 size-4 shrink-0 text-primary"
                          viewBox="0 0 16 16"
                          fill="none"
                          aria-hidden
                        >
                          <path
                            d="m3.5 8.5 3 3 6-7"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-7">
                    {plan.featured ? (
                      <ShineButton className="w-full">{plan.cta}</ShineButton>
                    ) : (
                      <GhostButton className="w-full">{plan.cta}</GhostButton>
                    )}
                  </div>
                </SpotlightCard>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <p className="mt-10 text-center font-mono text-xs text-muted-foreground/70">
            All plans start with a 14-day free trial · No credit card · Cancel anytime
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
