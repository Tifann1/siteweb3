import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/blocks/HeroSection";
import { LogoBanner } from "@/components/blocks/LogoBanner";
import { ProjectForm } from "@/components/blocks/ProjectForm";
import { OffersSection } from "@/components/blocks/OffersSection";
import { CtaBanner } from "@/components/blocks/CtaBanner";

const LOGOS = [
  { src: "/images/logos/bpce.svg", alt: "BPCE", width: 80, height: 30 },
  { src: "/images/logos/fdj.svg", alt: "FDJ", width: 56, height: 30 },
  { src: "/images/logos/laposte.svg", alt: "La Poste", width: 45, height: 30 },
  { src: "/images/logos/bienveo.png", alt: "Bienveo", width: 67, height: 30 },
  { src: "/images/logos/marketpay.svg", alt: "Marketpay", width: 26, height: 30 },
  { src: "/images/logos/sncf.svg", alt: "SNCF", width: 60, height: 30 },
  { src: "/images/logos/carrefour.svg", alt: "Carrefour", width: 100, height: 30 },
  { src: "/images/logos/inpi.svg", alt: "INPI", width: 55, height: 30 },
];

const PROMISES = [
  "Acteur Français au cœur de Paris.",
  "Une solution sur-mesure, clés en main.",
  "Un référent dédié pour votre projet.",
  "Excellence technique.",
  "Travailler avec des ingénieurs augmentés.",
  "Découper un besoin complexe.",
];

export default function HomeFigmaPage() {
  return (
    <div className="min-h-screen bg-deep-navy flex flex-col">
      <Header ctaLabel="Accélérer mon projet" ctaHref="/#contact" />

      <main className="flex flex-col flex-1">
        {/* Hero */}
        <HeroSection
          eyebrow="VOS AGENTS IA, CONÇUS POUR LE TERRAIN"
          title="L'ingénieur\naugmenté au service\nde vos ambitions."
          highlightWord="augmenté"
          description="Nous imaginons et déployons des agents IA sur mesure, connectés à vos usages, pour accélérer vos opérations et renforcer votre impact."
        />

        {/* Bandeau logos clients — full width */}
        <div className="py-10">
          <LogoBanner logos={LOGOS} duration={20} />
        </div>

        {/* Formulaire projet */}
        <section className="py-20 md:py-28">
          <div className="max-w-[1280px] mx-auto px-6 md:px-8 flex justify-center">
            <ProjectForm ctaLabel="Partager mon projet !" />
          </div>
        </section>

        {/* Offres — full width, gère son propre py */}
        <OffersSection title="Nos offres adaptables." />

        {/* Nos promesses */}
        <section className="py-20 md:py-28">
          <div className="max-w-[1280px] mx-auto px-6 md:px-8 flex flex-col gap-14 items-center">
            <h2
              className="font-sans font-bold text-white text-center"
              style={{
                fontSize: "var(--text-card-title)",
                lineHeight: "var(--text-card-title--line-height)",
              }}
            >
              Nos promesses.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-[960px] divide-y divide-white/10">
              {PROMISES.map((promise, i) => (
                <div
                  key={i}
                  className={[
                    "py-7 font-sans text-text-heading",
                    i % 2 === 0
                      ? "md:pr-10 md:border-r border-white/10"
                      : "md:pl-10",
                  ].join(" ")}
                  style={{
                    fontSize: "var(--text-nav)",
                    lineHeight: "var(--text-nav--line-height)",
                  }}
                >
                  {promise}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-16 md:py-24">
          <div className="max-w-[1280px] mx-auto px-6 md:px-8">
            <CtaBanner
              title="Prêt à augmenter\nvos projets ?"
              description="Nos experts sont prêts à auditer votre stratégie et à identifier vos premiers leviers d'accélération IA."
              primaryLabel="Parlons de votre projet"
              primaryHref="/contact"
              secondaryLabel="Voir nos offres"
              secondaryHref="/#offres"
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
