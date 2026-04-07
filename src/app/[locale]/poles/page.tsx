import { poles } from "@/lib/content/poles";

export default function PolesPage() {
  return (
    <main>
      <h1>Nos Pôles</h1>
      <ul>
        {poles.map((pole) => (
          <li key={pole.slug}>{pole.name.fr}</li>
        ))}
      </ul>
    </main>
  );
}
