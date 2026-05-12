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

export interface Agent {
  slug: string;
  /** Slug du produit associé */
  produitSlug: string;
  name: LocalizedString;
  description: LocalizedString;
  features: ProduitFeature[];
  stats: ProduitStat[];
  backgroundImage: string;
  iconSrc?: string;
  badge?: LocalizedString;
}

export interface SocialPost {
  id: string;
  platform: "linkedin" | "instagram";
  /** Texte du post */
  text: string;
  /** Date ISO */
  date: string;
  /** Image du post — URL distante ou chemin local dans /public */
  imageSrc?: string;
  /** Lien vers le post original */
  postUrl: string;
}

export interface Article {
  slug: string;
  title: LocalizedString;
  excerpt: LocalizedString;
  /** Catégorie (ex: "Engineering", "IoT", "Data") — non traduit */
  category: string;
  /** Tags thématiques affichés en pills sur les cartes */
  tags?: string[];
  /** Date ISO (ex: "2024-05-12") */
  date: string;
  /** Temps de lecture estimé en minutes */
  readingTime?: number;
  /** Chemin vers l'image de couverture */
  imageSrc?: string;
  /** Chemin vers la vidéo de couverture (prioritaire sur imageSrc) */
  videoSrc?: string;
  /** URL externe vers l'article original — déclenche une redirection côté serveur */
  externalUrl?: string;
}
