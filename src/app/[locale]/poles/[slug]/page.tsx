import { poles } from "@/lib/content/poles";
import { notFound } from "next/navigation";

interface PolePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return poles.map((pole) => ({ slug: pole.slug }));
}

export default async function PolePage({ params }: PolePageProps) {
  const { slug } = await params;
  const pole = poles.find((p) => p.slug === slug);

  if (!pole) notFound();

  return (
    <main>
      <h1>{pole.name.fr}</h1>
      <p>{pole.description.fr}</p>
    </main>
  );
}
