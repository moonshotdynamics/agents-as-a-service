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
import { Separator } from "@/components/ui/separator";

const industries = [
  {
    title: "Real Estate",
    description:
      "Agent that qualifies leads, schedules viewings, and follows up with buyers 24/7.",
    badge: "Lead Gen",
  },
  {
    title: "Legal",
    description:
      "Agent that drafts initial consultations, researches case law, and organizes documents.",
    badge: "Research",
  },
  {
    title: "Marketing",
    description:
      "Agent that generates campaign copy, analyzes performance, and optimizes ad spend.",
    badge: "Content",
  },
  {
    title: "Finance",
    description:
      "Agent that monitors portfolios, flags anomalies, and generates client reports.",
    badge: "Analysis",
  },
  {
    title: "Healthcare",
    description:
      "Agent that triages patient inquiries, manages appointments, and summarizes records.",
    badge: "Triage",
  },
  {
    title: "E-Commerce",
    description:
      "Agent that handles support tickets, manages inventory queries, and upsells.",
    badge: "Support",
  },
];

const plans = [
  {
    name: "Starter",
    price: "R499",
    period: "/mo",
    features: [
      "1 industry agent",
      "Up to 500 conversations/mo",
      "Email support",
      "Basic analytics",
      "Standard response time",
    ],
    cta: "Start Free Trial",
    featured: false,
  },
  {
    name: "Professional",
    price: "R1 499",
    period: "/mo",
    features: [
      "3 industry agents",
      "Up to 3 000 conversations/mo",
      "Priority support",
      "Advanced analytics",
      "Custom branding",
      "API access",
    ],
    cta: "Start Free Trial",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "R3 999",
    period: "/mo",
    features: [
      "Unlimited agents",
      "Unlimited conversations",
      "Dedicated account manager",
      "Custom integrations",
      "SLA guarantee",
      "On-premise option",
      "Team training",
    ],
    cta: "Contact Sales",
    featured: false,
  },
];

const steps = [
  {
    step: "01",
    title: "Pick your industry",
    description:
      "Choose the agents built for your sector — real estate, legal, marketing, and more.",
  },
  {
    step: "02",
    title: "We configure everything",
    description:
      "Your agents are set up with your workflows, tone of voice, and tools within 48 hours.",
  },
  {
    step: "03",
    title: "Go live, see results",
    description:
      "Your team gets access. Monitor performance, tweak behaviour, and scale as you grow.",
  },
];

export default function Home() {
  return (
    <>
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <span className="text-lg font-semibold tracking-tight">
            Agents<span className="text-primary">.</span>as
          </span>
          <Button size="sm">Get Started</Button>
        </div>
      </nav>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden px-4 pb-24 pt-20">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
          <div className="relative mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-6">
              Now in South Africa 🇿🇦
            </Badge>
            <h1 className="text-4xl font-light tracking-tight sm:text-5xl lg:text-6xl">
              AI agents that work
              <br />
              <span className="text-primary">while you sleep</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
              Pre-configured AI agents for your industry. One monthly
              subscription. Zero setup headache. Priced in rands.
            </p>
            <div className="mt-8 flex items-center justify-center gap-3">
              <Button size="lg">Start Free Trial</Button>
              <Button variant="outline" size="lg">
                See How It Works
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              No credit card required · Cancel anytime
            </p>
          </div>
        </section>

        {/* Industries */}
        <section id="industries" className="px-4 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <Badge variant="secondary" className="mb-4">
                Industries
              </Badge>
              <h2 className="text-3xl font-light tracking-tight sm:text-4xl">
                Built for your world
              </h2>
              <p className="mt-3 text-muted-foreground">
                Every agent is trained on your industry&apos;s language,
                workflows, and compliance.
              </p>
            </div>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {industries.map((ind) => (
                <Card key={ind.title} className="group transition-colors hover:border-primary/30">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {ind.title}
                      <Badge variant="outline" className="text-xs font-normal">
                        {ind.badge}
                      </Badge>
                    </CardTitle>
                    <CardDescription>{ind.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="border-y border-border/50 px-4 py-20">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <Badge variant="secondary" className="mb-4">
                How It Works
              </Badge>
              <h2 className="text-3xl font-light tracking-tight sm:text-4xl">
                Live in 48 hours
              </h2>
              <p className="mt-3 text-muted-foreground">
                From sign-up to deployed agents — here&apos;s what happens.
              </p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              {steps.map((s) => (
                <div key={s.step} className="text-center">
                  <span className="text-4xl font-thin text-primary/40">
                    {s.step}
                  </span>
                  <h3 className="mt-3 text-lg font-medium">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {s.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="px-4 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <Badge variant="secondary" className="mb-4">
                Pricing
              </Badge>
              <h2 className="text-3xl font-light tracking-tight sm:text-4xl">
                Simple, flat pricing in rands
              </h2>
              <p className="mt-3 text-muted-foreground">
                No hidden fees. No per-conversation billing. Just one monthly
                price.
              </p>
            </div>
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {plans.map((plan) => (
                <Card
                  key={plan.name}
                  className={
                    plan.featured
                      ? "border-primary/50 ring-1 ring-primary/20"
                      : ""
                  }
                >
                  <CardHeader>
                    {plan.featured && (
                      <Badge className="mb-2 w-fit">Most Popular</Badge>
                    )}
                    <CardTitle>{plan.name}</CardTitle>
                    <div className="mt-2">
                      <span className="text-4xl font-light">{plan.price}</span>
                      <span className="text-muted-foreground">
                        {plan.period}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-2">
                          <span className="mt-0.5 text-primary">✓</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      variant={plan.featured ? "default" : "outline"}
                    >
                      {plan.cta}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-border/50 px-4 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-light tracking-tight sm:text-4xl">
              Ready to put your business on autopilot?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Join businesses across South Africa using AI agents to handle the
              work that doesn&apos;t need you.
            </p>
            <div className="mt-8 flex items-center justify-center gap-3">
              <Button size="lg">Start Free Trial</Button>
              <Button variant="outline" size="lg">
                Talk to Sales
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <span className="text-sm font-semibold tracking-tight">
              Agents<span className="text-primary">.</span>as
            </span>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Contact
              </a>
            </div>
            <span className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Agents.as — All prices in ZAR
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
