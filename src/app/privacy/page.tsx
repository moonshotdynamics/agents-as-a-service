import type { Metadata } from "next";
import LegalPage from "@/components/landing/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Agents.as collects, uses, and protects your data: minimal collection, encryption in transit and at rest, POPIA rights, and no selling of data — ever.",
  alternates: { canonical: "/privacy" },
};

const sections = [
  {
    title: "What we collect",
    body: "Only what we need to run the service: your name, email address, billing details, and usage data about how your agent is performing. We do not scrape, buy, or enrich your data from anywhere else.",
  },
  {
    title: "What we never do",
    body: "We never sell your data. We never share it with advertisers. Your business data — leads, documents, client conversations your agent handles — belongs to you, full stop.",
  },
  {
    title: "How your data is protected",
    body: "All data is encrypted in transit (TLS 1.2+) and at rest (AES-256). Access is limited to the systems that operate your agent. Enterprise plans can add on-premise deployment so data never leaves your network.",
  },
  {
    title: "Your agent's training data",
    body: "The examples, tone-of-voice samples, and templates you give us are used only to configure your agent. They are not used to train models for other customers.",
  },
  {
    title: "Retention and deletion",
    body: "If you cancel, your configuration and stored data are deleted within 30 days of the end of your billing period. You can request earlier deletion — or an export — at any time.",
  },
  {
    title: "Your rights",
    body: "You may access, correct, export, or delete your personal information whenever you like, in line with POPIA. Email us and a human will handle it. Full policy available on request.",
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      path="/privacy"
      pageName="Privacy Policy"
      kicker="Legal"
      title="Privacy"
      accent="policy."
      intro="The short version: we collect the minimum, we protect it properly, and we never sell it. Here's the slightly longer version."
      sections={sections}
      updated="July 2026"
    />
  );
}
