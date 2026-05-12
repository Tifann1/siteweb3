// Page Nos Actualités — /[locale]/actualite
// Figma node 517:3422
// Composition : Header + SocialFeedSection + SectionEvenements + PodcastSection + ArticleGridClient + CtaBanner + Footer

import { getLocale } from "next-intl/server";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SocialFeedSection } from "@/components/blocks/SocialFeedSection";
import { ArticleGridClient } from "@/components/blocks/ArticleGridClient";
import { SectionEvenements } from "@/components/blocks/SectionEvenements";
import { PodcastSection } from "@/components/blocks/PodcastSection";
import { CtaBanner } from "@/components/blocks/CtaBanner";
import { articles } from "@/lib/content/actualite";
import { socialPosts } from "@/lib/content/social";
import type { Locale } from "@/types";

const EVENEMENTS = [
  {
    id: "1",
    title: "DevFun Summit 2026 — L'IA embarquée en production",
    description:
      "Nos experts partagent leurs retours d'expérience sur le déploiement d'agents IA dans des contextes industriels contraints : scalabilité, sécurité, souveraineté.",
    date: { day: "14", month: "Mai", year: "2026" },
    location: "Paris, Station F",
    tags: ["IA Générative", "Production", "DevOps"],
    ctaLabel: "S'inscrire",
    ctaHref: "/contact",
  },
  {
    id: "2",
    title: "Atelier : Concevoir votre premier agent IA métier",
    description: "Workshop pratique — de l'idée au prototype en une journée.",
    date: { day: "22", month: "Mai", year: "2026" },
    location: "Paris, Steamulo HQ",
    tags: ["Workshop", "Conseil"],
    ctaLabel: "Réserver",
    ctaHref: "/contact",
  },
  {
    id: "3",
    title: "Table ronde : Gouvernance des données & conformité IA",
    description: "Retours d'expérience secteur public & bancaire.",
    date: { day: "05", month: "Jun", year: "2026" },
    location: "En ligne",
    tags: ["Données", "Secteur Public"],
    ctaLabel: "Participer",
    ctaHref: "/contact",
  },
];

function formatDate(iso: string, locale: Locale): string {
  return new Date(iso).toLocaleDateString(locale === "fr" ? "fr-FR" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function ActualitePage() {
  const locale = (await getLocale()) as Locale;

  // Données sérialisables pour le composant client
  const gridArticles = articles.map((a) => ({
    slug: a.slug,
    title: a.title[locale],
    excerpt: a.excerpt[locale],
    category: a.category,
    tags: a.tags,
    date: formatDate(a.date, locale),
    readingTime: a.readingTime,
    imageSrc: a.imageSrc,
    videoSrc: a.videoSrc,
  }));

  return (
    <div className="bg-nav-bg min-h-screen flex flex-col">
      <Header />

      <main className="flex flex-col flex-1">
        {/* Posts LinkedIn & Instagram */}
        <section className="pb-16 md:pb-24" style={{ paddingTop: "calc(var(--header-height) + 6rem)" }}>
          <div className="max-w-[1280px] mx-auto px-6 md:px-8">
            <SocialFeedSection posts={socialPosts} />
          </div>
        </section>

        {/* Événements */}
        <SectionEvenements items={EVENEMENTS} ctaAllLabel="" />

        {/* Section podcast — full width, gère son propre py */}
        <PodcastSection
          episode={{
            episodeTitle: "EP.3 : L'Usine Cognitive",
            guests: "Avec Thibault & Baptiste @devops",
            duration: "12:01",
            progress: 33,
            listenHref: "https://link.deezer.com/s/33c2PzH1azKGs41vNBz6y",
          }}
        />

        {/* Grille paginée avec filtre par tags */}
        <section className="py-16 md:py-24 border-t border-white/5">
          <div className="max-w-[1280px] mx-auto px-6 md:px-8">
            <ArticleGridClient articles={gridArticles} locale={locale} />
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
