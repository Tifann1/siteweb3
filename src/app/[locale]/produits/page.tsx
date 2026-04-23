// Page Nos Produits — /[locale]/produits
// Carousel vertical full-screen : chaque produit occupe 100% de l'espace disponible

import { getLocale } from "next-intl/server";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCarousel } from "@/components/blocks/ProductCarousel";
import { CtaBanner } from "@/components/blocks/CtaBanner";
import { produits } from "@/lib/content/produits";
import type { Locale } from "@/types";

export default async function ProduitsPage() {
  const locale = (await getLocale()) as Locale;

  return (
    <>
      {/* Zone full-screen : header + carousel occupent exactement 100dvh */}
      <div className="h-dvh flex flex-col bg-nav-bg">
        <Header />
        <div className="flex-1 overflow-hidden relative">
          <ProductCarousel produits={produits} locale={locale} />
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
