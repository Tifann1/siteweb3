import { getLocale } from "next-intl/server";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AgentCarousel } from "@/components/blocks/AgentCarousel";
import { CtaBanner } from "@/components/blocks/CtaBanner";
import { agents } from "@/lib/content/agents";
import { produits } from "@/lib/content/produits";
import type { Locale } from "@/types";

type SearchParams = Promise<{ from?: string }>;

export default async function AgentsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const locale = (await getLocale()) as Locale;
  const params = await searchParams;
  const fromProduitSlug = params.from;

  const initialIndex = fromProduitSlug
    ? Math.max(0, agents.findIndex((a) => a.produitSlug === fromProduitSlug))
    : 0;

  return (
    <>
      {/* Zone full-screen : header + carousel occupent exactement 100dvh */}
      <div className="h-dvh flex flex-col bg-nav-bg">
        <Header />
        <div className="flex-1 overflow-hidden relative">
          <AgentCarousel
            agents={agents}
            produits={produits}
            locale={locale}
            initialIndex={initialIndex}
          />
        </div>
      </div>

      {/* Suite de la page — scroll normal */}
      <div className="bg-nav-bg">
        <section className="py-16 md:py-24">
          <div className="max-w-[1280px] mx-auto px-6 md:px-8">
            <CtaBanner />
          </div>
        </section>

        <Footer
          socials={{
            github: "https://github.com/steamulo",
            instagram: "https://instagram.com/steamulo",
            linkedin: "https://linkedin.com/company/steamulo",
          }}
        />
      </div>
    </>
  );
}
