import { references } from "@/lib/content/references";
import { notFound } from "next/navigation";

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
    <main>
      <h1>{reference.client}</h1>
      <p>{reference.description.fr}</p>
    </main>
  );
}
