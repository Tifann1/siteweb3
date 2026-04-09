import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/blocks/HeroSection";
import { LogoBanner } from "@/components/blocks/LogoBanner";
import { ReferenceFilterBar } from "@/components/blocks/ReferenceFilterBar";
import { ReferenceCard } from "@/components/ui/ReferenceCard";
import { CtaBanner } from "@/components/blocks/CtaBanner";

// ⚠ URLs Figma — expirent dans 7 jours. Remplacer par /public/logos/*.svg
const LOGOS = [
  { src: "https://www.figma.com/api/mcp/asset/d9a151b0-64b3-434f-a0e8-7aeaedc4a979", alt: "BPCE", width: 80, height: 30 },
  { src: "https://www.figma.com/api/mcp/asset/fe39d568-7ded-429a-aa13-cb9eeb416316", alt: "FDJ", width: 56, height: 30 },
  { src: "https://www.figma.com/api/mcp/asset/09c78de8-41cc-4128-8757-b595262877f4", alt: "La Poste", width: 45, height: 30 },
  { src: "https://www.figma.com/api/mcp/asset/faac9ff6-0aa8-4139-88a7-f70f9e28316e", alt: "Bienveo", width: 67, height: 30 },
  { src: "https://www.figma.com/api/mcp/asset/7ba0dc93-54fb-417b-83a0-fecd0bc758c5", alt: "Marketpay", width: 26, height: 30 },
  { src: "https://www.figma.com/api/mcp/asset/2f5a6c4d-6360-4168-9e29-658b7161544d", alt: "SNCF", width: 60, height: 30 },
];

const FILTER_ROWS = [
  [
    { label: "Conseil", value: "conseil" },
    { label: "Développement", value: "dev" },
    { label: "DevOps", value: "devops" },
    { label: "IA & Data", value: "ia-data" },
  ],
  [
    { label: "Forfait", value: "forfait" },
    { label: "Régie", value: "regie" },
  ],
];

// ⚠ URLs Figma — expirent dans 7 jours. Remplacer par /public/images/references/*.jpg
const IMG_1 = "https://www.figma.com/api/mcp/asset/94c97a9d-b97a-492b-ad54-3e2933f7afcb";
const IMG_2 = "https://www.figma.com/api/mcp/asset/9be197ac-f669-4021-97e4-5da29d992b54";
const IMG_3 = "https://www.figma.com/api/mcp/asset/dd421d27-52a2-4f71-8db6-bd18d6efa734";
const IMG_4 = "https://www.figma.com/api/mcp/asset/a19bb380-f224-4a6b-abdb-50c20524db02";
const LOGO_ARMATIS = "https://www.figma.com/api/mcp/asset/4a95adec-0269-469c-aca1-6d505a75c0ce";

const REFERENCE_CARDS = [
  {
    imageSrc: IMG_1,
    imageAlt: "Optimisation supply chain Armatis",
    logoSrc: LOGO_ARMATIS,
    logoAlt: "Armatis Technology",
    category: "IA & Intelligence Artificielle",
    title: "Optimisation IA de la Supply Chain",
    statValue: "+24%",
    statLabel: "Productivité logistique globale",
    ctaHref: "/references/armatis-supply-chain",
  },
  {
    imageSrc: IMG_2,
    imageAlt: "Application métier Armatis",
    logoSrc: LOGO_ARMATIS,
    logoAlt: "Armatis Technology",
    category: "IA & Intelligence Artificielle",
    title: "Application métier augmentée de suivi de qualité",
    statValue: "+24%",
    statLabel: "Productivité logistique globale",
    ctaHref: "/references/armatis-qualite",
  },
  {
    imageSrc: IMG_3,
    imageAlt: "Optimisation IA",
    logoSrc: LOGO_ARMATIS,
    logoAlt: "Armatis Technology",
    category: "IA & Intelligence Artificielle",
    title: "Optimisation IA de la Supply Chain",
    statValue: "+24%",
    statLabel: "Productivité logistique globale",
    ctaHref: "/references/armatis-ia",
  },
  {
    imageSrc: IMG_4,
    imageAlt: "Projet secteur public",
    logoSrc: LOGO_ARMATIS,
    logoAlt: "Armatis Technology",
    category: "IA & Intelligence Artificielle",
    title: "Optimisation IA de la Supply Chain",
    statValue: "+24%",
    statLabel: "Productivité logistique globale",
    ctaHref: "/references/armatis-public",
  },
];

export default function AllReferencesPage() {
  return (
    <div className="min-h-screen bg-deep-navy flex flex-col">
      <Header ctaLabel="Je lance mon projet" ctaHref="/#contact" />

      <main className="flex flex-col gap-[120px] pb-[80px]">
        {/* Hero */}
        <section className="relative px-[120px] pt-6">
          <HeroSection
            eyebrow="NOS ÉTUDES DE CAS & RÉFÉRENCES"
            title="L'ingénieur\naugmenté au service\nde vos ambitions."
            highlightWord="augmenté"
            description="Nous fusionnons expertise technique industrielle et innovation numérique pour bâtir des solutions robustes, agiles et performantes."
          />
          {/* Bandeau logos */}
          <div className="mt-10">
            <LogoBanner logos={LOGOS} duration={25} />
          </div>
        </section>

        {/* Filtres + grille de références */}
        <section className="flex flex-col gap-[120px] items-start px-8 w-full">
          {/* Filtres */}
          <ReferenceFilterBar
            rows={FILTER_ROWS}
            defaultActive={["dev", "ia-data"]}
          />

          {/* Grille */}
          <div className="grid grid-cols-3 gap-5 w-full">
            {REFERENCE_CARDS.map((card, i) => (
              <ReferenceCard key={i} {...card} />
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <section className="px-8">
          <CtaBanner
            title="Prêt à augmenter\nvos projets ?"
            description="Nos experts sont prêts à auditer votre stratégie et à identifier vos premiers leviers d'accélération IA."
            primaryLabel="Parlons de votre projet"
            primaryHref="/#contact"
            secondaryLabel="Voir nos offres"
            secondaryHref="/#offres"
          />
        </section>
      </main>

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
