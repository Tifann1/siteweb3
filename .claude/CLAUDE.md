# DevFun — Site Web Agence Digitale

## Contexte

Site vitrine d'une agence digitale (DevFun), très dynamique, bilingue FR/EN. Cible : prospects et visiteurs. Le projet est conçu pour être extrêmement malléable — aucune décision structurelle n'est figée sans raison explicite documentée ici.

## Pages

| Route | Description |
|---|---|
| `/[locale]/` | Ingénieur Augmenté (page d'accueil) |
| `/[locale]/poles` | Liste des pôles |
| `/[locale]/poles/[slug]` | Page individuelle d'un pôle (3 pôles) |
| `/[locale]/references` | Liste des références avec filtres |
| `/[locale]/references/[slug]` | Page individuelle d'une référence |
| `/[locale]/produits` | Produits IA vendus sur étagère |
| `/[locale]/actualite` | Blog / actualités avec filtres |

## Architecture

**Framework** : Next.js 15, App Router, TypeScript strict
**Style** : Tailwind CSS — tokens centralisés dans `src/lib/tokens/`, injectés dans `tailwind.config.ts`
**Animations** : Framer Motion
**Formulaires** : React Hook Form + Zod
**i18n** : next-intl, locales `fr` et `en`, fichiers dans `messages/`
**Banque de composants** : Storybook 8, stories colocalisées avec les composants
**Contenu** : Fichiers `.ts` typés dans `src/lib/content/` (pas de CMS en v1)

## Structure de dossiers

```
src/
├── app/
│   └── [locale]/         ← routing i18n next-intl
├── components/
│   ├── ui/               ← atomes : Button, Input, Badge, Tag, Icon...
│   ├── blocks/           ← sections réutilisables : Hero, Card, Grid, Filter...
│   └── layout/           ← Header, Footer, Nav, MobileMenu
├── lib/
│   ├── tokens/           ← design tokens (couleurs, typo, spacing, shadows)
│   └── content/          ← données statiques typées (poles, references, produits, actualite)
├── hooks/                ← custom hooks React
├── types/                ← types TypeScript partagés
└── messages/
    ├── fr.json
    └── en.json
```

## Design System — RÈGLES STRICTES

- **Zéro couleur** qui ne provient pas des maquettes Figma
- **Zéro police** introduite arbitrairement — uniquement celles extraites de Figma
- Tous les tokens sont définis dans `src/lib/tokens/index.ts` et référencés dans `tailwind.config.ts`
- Aucune valeur de couleur, typo ou spacing en dur dans les composants — tout passe par les classes Tailwind issues des tokens
- Avant le premier import Figma, les tokens restent des placeholders vides/commentés

## Workflow Figma → Composant

1. L'utilisateur fournit un lien de frame Figma
2. Extraction via MCP Figma des valeurs (couleurs, typo, spacing, border-radius, ombres)
3. Mise à jour des tokens si de nouvelles valeurs apparaissent
4. Génération du composant dans `components/ui/` ou `components/blocks/` selon sa nature
5. Création de la story Storybook associée

## Banque de composants

Chaque composant est **autonome et isolé** :
- Props typées strictement, pas de dépendances implicites au contexte global
- Story Storybook obligatoire avec variants et états
- Assignable à n'importe quelle page sans modification

## Contenu statique

Les données (pôles, références, produits, actualités) vivent dans `src/lib/content/`. Structure typée, facilement remplaçable par un CMS ultérieurement sans modifier les composants.

## Ce qui n'est PAS dans le scope v1

- CMS / back-office
- Authentification
- Déploiement (non défini)
- Tests e2e

## Décisions figées

- **next-intl** pour l'i18n (routing middleware + `[locale]` segment)
- **Framer Motion** pour toutes les animations (pas de CSS animations ad hoc)
- **Storybook** comme interface de visualisation de la banque de composants
- Le design system est la source de vérité unique — jamais de valeur en dur
