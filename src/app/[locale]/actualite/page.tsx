import { articles } from "@/lib/content/actualite";

export default function ActualitePage() {
  return (
    <main>
      <h1>Notre Actualité</h1>
      <ul>
        {articles.map((article) => (
          <li key={article.slug}>{article.title.fr}</li>
        ))}
      </ul>
    </main>
  );
}
