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

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faq.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: { "@type": "Answer", text: item.a },
            })),
          }),
        }}
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
