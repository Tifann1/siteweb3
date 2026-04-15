import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/blocks/HeroSection";
import { LogoBanner } from "@/components/blocks/LogoBanner";
import { ReferenceFilterBar } from "@/components/blocks/ReferenceFilterBar";
import { ReferenceCard } from "@/components/ui/ReferenceCard";
import { CtaBanner } from "@/components/blocks/CtaBanner";

const LOGOS = [
  { src: "/images/logos/bpce.svg", alt: "BPCE", width: 80, height: 30 },
  { src: "/images/logos/fdj.svg", alt: "FDJ", width: 56, height: 30 },
  { src: "/images/logos/laposte.svg", alt: "La Poste", width: 45, height: 30 },
  { src: "/images/logos/bienveo.png", alt: "Bienveo", width: 67, height: 30 },
  { src: "/images/logos/marketpay.svg", alt: "Marketpay", width: 26, height: 30 },
  { src: "/images/logos/sncf.svg", alt: "SNCF", width: 60, height: 30 },
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

const IMG_1 = "/images/references/inpi.webp";
const IMG_2 = "/images/references/collabs.png";
const IMG_3 = "/images/references/laposte.jpg";
const IMG_4 = "/images/references/france-competences.jpg";
const IMG_5 = "/images/references/inpi-2.webp";

const REFERENCE_CARDS = [
  {
    imageSrc: IMG_5,
    imageAlt: "Armatis — Déploiement IA à grande échelle",
    logoSrc: "/images/Références/armatis-logo-png_seeklogo-589939.png",
    logoAlt: "Armatis",
    category: "IA & Conseil",
    title: "Armatis, le déploiement de l'IA à grande échelle",
    statValue: "×3",
    statLabel: "Vitesse de livraison",
    ctaHref: "/references/test",
  },
  {
    imageSrc: IMG_1,
    imageAlt: "Dématérialisation des procédures INPI",
    logoSrc: "/images/Logos blancs/INPI_LOGO_SITE.png",
    logoAlt: "INPI",
    category: "Développement & Conseil",
    title: "Dématérialisation des procédures de propriété intellectuelle",
    statValue: "+35%",
    statLabel: "Réduction des délais de traitement",
    ctaHref: "/references/armatis-supply-chain",
  },
  {
    imageSrc: IMG_3,
    imageAlt: "Modernisation SI La Poste",
    logoSrc: "/images/Logos blancs/LAPOSTE_LOGO_SITE.svg",
    logoAlt: "La Poste",
    category: "Infrastructure & DevOps",
    title: "Modernisation et migration de l'infrastructure SI",
    statValue: "-45%",
    statLabel: "Coûts d'exploitation",
    ctaHref: "/references/armatis-qualite",
  },
  {
    imageSrc: IMG_4,
    imageAlt: "Portail numérique France Compétences",
    logoSrc: "/images/Logos blancs/FRANCE_COMPETENCES_LOGO_SITE.svg",
    logoAlt: "France Compétences",
    category: "Conseil & Transformation",
    title: "Portail numérique de certification des compétences",
    statValue: "+89%",
    statLabel: "Satisfaction des utilisateurs",
    ctaHref: "/references/armatis-ia",
  },
  {
    imageSrc: IMG_2,
    imageAlt: "Plateforme BPCE",
    logoSrc: "/images/Logos blancs/BPCE_LOGO_SITE.svg",
    logoAlt: "BPCE",
    category: "IA & Intelligence Artificielle",
    title: "Plateforme de recommandation personnalisée pour les clients",
    statValue: "×2,4",
    statLabel: "Taux d'engagement client",
    ctaHref: "/references/armatis-public",
  },
];

export default function ReferencesPage() {
  return (
    <div className="min-h-screen bg-nav-bg flex flex-col">
      <Header ctaLabel="Je lance mon projet" ctaHref="/#contact" />

      <main className="flex flex-col flex-1">
        {/* Hero */}
        <HeroSection
          eyebrow="NOS ÉTUDES DE CAS & RÉFÉRENCES"
          title={"L'ingénieur\naugmenté au service\nde vos ambitions."}
          highlightWord="augmenté"
          description="Nous fusionnons expertise technique industrielle et innovation numérique pour bâtir des solutions robustes, agiles et performantes."
        />

        {/* Bandeau logos */}
        <div className="py-10">
          <LogoBanner logos={LOGOS} duration={25} />
        </div>

        {/* Filtres + grille de références */}
        <section className="py-20 md:py-28">
          <div className="max-w-[1280px] mx-auto px-6 md:px-8 flex flex-col gap-12">
            <ReferenceFilterBar
              rows={FILTER_ROWS}
              defaultActive={["dev", "ia-data"]}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {REFERENCE_CARDS.map((card, i) => (
                <ReferenceCard key={i} {...card} />
              ))}
            </div>
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
              secondaryLabel="Voir nos offres"
              secondaryHref="/contact"
            />
          </div>
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
