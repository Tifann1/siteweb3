import { references } from "@/lib/content/references";

export default function ReferencesPage() {
  return (
    <main>
      <h1>Nos Références</h1>
      <ul>
        {references.map((ref) => (
          <li key={ref.slug}>{ref.client}</li>
        ))}
      </ul>
    </main>
  );
}
