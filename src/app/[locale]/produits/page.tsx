// Page Nos Produits — /[locale]/produits
// Figma node 519:3930
// Composition de : HeroSection (compact) + ProductCard[] + CtaBanner + Header/Footer

import { getLocale } from "next-intl/server";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/blocks/HeroSection";
import { ProductCard } from "@/components/blocks/ProductCard";
import { CtaBanner } from "@/components/blocks/CtaBanner";
import { produits } from "@/lib/content/produits";
import type { Locale } from "@/types";

export default async function ProduitsPage() {
  const locale = (await getLocale()) as Locale;

  return (
    <div className="bg-nav-bg min-h-screen flex flex-col">
      <Header />

      <main className="flex flex-col flex-1 gap-[65px] pt-[70px]">
        {/* Hero */}
        <HeroSection
          eyebrow="NOS PRODUITS IA, PENSÉS POUR LE TERRAIN"
          title={`Des produits IA conçus pour\nvos usages métier.`}
          highlightWord="usages"
          highlightStyle="solid"
          highlightColor="#FBA275"
          description="Nous créons des agents IA robustes, utiles et déployables, pensés pour automatiser, assister et accélérer vos opérations."
          titleSize="compact"
        />

        {/* Liste des produits */}
        <section className="flex flex-col gap-[30px] px-[152px]">
          {produits.map((produit) => (
            <ProductCard
              key={produit.slug}
              name={produit.name[locale]}
              description={produit.description[locale]}
              stats={produit.stats.map((s) => ({
                value: s.value,
                label: s.label[locale],
              }))}
              backgroundImage={produit.backgroundImage}
              badge={produit.badge?.[locale]}
              ctaHref={`/produits/${produit.slug}`}
            />
          ))}
        </section>

        {/* CTA bas de page */}
        <div className="px-8 pb-16">
          <CtaBanner />
        </div>
      </main>

      <Footer
        socials={{
          github: "https://github.com/steamulo",
          instagram: "https://instagram.com/steamulo",
          linkedin: "https://linkedin.com/company/steamulo",
        }}
      />
    </div>
  );
}
