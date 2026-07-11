import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hire an AI Agent — Agents as a Service | South Africa",
  description:
    "Get a dedicated AI agent trained on your industry. Handles lead gen, document drafting, client support, and more. Flat monthly subscription in rands. 48-hour setup. 14-day free trial.",
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
    title: "Hire an AI Agent — One Subscription, Every Task Handled",
    description:
      "Dedicated AI agent for your business. Priced in rands. Live in 48 hours.",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script src="https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.js"></script>
        {children}
      </body>
    </html>
  );
}
