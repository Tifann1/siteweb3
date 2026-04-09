import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/blocks/HeroSection";
import { LogoBanner } from "@/components/blocks/LogoBanner";
import { ProjectForm } from "@/components/blocks/ProjectForm";
import { OffersSection } from "@/components/blocks/OffersSection";
import { CtaBanner } from "@/components/blocks/CtaBanner";

// ⚠ URLs Figma — expirent dans 7 jours. Remplacer par /public/logos/*.svg
const LOGOS = [
  { src: "https://www.figma.com/api/mcp/asset/b3695da5-91b5-4548-bc5a-e738a9f78b2c", alt: "BPCE", width: 80, height: 30 },
  { src: "https://www.figma.com/api/mcp/asset/3370ee1f-648c-4bfb-a1dd-dde169b4f2ec", alt: "FDJ", width: 56, height: 30 },
  { src: "https://www.figma.com/api/mcp/asset/99fa4be5-c53a-4aca-8be6-ad746fdc9a64", alt: "La Poste", width: 45, height: 30 },
  { src: "https://www.figma.com/api/mcp/asset/7afb6c4b-1a64-43c2-ad29-0b901a84ee33", alt: "Bienveo", width: 67, height: 30 },
  { src: "https://www.figma.com/api/mcp/asset/ef869ad3-92f4-43eb-8444-6da8815946b9", alt: "Marketpay", width: 26, height: 30 },
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

      <main className="flex flex-col">
        {/* Hero */}
        <section className="mt-6">
          <HeroSection
            eyebrow="VOS AGENTS IA, CONÇUS POUR LE TERRAIN"
            title="L'ingénieur\naugmenté au service\nde vos ambitions."
            highlightWord="augmenté"
            description="Nous imaginons et déployons des agents IA sur mesure, connectés à vos usages, pour accélérer vos opérations et renforcer votre impact."
          />
        </section>

        {/* Bandeau logos clients */}
        <section className="mt-10">
          <LogoBanner logos={LOGOS} duration={20} />
        </section>

        {/* Formulaire projet */}
        <section className="mt-16 flex justify-center px-6">
          <ProjectForm ctaLabel="Partager mon projet !" />
        </section>

        {/* Offres */}
        <section className="mt-24">
          <OffersSection title="Nos offres adaptables." />
        </section>

        {/* Nos promesses */}
        <section className="mt-24 py-20 px-20 flex flex-col gap-14 items-center">
          <h2
            className="font-sans font-bold text-white text-center"
            style={{
              fontSize: "var(--text-card-title)",
              lineHeight: "var(--text-card-title--line-height)",
            }}
          >
            Nos promesses.
          </h2>
          <div className="grid grid-cols-2 w-full max-w-[960px] divide-y divide-white/10">
            {PROMISES.map((promise, i) => (
              <div
                key={i}
                className={[
                  "py-7 font-sans text-text-heading",
                  i % 2 === 0
                    ? "pr-10 border-r border-white/10"
                    : "pl-10",
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
        </section>

        {/* CTA Banner */}
        <section className="mt-16 px-20 pb-24">
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
