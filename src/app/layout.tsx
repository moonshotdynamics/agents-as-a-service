import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Agents.as — Hire an AI Agent, Not Another Headcount",
  description:
    "A dedicated AI agent trained on your industry, your tools, and your tone of voice. Live in 48 hours. Priced in rands. Working around the clock. 14-day free trial.",
  keywords: [
    "AI agent as a service",
    "hire AI agent",
    "AI assistant for business",
    "South Africa",
    "ZAR pricing",
    "automation",
    "real estate AI",
    "legal AI",
    "marketing AI",
  ],
  openGraph: {
    title: "Agents.as — Hire an AI Agent, Not Another Headcount",
    description:
      "A dedicated AI agent for your business. Live in 48 hours. Priced in rands. Never sleeps.",
    siteName: "Agents.as",
    locale: "en_ZA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
