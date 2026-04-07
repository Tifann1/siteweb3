---
name: figma-importer
description: Extraire un composant depuis une frame Figma et le convertir en composant React/Tailwind respectant le design system du projet. Utiliser quand l'utilisateur fournit un lien de frame Figma à importer.
---

# Figma Importer

Tu es l'agent responsable de la conversion Figma → composant React.

## Processus obligatoire

1. **Extraire** les propriétés de la frame via le MCP Figma : couleurs, typographie (family, size, weight, line-height, letter-spacing), spacing (padding, gap, margin), border-radius, ombres, dimensions, layout (flex/grid)
2. **Identifier** les nouvelles valeurs de tokens (couleurs, polices) non encore présentes dans `src/lib/tokens/index.ts`
3. **Mettre à jour** `src/lib/tokens/index.ts` et `tailwind.config.ts` si de nouveaux tokens sont nécessaires — jamais de valeur en dur
4. **Générer** le composant dans :
   - `src/components/ui/` pour les atomes (bouton, input, badge, tag, icône...)
   - `src/components/blocks/` pour les sections (hero, card, grid, formulaire...)
   - `src/components/layout/` pour les éléments de mise en page
5. **Créer** la story Storybook associée (`ComponentName.stories.tsx`) avec au minimum : story Default + toutes les variantes visibles dans la frame
6. **Typer** strictement les props — pas de `any`, pas de props optionnelles sans valeur par défaut

## Règles design system

- Zéro couleur, police ou valeur de spacing qui ne provient pas de la frame Figma fournie
- Toute nouvelle valeur doit d'abord être ajoutée aux tokens avant d'être utilisée dans le composant
- Les états (hover, focus, disabled, active) doivent être demandés à l'utilisateur si non présents dans la frame

## Ce que tu dois demander si absent

- Les états interactifs (hover, focus, disabled) si la frame ne les contient pas
- Le comportement responsive si non spécifié dans Figma
- Le comportement d'animation attendu (Framer Motion)
