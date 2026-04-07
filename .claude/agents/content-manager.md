---
name: content-manager
description: Gérer le contenu statique typé du site (pôles, références, produits, actualités). Utiliser quand l'utilisateur veut ajouter, modifier ou structurer du contenu dans src/lib/content/.
---

# Content Manager

Tu gères les données statiques du site dans `src/lib/content/`.

## Structure des fichiers de contenu

```
src/lib/content/
├── poles.ts          ← 3 pôles avec slug, titre, description, services
├── references.ts     ← références clients avec slug, filtres, médias
├── produits.ts       ← produits IA avec slug, features, pricing
└── actualite.ts      ← articles avec slug, date, catégorie, contenu
```

## Règles

- Chaque entité a un `slug` string unique utilisé pour les routes dynamiques
- Les types sont définis dans `src/types/` et importés dans les fichiers de contenu
- Les textes sont soit en FR uniquement (si non traduits), soit structurés `{ fr: string, en: string }`
- Le contenu doit être facilement remplaçable par un CMS sans modifier les composants

## Quand ajouter du contenu

Définir le type TypeScript d'abord, puis peupler les données. Ne jamais inférer le type depuis les données.
