---
name: Décisions créatives — BlobPoles / V2 accueil
description: Concept organique blob cluster validé, approche morphing CSS + Framer Motion
type: project
---

Concept "Organic Cluster" retenu pour la section pôles de /V2/accueil.
**Why:** L'utilisateur voulait des formes colorées à la ZOL (zol.fr) — blobs gradient qui morphent lentement et révèlent une description au hover.
**How to apply:** Réutiliser ce pattern pour d'autres sections qui nécessitent des shapes organiques interactives.

Palette blobs :
- Conseil : `linear-gradient(135deg, #FF7E33, #FFB692)`
- Développement : `linear-gradient(135deg, #4746E9, #7474FF)`
- DevOps : `linear-gradient(135deg, #E6B002, #FFCA4A)` ← #FFCA4A non extrait Figma
- IA : `linear-gradient(135deg, #46BA87, #3DD9B3)` ← #3DD9B3 non extrait Figma

Technique morphing :
- CSS `border-radius` keyframes (syntaxe `x% y% z% w% / a% b% c% d%`)
- Injecté via `<style>` JSX dans le client component
- Durées décalées (12–17s) + `animation-delay` négatif pour déphasage organique
- Framer Motion utilisé uniquement pour : entrée (scale + opacity), hover (scale spring), glow halo, transitions de texte

Motion signature hover :
- `whileHover={{ scale: 1.06, transition: { type: "spring", damping: 22, stiffness: 260 } }}`
- Glow halo derrière (blur 24px, opacity 0.3, animé via Framer Motion)
- `zIndex` passe à 10 sur hover pour passer devant les autres blobs
