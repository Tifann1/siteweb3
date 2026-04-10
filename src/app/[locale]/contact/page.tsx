import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Link } from "@/navigation";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-deep-navy flex flex-col">
      <Header />

      <main className="flex flex-col flex-1 items-center justify-center">
        <div
          className="flex flex-col gap-8 items-start"
          style={{ paddingLeft: "var(--page-margin-x)", paddingRight: "var(--page-margin-x)" }}
        >
          <Link
            href="/"
            className="flex items-center gap-2 text-text-light font-sans transition-opacity hover:opacity-80"
            style={{ fontSize: "var(--text-nav)" }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Retour
          </Link>

          <h1
            className="font-sans font-bold text-white"
            style={{ fontSize: "var(--text-card-title)", lineHeight: "var(--text-card-title--line-height)" }}
          >
            Parlons de votre projet
          </h1>

          <p
            className="font-sans text-text-body-warm max-w-[600px]"
            style={{ fontSize: "var(--text-body-lg)", lineHeight: "var(--text-body-lg--line-height)" }}
          >
            Cette page est en cours de construction. Notre équipe reviendra vers vous prochainement.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
