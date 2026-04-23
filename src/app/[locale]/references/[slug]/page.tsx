import { references } from "@/lib/content/references";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import { ReferenceHero } from "@/components/blocks/ReferenceHero";
import { QuoteBlock } from "@/components/blocks/QuoteBlock";
import { CtaBanner } from "@/components/blocks/CtaBanner";

interface ReferencePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return references.map((ref) => ({ slug: ref.slug }));
}

export default async function ReferencePage({ params }: ReferencePageProps) {
  const { slug } = await params;
  const reference = references.find((r) => r.slug === slug);

  if (!reference) notFound();

  return (
    <div className="min-h-screen bg-deep-navy flex flex-col">
      <Header ctaLabel="Je lance mon projet" ctaHref="/contact" />

      <PageTransition className="flex flex-col flex-1">
      <main className="flex flex-col flex-1">
        {/* Hero avec image de la référence en fond */}
        <ReferenceHero
          eyebrow={`ÉTUDE DE CAS : ${reference.client.toUpperCase()}`}
          title={reference.client}
          highlightPhrase={reference.client}
          description={reference.description.fr}
          backgroundImageSrc={reference.imageSrc}
          backgroundImageAlt={reference.client}
        />

        {/* Citation extraite de la description */}
        <section className="py-20 md:py-28">
          <div className="max-w-[1280px] mx-auto px-6 md:px-8 flex flex-col gap-6">
            <QuoteBlock
              quote={reference.description.fr}
            />
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-16 md:py-24">
          <div className="max-w-[1280px] mx-auto px-6 md:px-8">
            <CtaBanner
              title={"Prêt à augmenter\nvos projets ?"}
              description="Nos experts sont prêts à auditer votre stratégie et à identifier vos premiers leviers d'accélération IA."
              primaryLabel="Parlons de votre projet"
              primaryHref="/contact"
              secondaryLabel="Voir nos références"
              secondaryHref="/references"
            />
          </div>
        </section>
      </main>
      </PageTransition>

      <Footer
        copyright="©2025 Steamulo"
        address="14 rue Auber - 75009 Paris"
        socials={{
          linkedin: "https://linkedin.com/company/steamulo",
          instagram: "https://instagram.com/steamulo",
          github: "https://github.com/steamulo",
        }}
      />
    </div>
  );
}
