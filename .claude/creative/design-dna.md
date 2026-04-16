---
generated: 2026-04-16
project: DevFun — Site Agence Digitale
version: 1.0
---

# Design DNA — DevFun

> Contrainte créative de référence pour /craft-component.
> Tout composant créé doit respecter cette empreinte.
> Re-générer avec /design-dna --refresh après changement majeur du DS.

---

## Ambiance générale

Site vitrine d'agence digitale dark mode, ancré dans un registre **technique, confiant et premium**. Le fond navy profond (#090F42) installe une profondeur sérieuse. L'orange (#FF7E33) est rare — il frappe fort quand il apparaît. Les animations sont vives mais jamais nerveuses : ressort agressif qui settle proprement. L'ensemble doit inspirer confiance à un DSI ou CTO : pas de showboating, mais une maîtrise visible.

**Mots-clés** : premium, technique, confiant, sombre, précis, agentique, B2B

---

## Palette — Ce que chaque couleur signifie

### Fond & Structure

| Token | Valeur | Rôle |
|---|---|---|
| `--color-nav-bg` | `#090F42` | Navy dominant — fond de toutes les sections principales |
| `--color-deep-navy` | `#040936` | Navy profond — dropdowns, zones d'ombre max |
| `--color-card-bg` | `#434674` | Fond cartes offres — légèrement plus clair que le fond |
| `--color-dropdown-open` | `#313445` | Menus ouverts |

### Accents & Brand

| Token | Valeur | Règle d'utilisation |
|---|---|---|
| `--color-brand-orange` | `#FF7E33` | CTA uniquement — ne jamais diluer en décoration |
| `--color-brand-orange-light` | `#FFB692` | Gradient texte, liens actifs — toujours en tandem avec l'orange |
| `--color-brand-orange-cta-from` | `#FF7B32` | Début gradient bouton CTA principal |
| `--color-brand-orange-cta-to` | `#FF9660` | Fin gradient bouton CTA principal |
| `--color-offer-blue` | `#4746E9` | Pôle Développement / IA — couleur technique |
| `--color-offer-yellow` | `#E6B002` | Pôle DevOps |
| `--color-offer-green` | `#46BA87` | Pôle IA |

### Texte

| Token | Valeur | Usage |
|---|---|---|
| `--color-text-heading` | `#DFE1F8` | Titres principaux — blanc chaud légèrement teinté bleu |
| `--color-text-light` | `#CBD5E1` | Texte corps, navigation inactive |
| `--color-text-body-warm` | `#DFC0B3` | Descriptions hero (à 80% opacity) — chaleur pêche |
| `--color-text-muted` | `#64748B` | Sous-titres secondaires, metadata |

### Halos & Backgrounds atmosphériques

| Usage | Valeur | Technique |
|---|---|---|
| Halo blanc chaud | `rgba(223, 225, 248, 0.20)` | 700px, blur 80px, flotte en background |
| Halo beige | `rgba(223, 192, 179, 0.18)` | 500px, blur 70px |
| Halo pêche | `rgba(255, 182, 146, 0.18)` | 560px, blur 80px |
| Halo orange | `rgba(255, 126, 51, 0.14)` | 460px, blur 70px — le plus rare |

### Règles de couleur

- L'orange est le CTA — jamais utilisé comme décoration, ornement ou fond
- Les fonds sont navy (`#090F42`), jamais noir pur ni blanc
- Le bleu (`#4746E9`) est la couleur technique — pour les contextes dev/IA
- Les halos sont les seuls éléments décoratifs colorés — opacités < 20%
- Les borders sont toujours `border-white/8` ou moins — pas de borders opaques
- Les textes gradient (heading en orange/pêche) sont réservés aux titres de sections entières ou au mot de conclusion du hero

---

## Typographie — La hiérarchie et ses règles

| Niveau | Token | Taille | Font | Graisse | Letter-spacing | Usage |
|---|---|---|---|---|---|---|
| Hero | `--text-hero-title` | 72px / 4.5rem | Google Sans | 700 | -1.8px | Une occurrence par page — le plus grand |
| Product hero | `--text-product-hero` | 60px / 3.75rem | Google Sans | 700 | -3px | Hero de page secondaire |
| Podcast/section | `--text-podcast-heading` | 48px / 3rem | Google Sans | 700 | -2.4px | Titre de section majeure |
| Card title | `--text-card-title` | 40px / 2.5rem | Google Sans | 700 | 0 | Titre de carte grande |
| Article | `--text-article-title` | 36px / 2.25rem | Google Sans | 700 | 0 | Titre article/blog |
| Stat | `--text-stat-value` | 32px / 2rem | Google Sans | 700 | 0 | Chiffres clés |
| Tab | `--text-tab` | 22px / 1.375rem | Manrope | — | — | Tabs navigation pôles |
| Body large | `--text-body-lg` | 18px / 1.125rem | Inter | 400 | 0 | Description, sous-titres |
| Nav | `--text-nav` | 16px / 1rem | Google Sans | 400 | 0 | Navigation |
| Badge | `--text-badge` | 12px / 0.75rem | Inter | 500 | 1.8px | Pills, badges |
| Label | `--text-label` | 13px / 0.8125rem | Inter/Manrope | — | — | Labels UI |

### Règles typographiques

- Google Sans pour tout ce qui est identité (titres, nav, marque) — Inter pour le corps — Manrope pour les labels UI
- Letter-spacing négatif réservé aux grandes tailles (≥ 48px) — jamais sur le corps
- Jamais plus de 2 tailles de police dans un même bloc visuel
- Le gradient text (orange→pêche) est réservé aux mots de conclusion ou à l'accroche principale du hero
- Sur mobile, les titres descendent d'un niveau dans la hiérarchie

---

## Signature motion

### Easing principal
```
cubic-bezier(0.16, 1, 0.3, 1)
```
Spring agressif — entrée percutante, settle immédiat. C'est l'identité motion du projet. Utiliser sur TOUS les mouvements créatifs.

### Durées

| Contexte | Durée |
|---|---|
| Micro-interactions hover | 150ms — 300ms |
| Entrée standard (fade-up) | 0.5s — 0.6s |
| Entrée signature (hero) | 0.55s |
| CTA container | 0.7s |
| Halos d'ambiance | 9s — 17s (cycles longs, mirror) |
| Counter animation | 1400ms (ease-out cubic) |
| Marquee linear | 35s (infinity, linear) |

### Stagger patterns

| Pattern | Valeur | Utilisé dans |
|---|---|---|
| Bento cards | `i * 0.1s` | FeatureBento |
| Stat items | `i * 0.12s` | StatsBar |
| Char-by-char titre | `0.03s/char` | KineticText hero lines 1 & 2 |
| Char-by-char accroche | `0.025s/char` | KineticText "L'humain et l'IA" |

### Patterns d'entrée établis

| Pattern | Implémentation | Composants |
|---|---|---|
| Fade-up standard | `{opacity: 0, y: 20-40}` → `{opacity: 1, y: 0}` | CtaAugmented, TestimonialBlock, StatsBar |
| Fade-up bento | `{opacity: 0, y: 32}` → `{opacity: 1, y: 0}` | FeatureBento cards |
| Char-by-char | `{opacity: 0, y: 12}` → `{opacity: 1, y: 0}` | KineticText |
| Float ambiant | `repeatType: "mirror"`, amp 65-90px | HeroHalos |
| Pulse vertical | `scaleY: [1, 0.3, 1]` repeat Infinity | Scroll indicator |
| Hover scale | `scale: 1.015` | Bento cards |

### Viewport triggers (inView)

Tous les composants utilisent `viewport: { once: true, margin: "-60px" à "-80px" }` — jamais de replay, animation une seule fois.

### MotionConfig obligatoire

```tsx
<MotionConfig reducedMotion="user">
```
Appliquer sur tout composant animé.

---

## Système de composition

### Layout fondamental

- Marges de page : `--page-margin-x` = `20%` (via `px-[var(--page-margin-x)]`)
- Header fixé : `--header-height` = `88px`
- Aucun `.container` Tailwind — les margins % sont préférées

### Rythme vertical des sections

| Section | Padding |
|---|---|
| Hero | `pt: calc(88px + 4rem)`, `pb: 6rem` |
| StatsBar | `pt-[5rem] pb-[5rem]` |
| InfiniteMarquee | `py-16` (4rem) |
| FeatureBento | `py-24` (6rem) |
| TestimonialBlock | `pt-[7rem] pb-[7rem]` |
| CtaAugmented | `pt-[8rem] pb-[8rem]` |

### Grilles et layouts

- **Bento 3 colonnes** : `grid-cols-1 md:grid-cols-3 gap-4` (FeatureBento)
- **Bento 4 colonnes** : `grid-cols-4 grid-rows-2 gap-6` (SectionBentoGrid)
- **Wide cards** : `md:col-span-2` (doublent la largeur)
- **12 colonnes** : `grid-cols-12 gap-8` (articles featured)

### Ce que les compositions actuelles NE font PAS (gaps à explorer)

- Éléments qui chevauchent les limites entre sections
- Texte oversized qui "déborde" du container (giant type en background)
- Formes non-rectangulaires (clip-path, shapes SVG)
- Overlaps intentionnels entre z-layers
- Sections avec fond alternatif (actuellement tout est `--color-nav-bg`)
- Scroll-driven animations (useScroll + useTransform)

---

## Bibliothèques disponibles

| Lib | Version | Utilisation |
|---|---|---|
| `framer-motion` | ^12.38.0 | Toutes les animations — substrate unique |
| `react` | 19.2.4 | — |
| `next` | 16.2.2 | App Router |
| `tailwindcss` | ^4 | Tailwind v4 avec `@theme` dans globals.css |
| `next-intl` | ^4.9.0 | i18n |
| `react-hook-form` | ^7.72.1 | Formulaires |
| `zod` | ^4.3.6 | Validation |

**Ne pas installer sans accord** : GSAP, Three.js, Lottie, Rive, @theatre/core

---

## Composants créatifs existants

Ces composants définissent le "plafond créatif actuel". Les nouveaux composants doivent aller plus loin.

| Composant | Technique principale | Ce qui peut être poussé |
|---|---|---|
| `HeroHalos` | Gradient blobs flottants en Lissajous (4 axes découplés) | Interaction curseur → halos réactifs à la position souris |
| `KineticText` | Split char-by-char avec stagger Y | Split par ligne + clip-path reveal |
| `ReactiveCursor` | Spring cursor dot 8px, scale 1→5 sur `[data-cursor-reactive]` | Mode spotlight : radial gradient qui suit le curseur |
| `FeatureBento` | Glow hover, scale entrance, border accent | Tilt 3D (MotionValues), spotlight individuel par carte |
| `InfiniteMarquee` | Loop horizontal linear 35s, pause hover | Vitesse variable, direction réactive au scroll |
| `GrainOverlay` | SVG feTurbulence noise (fixed, z-50, 5% opacity) | Augmenter l'opacité sur des sections spécifiques |
| `StatsBar` | useAnimatedCounter rAF, ease-out cubic, fade-up stagger | Ajout de sparkline SVG, gauge radiale |
| `CtaAugmented` | Halo orange 700x400 blur 120px | Parallax depth sur le halo au scroll |
| `TestimonialBlock` | Halo, quote mark géant, blockquote clamp | Carousel testimonials, transition morphing |

---

## Gaps créatifs prioritaires

> Classés par impact visuel / effort d'implémentation / compatibilité ambiance

| Technique | Impact | Effort | Compatible | Recommandé |
|---|---|---|---|---|
| **Tilt 3D cartes** (MotionValues X/Y) | Haut | Faible | Oui — premium subtil | ★★★★★ |
| **Clip-path reveal au scroll** | Haut | Moyen | Oui — dramatique | ★★★★★ |
| **Split text par ligne** (clip-path entrance) | Moyen | Faible | Oui — typographique | ★★★★★ |
| **Spotlight cursor par section** (gradient qui suit) | Moyen | Faible | Oui — atmosphérique | ★★★★☆ |
| **Parallax layers** (useScroll + useTransform) | Haut | Moyen | Oui — profondeur | ★★★★☆ |
| **Oversized type en background** (z-0, clipped) | Moyen | Faible | Oui — graphique | ★★★★☆ |
| **Magnétisme hover** sur boutons CTA | Moyen | Faible | Oui — premium | ★★★★☆ |
| **Gradient mesh animé** (CSS + Framer opacity) | Haut | Moyen | Oui — ambigu tech | ★★★☆☆ |
| **SVG path drawing** au scroll | Moyen | Moyen | Partiel — abstrait | ★★★☆☆ |
| **Particle field CSS** (repeating-radial) | Faible | Faible | Oui — subtil | ★★★☆☆ |
| **Scroll-pinned sections** (position sticky) | Haut | Élevé | Oui — storytelling | ★★★☆☆ |
| **Texte masqué sur gradient** | Moyen | Faible | Oui | ★★★☆☆ |

---

## Règles absolues (ne jamais enfreindre)

- Toujours utiliser les CSS custom properties — jamais de valeurs hex hardcodées dans les composants
- Framer Motion uniquement pour les animations — pas d'inline style animé, pas de CSS `@keyframes` custom
- `MotionConfig reducedMotion="user"` sur tout composant animé
- Easing principal : `[0.16, 1, 0.3, 1]` — déroger uniquement si documenté dans le composant
- L'orange CTA ne doit jamais être utilisé comme couleur décorative ou de fond
- Tailwind v4 `@theme` syntax dans globals.css — pas de `tailwind.config.js` pour les tokens
- Props TypeScript strictes — pas de `any`, pas de props optionnelles non-nullables sans défaut
- Tout composant créatif = Story Storybook associée avec variants et états hover