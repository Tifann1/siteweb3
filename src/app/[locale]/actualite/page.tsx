// Page Nos Actualités — /[locale]/actualite
// Figma node 517:3422
// Composition : Header + ArticlesFeaturedSection + PodcastSection + CtaBanner + Footer

import { getLocale } from "next-intl/server";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ArticlesFeaturedSection } from "@/components/blocks/ArticlesFeaturedSection";
import { PodcastSection } from "@/components/blocks/PodcastSection";
import { CtaBanner } from "@/components/blocks/CtaBanner";
import { articles } from "@/lib/content/actualite";
import type { Locale } from "@/types";

function formatDate(iso: string, locale: Locale): string {
  return new Date(iso).toLocaleDateString(locale === "fr" ? "fr-FR" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function ActualitePage() {
  const locale = (await getLocale()) as Locale;

  const [featured, ...rest] = articles;

  return (
    <div className="bg-nav-bg min-h-screen flex flex-col">
      <Header />

      <main className="flex flex-col flex-1">
        {/* Grille article featured + sidebar récents */}
        {featured && (
          <section className="pb-16 md:pb-24" style={{ paddingTop: "calc(var(--header-height) + 3rem)" }}>
            <div className="max-w-[1280px] mx-auto px-6 md:px-8">
              <ArticlesFeaturedSection
                featured={{
                  imageSrc: featured.imageSrc ?? "/images/actualite/placeholder.jpg",
                  category: featured.category,
                  date: formatDate(featured.date, locale),
                  readingTime: featured.readingTime,
                  title: featured.title[locale],
                  excerpt: featured.excerpt[locale],
                  ctaHref: `/actualite/${featured.slug}`,
                }}
                recentArticles={rest.map((a) => ({
                  imageSrc: a.imageSrc ?? "/images/actualite/placeholder.jpg",
                  category: a.category,
                  title: a.title[locale],
                  href: `/actualite/${a.slug}`,
                }))}
              />
            </div>
          </section>
        )}

        {/* Section podcast — full width, gère son propre py */}
        <PodcastSection
          episode={{
            episodeTitle: "EP.3 : L'Usine Cognitive",
            guests: "Avec Thibault & Baptiste @devops",
            duration: "12:01",
            progress: 33,
          }}
        />

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
