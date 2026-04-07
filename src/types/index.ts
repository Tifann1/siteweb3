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
}

export interface Produit {
  slug: string;
  name: LocalizedString;
  description: LocalizedString;
  features: LocalizedString[];
}

export interface Article {
  slug: string;
  title: LocalizedString;
  excerpt: LocalizedString;
  category: string;
  date: string;
}
