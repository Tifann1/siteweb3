import { produits } from "@/lib/content/produits";

export default function ProduitsPage() {
  return (
    <main>
      <h1>Nos Produits</h1>
      <ul>
        {produits.map((produit) => (
          <li key={produit.slug}>{produit.name.fr}</li>
        ))}
      </ul>
    </main>
  );
}
