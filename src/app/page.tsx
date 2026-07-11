import Nav from "@/components/landing/nav";
import Hero from "@/components/landing/hero";
import Marquee from "@/components/landing/marquee";
import Bento from "@/components/landing/bento";
import Sandbox from "@/components/sandbox";
import Process from "@/components/landing/process";
import Pricing from "@/components/landing/pricing";
import BuiltByAI from "@/components/landing/built-by-ai";
import Faq from "@/components/landing/faq";
import { faq } from "@/components/landing/faq-data";
import Cta from "@/components/landing/cta";
import Footer from "@/components/landing/footer";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, PLANS } from "@/lib/site";

/**
 * One connected JSON-LD graph: Organization → WebSite → Service (with the
 * real ZAR offers) → FAQPage. Entities reference each other by @id so
 * search engines and answer engines resolve them as one entity set.
 */
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      areaServed: {
        "@type": "Country",
        name: "South Africa",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en-ZA",
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: "Hire an AI Agent for Your Business — Agents.as",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#service` },
      inLanguage: "en-ZA",
    },
    {
      "@type": "Service",
      "@id": `${SITE_URL}/#service`,
      name: "AI Agent as a Service",
      serviceType: "AI business automation subscription",
      description:
        "A dedicated AI agent trained on your industry, tools, and tone of voice. It qualifies leads, drafts documents, answers clients, and handles repetitive work 24/7. Configured and live within 48 hours of sign-up.",
      provider: { "@id": `${SITE_URL}/#organization` },
      areaServed: {
        "@type": "Country",
        name: "South Africa",
      },
      audience: {
        "@type": "BusinessAudience",
        name: "South African businesses in real estate, legal, marketing, finance, healthcare, and e-commerce",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Agents.as subscription plans",
        itemListElement: PLANS.map((plan) => ({
          "@type": "Offer",
          name: `${plan.name} plan`,
          description: plan.description,
          price: plan.price,
          priceCurrency: "ZAR",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: plan.price,
            priceCurrency: "ZAR",
            unitText: "MONTH",
          },
          availability: "https://schema.org/InStock",
          url: `${SITE_URL}/#pricing`,
        })),
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <Nav />

      <main className="flex-1">
        <Hero />
        <Marquee />
        <Bento />
        <Sandbox />
        <Process />
        <Pricing />
        <BuiltByAI />
        <Faq />
        <Cta />
      </main>

      <Footer />
    </>
  );
}
