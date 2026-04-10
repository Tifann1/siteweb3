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
    <div className="bg-nav-bg min-h-screen flex flex-col">
      {/* Blobs décoratifs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute size-96 rounded-full bg-brand-orange-light/10 blur-[60px] left-1/2 translate-x-1/4 top-[10%]" />
        <div className="absolute size-[500px] rounded-full bg-badge-blue/5 blur-[75px] right-1/3 top-[5%]" />
      </div>

      <Header />

      <main className="relative flex flex-col flex-1">
        {/* Nom du produit */}
        <section className="pt-16 md:pt-24 pb-8">
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

            {/* Fonctionnalités dépliables */}
            <FeatureAccordion
              features={produit.features.map((f) => ({
                title: f.title[locale],
                description: f.description?.[locale],
              }))}
              defaultOpen={1}
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
