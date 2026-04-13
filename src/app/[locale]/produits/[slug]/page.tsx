// Page détail produit — /[locale]/produits/[slug]
// Figma node 532:3950
// Composition : Header + titre + ProductShowcase + FeatureAccordion + CtaBanner + Footer

import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductShowcase } from "@/components/blocks/ProductShowcase";
import { FeatureAccordion } from "@/components/blocks/FeatureAccordion";
import { CtaBanner } from "@/components/blocks/CtaBanner";
import { produits } from "@/lib/content/produits";
import type { Locale } from "@/types";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return produits.map((p) => ({ slug: p.slug }));
}

export default async function ProduitDetailPage({ params }: Props) {
  const { slug } = await params;
  const locale = (await getLocale()) as Locale;

  const produit = produits.find((p) => p.slug === slug);
  if (!produit) notFound();

  const showcaseImageSrc =
    produit.showcaseImage ?? produit.backgroundImage;

  return (
    <div className="relative bg-nav-bg min-h-screen flex flex-col overflow-hidden">
      {/* Background image + gradient horizontal */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0">
          <img
            src={produit.backgroundImage}
            alt=""
            className="h-full w-full object-cover object-center opacity-30"
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, var(--color-nav-bg) 0%, rgba(4,9,54,0.85) 40%, rgba(4,9,54,0.3) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(4,9,54,0) 60%, var(--color-nav-bg) 100%)",
          }}
        />
      </div>

      <Header />

      <main className="relative z-10 flex flex-col flex-1">
        {/* Nom du produit — margin top pour le header fixe */}
        <section className="pb-8" style={{ paddingTop: "calc(var(--header-height) + 3rem)" }}>
          <div className="max-w-[1280px] mx-auto px-6 md:px-8">
            <h1
              className="font-sans font-bold text-white"
              style={{
                fontSize: "var(--text-card-title)",
                lineHeight: "var(--text-card-title--line-height)",
              }}
            >
              {produit.name[locale]}.
            </h1>
          </div>
        </section>

        {/* Section principale : showcase + accordéon */}
        <section className="py-8 md:py-12">
          <div className="max-w-[1280px] mx-auto px-6 md:px-8 flex flex-col gap-12">
            {/* Carte image + question */}
            <ProductShowcase
              imageSrc={showcaseImageSrc}
              title={produit.showcaseTitle?.[locale] ?? "A quoi ça sert ?"}
              description={
                produit.showcaseDescription?.[locale] ?? produit.description[locale]
              }
              ctaHref="/#contact"
            />

            {/* Fonctionnalités dépliables — toutes repliées au départ */}
            <FeatureAccordion
              features={produit.features.map((f) => ({
                title: f.title[locale],
                description: f.description?.[locale],
              }))}
              defaultOpen={-1}
            />
          </div>
        </section>

        {/* CTA bas de page */}
        <section className="py-16 md:py-24">
          <div className="max-w-[1280px] mx-auto px-6 md:px-8">
            <CtaBanner />
          </div>
        </section>
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
