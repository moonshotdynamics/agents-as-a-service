import type { Metadata } from "next";
import LegalPage from "@/components/landing/legal";

export const metadata: Metadata = {
  title: "Terms of Service — Agents.as",
  description: "The terms that govern your Agents.as subscription.",
};

const sections = [
  {
    title: "The subscription",
    body: "By subscribing you agree to pay the monthly fee for your chosen plan, billed in South African rand. Plans renew automatically each month until you cancel.",
  },
  {
    title: "The free trial",
    body: "Every plan starts with a 14-day free trial. No credit card is required to start, and nothing is billed until the trial ends and you choose to continue.",
  },
  {
    title: "Cancelling",
    body: "You may cancel anytime, with one click, no phone calls. Your agent keeps working until the end of the current billing period, then stops. No cancellation fees, ever.",
  },
  {
    title: "What the agent may be used for",
    body: "Your agent is for legitimate business operations in your industry. You may not use it for spam, harassment, deception, or anything unlawful. We can suspend accounts that do.",
  },
  {
    title: "Human oversight",
    body: "Your agent drafts, triages, and executes routine work — but you stay responsible for the decisions in your business. Outputs in regulated fields (legal, healthcare, finance) are drafts for professional review, not professional advice.",
  },
  {
    title: "Service and liability",
    body: "We provide the service as-is and work hard to keep it fast and available; Enterprise plans include an SLA. Our liability is limited to the fees you paid in the preceding month. Full terms available on request.",
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      kicker="Legal"
      title="Terms of"
      accent="service."
      intro="No 40-page wall of legalese. These are the terms that actually matter, written so you can read them in two minutes."
      sections={sections}
      updated="July 2026"
    />
  );
}
