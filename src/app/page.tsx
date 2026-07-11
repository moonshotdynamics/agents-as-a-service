"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Lottie from "lottie-react";
import aiHeroAnimation from "../../public/animations/ai-hero.json";
import codeAnimation from "../../public/animations/code.json";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

/* ── data ────────────────────────────────── */

const capabilities = [
  { title: "Real Estate", description: "Qualifies leads, schedules viewings, drafts property listings, and follows up with buyers 24/7.", badge: "Lead Gen" },
  { title: "Legal", description: "Drafts contracts and demand letters, researches case law, organizes discovery documents.", badge: "Documents" },
  { title: "Marketing", description: "Writes campaign copy, analyses ad performance, generates A/B test variants, and manages content calendars.", badge: "Content" },
  { title: "Finance", description: "Monitors portfolios, flags anomalies, generates client reports, and reconciles transactions.", badge: "Analysis" },
  { title: "Healthcare", description: "Triages patient inquiries, manages appointment bookings, and summarises patient records.", badge: "Triage" },
  { title: "E‑Commerce", description: "Handles support tickets, answers product questions, manages returns, and recovers abandoned carts.", badge: "Support" },
];

const plans = [
  { name: "Starter", price: "R499", period: "/mo", features: ["Dedicated AI agent", "Up to 1 000 tasks/mo", "One industry focus", "Email support", "Basic analytics dashboard"], cta: "Start Free Trial", featured: false },
  { name: "Professional", price: "R1 499", period: "/mo", features: ["Dedicated AI agent", "Up to 5 000 tasks/mo", "Multi-industry coverage", "Priority Slack support", "Custom integrations", "Advanced analytics"], cta: "Start Free Trial", featured: true },
  { name: "Enterprise", price: "R4 999", period: "/mo", features: ["Dedicated AI agent", "Unlimited tasks", "All industries", "Dedicated success manager", "Custom workflows", "On-premise deployment", "SLA guarantee"], cta: "Contact Sales", featured: false },
];

const steps = [
  { step: "01", title: "Tell us about your business", description: "Pick your industry, describe your workflow, and tell us what you want automated." },
  { step: "02", title: "Your agent is configured", description: "We train your agent on your tone, tools, and processes. Live within 48 hours." },
  { step: "03", title: "Delegate and scale", description: "Hand off repetitive work. Monitor what your agent handles, tweak as needed, add capacity." },
];

const faq = [
  { q: "What exactly does the AI agent do?", a: "Your agent handles the repetitive, time-consuming work you don't need to touch — qualifying leads, drafting documents, answering client questions, managing schedules, analysing data, and more. It works inside your existing tools and follows your processes." },
  { q: "How long until my agent is ready?", a: "Most agents go live within 48 hours of sign-up. Enterprise deployments with custom integrations may take up to one week." },
  { q: "Can the agent work across multiple industries?", a: "Yes. Professional and Enterprise plans include multi-industry coverage. Starter plans focus on one industry, and you can upgrade anytime." },
  { q: "Do I need technical skills to use it?", a: "No. You interact with your agent through the tools you already use — email, Slack, WhatsApp, or a simple dashboard. We handle all the setup." },
  { q: "Is my data secure?", a: "Yes. All data is encrypted in transit and at rest. Enterprise plans include on-premise deployment if you need data to never leave your network." },
  { q: "What if I need something the agent can't do?", a: "Enterprise plans include custom workflow development. We build new capabilities to match your exact requirements." },
];

/* ── helpers ─────────────────────────────── */

