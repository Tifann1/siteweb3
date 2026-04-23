export type Locale = "fr" | "en";

export type LocalizedString = {
  fr: string;
  en: string;
};

export interface Pole {
  slug: string;
  name: LocalizedString;
  description: LocalizedString;
  services: LocalizedString[];
}

export interface Reference {
  slug: string;
  client: string;
  category: string[];
  description: LocalizedString;
  year: number;
  /** Chemin vers l'image de la référence (dans /public) */
  imageSrc?: string;
  /** Logo du client */
  logoSrc?: string;
}

export interface ProduitStat {
  value: string;
  label: LocalizedString;
}

export interface ProduitFeature {
  title: LocalizedString;
  description?: LocalizedString;
}

export interface Produit {
  slug: string;
  name: LocalizedString;
  /** Description courte (carte listing) */
  description: LocalizedString;
  /** Description longue pour la page de détail (showcase) */
  showcaseDescription?: LocalizedString;
  /** Question mise en avant dans le showcase (ex: "A quoi ça sert ?") */
  showcaseTitle?: LocalizedString;
  /** Fonctionnalités dépliables (accordéon page détail) */
  features: ProduitFeature[];
  /** Métriques clés affichées sur la carte produit */
  stats: ProduitStat[];
  /** Chemin vers l'image de fond listing (dans /public) */
  backgroundImage: string;
  /** Chemin vers l'image showcase (dans /public) */
  showcaseImage?: string;
  /** Chemin vers l'icône produit 64×64 (dans /public) */
  iconSrc?: string;
  /** Badge optionnel (ex: "Le plus vendu") */
  badge?: LocalizedString;
}

export interface Article {
  slug: string;
  title: LocalizedString;
  excerpt: LocalizedString;
  /** Catégorie (ex: "Engineering", "IoT", "Data") — non traduit */
  category: string;
  /** Date ISO (ex: "2024-05-12") */
  date: string;
  /** Temps de lecture estimé en minutes */
  readingTime?: number;
  /** Chemin vers l'image de couverture */
  imageSrc?: string;
  /** Chemin vers la vidéo de couverture (prioritaire sur imageSrc) */
  videoSrc?: string;
}
