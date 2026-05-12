import { redirect, notFound } from "next/navigation";
import { articles } from "@/lib/content/actualite";

type Props = {
  params: Promise<{ slug: string; locale: string }>;
};

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);

  if (!article) notFound();

  if (article.externalUrl) {
    redirect(article.externalUrl);
  }

  // Article interne sans URL externe : page basique
  notFound();
}
