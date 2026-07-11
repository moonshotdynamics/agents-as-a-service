import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * /dashboard is a client-side demo behind a fake login — thin content that
 * would waste crawl budget and dilute the landing page, so it's disallowed.
 * AI/answer-engine crawlers are explicitly allowed (GEO): being citable in
 * AI answers is part of the distribution strategy.
 */
export default function robots(): MetadataRoute.Robots {
  const aiCrawlers = [
    "GPTBot",
    "OAI-SearchBot",
    "ChatGPT-User",
    "ClaudeBot",
    "Claude-Web",
    "anthropic-ai",
    "PerplexityBot",
    "Google-Extended",
    "Applebot-Extended",
    "cohere-ai",
    "CCBot",
  ];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard"],
      },
      ...aiCrawlers.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: ["/dashboard"],
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