const fadeUp = { hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

function Section({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <motion.section
      id={id}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

function Stagger({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className={className}>
      {children}
    </motion.div>
  );
}

function CardItem({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div variants={fadeUp} transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}>
      <Card className={className}>{children}</Card>
    </motion.div>
  );
}

/* ── animated background ─────────────────── */

function AnimatedGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, rgb(139 92 246) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        animate={{ backgroundPosition: ["0 0", "40px 40px"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

/* ── page ────────────────────────────────── */

export default function Home() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map(item => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) }),
        }}
      />

      <nav className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <span className="text-lg font-semibold tracking-tight">Agents<span className="text-primary">.</span>as</span>
          <Button size="sm">Get Started</Button>
        </div>
      </nav>

      <main className="flex-1">
        {/* Hero */}
        <section ref={heroRef} className="relative overflow-hidden px-4 pb-24 pt-20">
          <AnimatedGrid />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
          <motion.div
            className="relative mx-auto max-w-3xl text-center"
            initial={{ opacity: 0, y: 40 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Badge variant="secondary" className="mb-6">AI Agent as a Service · South Africa 🇿🇦</Badge>
            <div className="mx-auto mb-8 w-40 sm:w-48">
              <Lottie animationData={aiHeroAnimation} loop autoplay />
            </div>
            <h1 className="text-4xl font-light tracking-tight sm:text-5xl lg:text-6xl">
              Hire an AI agent.<br />
              <span className="text-primary">One subscription. Done.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
              A dedicated AI agent trained on your industry, your processes, and your tone of voice. Priced in rands. Live in 48 hours.
            </p>
            <div className="mt-8 flex items-center justify-center gap-3">
              <Button size="lg">Start Free Trial</Button>
              <Button variant="outline" size="lg">See What It Can Do</Button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">14-day free trial · No credit card · Cancel anytime</p>
          </motion.div>
        </section>

        {/* Capabilities */}
        <Section className="px-4 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <Badge variant="secondary" className="mb-4">What Your Agent Can Do</Badge>
              <h2 className="text-3xl font-light tracking-tight sm:text-4xl">One agent. Every industry.</h2>
              <p className="mt-3 text-muted-foreground">The same powerful AI adapts to your world. Here&apos;s what it handles across different sectors.</p>
            </div>
            <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {capabilities.map((c) => (
                <CardItem key={c.title} className="group transition-colors hover:border-primary/30">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">{c.title}<Badge variant="outline" className="text-xs font-normal">{c.badge}</Badge></CardTitle>
                    <CardDescription>{c.description}</CardDescription>
                  </CardHeader>
                </CardItem>
              ))}
            </Stagger>
          </div>
        </Section>

        {/* How It Works */}
        <Section className="border-y border-border/50 px-4 py-20">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <Badge variant="secondary" className="mb-4">How It Works</Badge>
              <h2 className="text-3xl font-light tracking-tight sm:text-4xl">Your agent is live in 48 hours</h2>
              <p className="mt-3 text-muted-foreground">No engineering team required. We do the heavy lifting.</p>
            </div>
            <Stagger className="mt-12 grid gap-6 sm:grid-cols-3">
              {steps.map((s) => (
                <motion.div key={s.step} variants={fadeUp} transition={{ duration: 0.5 }} className="text-center">
                  <span className="text-4xl font-thin text-primary/40">{s.step}</span>
                  <h3 className="mt-3 text-lg font-medium">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
                </motion.div>
              ))}
            </Stagger>
          </div>
        </Section>

        {/* Pricing */}
        <Section id="pricing" className="px-4 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <Badge variant="secondary" className="mb-4">Pricing</Badge>
              <h2 className="text-3xl font-light tracking-tight sm:text-4xl">One price. One agent. All yours.</h2>
              <p className="mt-3 text-muted-foreground">No per-task billing. No hidden fees. Just a flat monthly subscription in rands.</p>
            </div>
            <Stagger className="mt-12 grid gap-6 lg:grid-cols-3">
              {plans.map((plan) => (
                <CardItem key={plan.name} className={plan.featured ? "border-primary/50 ring-1 ring-primary/20" : ""}>
                  <CardHeader>
                    {plan.featured && <Badge className="mb-2 w-fit">Most Popular</Badge>}
                    <CardTitle>{plan.name}</CardTitle>
                    <div className="mt-2"><span className="text-4xl font-light">{plan.price}</span><span className="text-muted-foreground">{plan.period}</span></div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      {plan.features.map((f) => (<li key={f} className="flex items-start gap-2"><span className="mt-0.5 text-primary">✓</span>{f}</li>))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" variant={plan.featured ? "default" : "outline"}>{plan.cta}</Button>
                  </CardFooter>
                </CardItem>
              ))}
            </Stagger>
          </div>
        </Section>

        {/* Built by Hermes — the flex */}
        <Section className="border-t border-border/50 px-4 py-20">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">Who Built This</Badge>
            <div className="mx-auto mb-8 w-32">
              <Lottie animationData={codeAnimation} loop autoplay />
            </div>
            <h2 className="text-3xl font-light tracking-tight sm:text-4xl">
              This website was built by an AI agent.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Every section, every animation, every pixel — designed and coded by the same AI you can hire.
              If an agent can build <em>this</em> for itself, imagine what it can build for <em>you</em>.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <Button size="lg">Hire Your Agent</Button>
            </div>
          </div>
        </Section>

        {/* FAQ */}
        <Section className="border-t border-border/50 px-4 py-20">
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <Badge variant="secondary" className="mb-4">FAQ</Badge>
              <h2 className="text-3xl font-light tracking-tight sm:text-4xl">Everything you need to know</h2>
            </div>
            <div className="mt-10 space-y-2">
              {faq.map((item, i) => (
                <details key={i} className="group border-b border-border/50 last:border-0">
                  <summary className="flex cursor-pointer items-center justify-between py-3 text-sm font-medium hover:text-primary transition-colors list-none">
                    {item.q}
                    <svg className="ml-2 size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                  </summary>
                  <p className="pb-3 pr-8 text-sm text-muted-foreground">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </Section>

        {/* CTA */}
        <Section className="border-t border-border/50 px-4 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-light tracking-tight sm:text-4xl">You run the business. Let the agent run the busywork.</h2>
            <p className="mt-4 text-muted-foreground">Join South African businesses delegating repetitive work to an AI agent. 14-day free trial. No risk.</p>
            <div className="mt-8 flex items-center justify-center gap-3">
              <Button size="lg">Start Free Trial</Button>
              <Button variant="outline" size="lg">Talk to Sales</Button>
            </div>
          </div>
        </Section>
      </main>

      <footer className="border-t border-border/50 px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <span className="text-sm font-semibold tracking-tight">Agents<span className="text-primary">.</span>as</span>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="/privacy" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="/terms" className="hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="hover:text-foreground transition-colors">Contact</a>
            </div>
            <span className="text-sm text-muted-foreground">© {new Date().getFullYear()} Agents.as — All prices in ZAR</span>
          </div>
        </div>
      </footer>
    </>
  );
}
