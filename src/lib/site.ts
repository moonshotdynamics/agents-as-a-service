/**
 * Central site configuration. Every SEO surface (metadata, sitemap, robots,
 * JSON-LD, llms.txt content) reads from here — change the domain in ONE place.
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://agents.as";

export const SITE_NAME = "Agents.as";

export const SITE_TITLE =
  "Agents.as — Hire an AI Agent for Your Business | South Africa";

export const SITE_DESCRIPTION =
  "Hire a dedicated AI agent trained on your industry, tools, and tone of voice. It qualifies leads, drafts documents, and answers clients 24/7. Live in 48 hours, from R499/month. 14-day free trial.";

export const SITE_KEYWORDS = [
  "AI agent as a service",
  "hire AI agent",
  "AI agent South Africa",
  "AI assistant for business",
  "AI automation South Africa",
  "AI agent subscription",
  "business automation ZAR",
  "AI for real estate",
  "AI for legal",
  "AI for marketing",
  "AI for finance",
  "AI for healthcare",
  "AI for e-commerce",
];

export const PLANS = [
  {
    name: "Starter",
    price: 499,
    description:
      "One dedicated AI agent, one industry focus, up to 1 000 tasks per month, email support, analytics dashboard.",
  },
  {
    name: "Professional",
    price: 1499,
    description:
      "One dedicated AI agent, multi-industry coverage, up to 5 000 tasks per month, priority Slack support, custom integrations, advanced analytics.",
  },
  {
    name: "Enterprise",
    price: 4999,
    description:
      "Unlimited tasks, dedicated success manager, custom workflow development, on-premise deployment, SLA guarantee.",
  },
] as const;
