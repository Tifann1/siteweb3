import { references } from "@/lib/content/references";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import { ReferenceHero } from "@/components/blocks/ReferenceHero";
import { LogoBanner, type LogoItem } from "@/components/blocks/LogoBanner";
import { QuoteBentoSection } from "@/components/blocks/QuoteBentoSection";
import { AugmentedSection } from "@/components/blocks/AugmentedSection";
import { CtaBanner } from "@/components/blocks/CtaBanner";

const PARTNER_LOGOS: LogoItem[] = [
  { src: "/images/logos/carrefour.svg", alt: "Carrefour", width: 100, height: 30 },
  { src: "/images/logos/inpi.svg",      alt: "INPI",      width: 55,  height: 30 },
  { src: "/images/logos/bpce.svg",      alt: "BPCE",      width: 80,  height: 30 },
  { src: "/images/logos/fdj.svg",       alt: "FDJ",       width: 50,  height: 30 },
  { src: "/images/logos/laposte.svg",   alt: "La Poste",  width: 90,  height: 30 },
  { src: "/images/logos/bienveo.png",   alt: "Bienveo",   width: 80,  height: 30 },
  { src: "/images/logos/marketpay.svg", alt: "MarketPay", width: 100, height: 30 },
];

interface ReferencePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return references.map((ref) => ({ slug: ref.slug }));
}

export default async function ReferencePage({ params }: ReferencePageProps) {
  const { slug } = await params;
  const ref = references.find((r) => r.slug === slug);

  if (!ref) notFound();

  return (
    <div className="min-h-screen bg-deep-navy flex flex-col">
      <Header ctaLabel="Je lance mon projet" ctaHref="/contact" />

      <PageTransition className="flex flex-col flex-1">
        <main className="flex flex-col gap-[120px] px-[32px] pb-[80px]">
          <ReferenceHero
            eyebrow={`ÉTUDE DE CAS : ${ref.client.toUpperCase()}`}
            title={ref.client}
            highlightPhrase={ref.client}
            description={ref.description.fr}
            backgroundImageSrc={ref.imageSrc ?? "/images/references/inpi.webp"}
            backgroundImageAlt={ref.client}
          />

          <div className="py-10">
            <LogoBanner logos={PARTNER_LOGOS} duration={25} />
          </div>

          <div className="w-full max-w-[1045px] mx-auto">
            <QuoteBentoSection
              quote={ref.quote}
              attribution={ref.quoteAttribution}
              expertImageSrc={ref.expert.imageSrc}
              expertImageAlt={ref.expert.name}
              expertName={ref.expert.name}
              expertRole={ref.expert.role}
              expertBio={ref.expert.bio}
              featureCardTitle={ref.featureCard?.title ?? "Notre approche"}
              featureItems={ref.featureCard?.items ?? []}
              ethosTitle={ref.ethos?.title ?? "Notre engagement"}
              ethosDescription={
                ref.ethos?.description ??
                "Nous mettons notre expertise technique au service de vos ambitions, avec une exigence de qualité qui ne souffre aucun compromis."
              }
              stats={ref.stats ?? []}
              brandName="DevFun"
              brandSubtitle="L'Ingénieur Augmenté"
              brandCtaLabel="Voir nos offres"
            />
          </div>

          {ref.augmented && (
            <section className="w-full max-w-[1165px] mx-auto">
              <AugmentedSection
                eyebrow={ref.augmented.eyebrow}
                title={ref.augmented.title}
                description={ref.augmented.description}
                features={ref.augmented.features}
                steps={ref.augmented.steps}
              />
            </section>
          )}

          <section className="w-full max-w-[1101px] mx-auto">
            <CtaBanner
              title={"Prêt à augmenter\nvos projets ?"}
              description="Nos experts sont prêts à auditer votre stratégie et à identifier vos premiers leviers d'accélération IA."
              primaryLabel="Parlons de votre projet"
              primaryHref="/contact"
              secondaryLabel="Voir nos références"
              secondaryHref="/references"
            />
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
