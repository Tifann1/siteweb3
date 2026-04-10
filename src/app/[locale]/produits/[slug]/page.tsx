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

      <main className="relative flex flex-col flex-1 gap-[50px] pt-[70px] pb-[80px]">
        {/* Nom du produit */}
        <div className="px-[79px]">
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

        {/* Section principale : showcase + accordéon */}
        <div className="flex flex-col gap-[50px] px-[79px]">
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

        {/* CTA bas de page */}
        <div className="px-8 pt-[30px]">
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
