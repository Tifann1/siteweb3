import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ContactForm } from "@/components/blocks/ContactForm";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-deep-navy flex flex-col">
      <Header />

      <main className="flex flex-col flex-1 items-center justify-center py-20 md:py-28">
        <div
          className="flex flex-col gap-12 items-center w-full"
          style={{ paddingLeft: "var(--page-margin-x)", paddingRight: "var(--page-margin-x)" }}
        >
          {/* En-tête */}
          <div className="flex flex-col gap-4 items-center text-center max-w-[640px]">
            <h1
              className="font-sans font-bold text-text-heading"
              style={{ fontSize: "var(--text-card-title)", lineHeight: "var(--text-card-title--line-height)" }}
            >
              Parlons de votre projet
            </h1>
            <p
              className="font-sans text-text-body-warm opacity-80"
              style={{ fontSize: "var(--text-body-lg)", lineHeight: "var(--text-body-lg--line-height)" }}
            >
              Décrivez-nous votre besoin et un expert DevFun vous répondra sous 24 heures.
            </p>
          </div>

          {/* Formulaire */}
          <ContactForm />
        </div>
      </main>

      <Footer />
    </div>
  );
}
