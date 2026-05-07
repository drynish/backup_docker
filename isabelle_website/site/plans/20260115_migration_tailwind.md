# Migration de Bootstrap vers Tailwind CSS

**Date** : 2026-01-15
**Type** : Refactoring majeur
**Statut** : En révision

## Description

Remplacer le framework CSS Bootstrap 5.3.3 par Tailwind CSS (CDN uniquement). Migration vers une palette moderne, approche mobile-first, composants Tailwind inline, et Heroicons pour les icones.

## Configuration choisie

- **Installation** : CDN Tailwind (https://cdn.tailwindcss.com)
- **Palette** : Moderne (bleus/violets/slates) au lieu de dark/light
- **Polices** : Par défaut Tailwind
- **Classes** : Inline (pas de composants @apply)
- **Approche** : Mobile-first (breakpoints : sm, md, lg, xl)
- **Icones** : Heroicons (remplacer Font Awesome si compatible)
- **Interactivité** : Garder JavaScript toggle pour cours details

## Phase 1 : Configuration Tailwind
- [ ] Remplacer CDN Bootstrap par CDN Tailwind
- [ ] Retirer CSS/JS Bootstrap
- [ ] Tester que Tailwind se charge correctement

## Phase 2 : Remplacer les classes Bootstrap → Tailwind

### Layout & Spacing
- `.container` → `max-w-7xl mx-auto px-4`
- `.container-fluid` → `w-full px-4`
- `.row` → `grid grid-cols-12`
- `.col-12` → `col-span-12`
- `.mt-5` → `mt-5` (identique)
- `.my-5` → `my-5` (identique)
- `.pt-2` → `pt-2` (identique)
- `.p-3` → `p-3` (identique)
- `.mb-3` → `mb-3` (identique)
- `.w-75` → `w-3/4`

### Texte & Typographie
- `.h1` → `text-4xl font-bold`
- `.h2` → `text-3xl font-bold`
- `.h3` → `text-2xl font-bold`
- `.h4` → `text-xl font-bold`
- `.h5` → `text-lg font-bold`
- `.display-5` → `text-5xl font-bold`
- `.text-center` → `text-center`
- `.text-end` → `text-right`
- `.text-secondary` → `text-gray-400`
- `.small` → `text-sm`

### Display & Visibility
- `.d-none` → `hidden`
- `.d-sm-block` → `hidden sm:block`
- `.d-sm-none` → `sm:hidden`
- `.sr-only` / `.visually-hidden` → `sr-only` (Tailwind)

### Couleurs & Background
- `.bg-dark` → `bg-slate-900`
- `.text-white` → `text-white`
- `.bg-cover` → `bg-cover`
- `.bg-center` → `bg-center`

### Boutons & Formulaires
- `.btn.btn-outline-primary` → `px-4 py-2 border-2 border-blue-500 text-blue-500 hover:bg-blue-50 rounded`
- `.btn.btn-primary` → `px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded`
- `.form-control` → `w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500`
- `.form-label` → `block text-sm font-medium text-gray-700 mb-1`
- `.mb-3` (form-group) → `mb-3` (identique)

### Navigation & Layout
- `.navbar` → `flex items-center justify-between`
- `.navbar-toggler` → `md:hidden block`
- `.collapse` → `hidden md:flex`
- `.fixed-top` → `fixed top-0 left-0 right-0 z-50`
- `.sticky-top` → `sticky top-0 z-40`
- `.navbar-brand` → `text-lg font-bold`
- `.navbar-nav` → `flex flex-col md:flex-row`
- `.nav-item` → `block`
- `.nav-link` → `block px-4 py-2 hover:bg-slate-800`

### Position & Sizing
- `.position-relative` → `relative`
- `.position-absolute` → `absolute`
- `.bottom-0` → `bottom-0` (identique)
- `.start-50` → `left-1/2`
- `.translate-middle-x` → `-translate-x-1/2`

### Images & Media
- `.img-fluid` → `w-full h-auto`
- `.figure` → utiliser `<figure>` natif + Tailwind

### Autres
- `.text-center` (div) → `text-center`
- `<span class="fa-stack">` → Remplacer par Heroicons SVG
- `.fa-stack-2x` / `.fa-stack-1x` → Ajuster taille Heroicons

## Phase 3 : Remplacer Font Awesome → Heroicons

Icones à remplacer :
- SMS icon (fa-sms) → Heroicons `phone` ou `chat-bubble-left`
- Mail icon (fa-envelope) → Heroicons `envelope`

Lien Heroicons CDN : https://cdn.jsdelivr.net/npm/heroicons@2.0.18/outline/

## Phase 4 : Tester & Valider

- [ ] Tester responsive mobile (sm: 640px, md: 768px, lg: 1024px)
- [ ] Vérifier tous les boutons et interactions
- [ ] Tester toggle cours details (JavaScript fonctionne)
- [ ] Vérifier accessibilité (focus states, contraste)
- [ ] Tester formulaire avec Tailwind
- [ ] Valider sur différents navigateurs

## Notes importantes

- **JavaScript** : La fonction `toggleCourseDetails()` reste identique (pas liée à Bootstrap)
- **reCAPTCHA** : Garder le script existant, compatible avec Tailwind
- **jQuery** : Pas utilisé, peut être retiré si souhaité
- **Palette Tailwind** : Utiliser slate-* pour les neutres, blue-* pour primaire, purple-* pour accents
- **Breakpoints mobile-first** : `hidden md:flex` = hidden par défaut, flex à partir de md (768px)

## Palette moderne proposée

| Élément | Bootstrap | Tailwind |
|---------|-----------|----------|
| Primary | blue-500 | blue-600 |
| Dark BG | bg-dark (nearly black) | bg-slate-900 |
| Text | black/white | slate-900/white |
| Hover | lighter shade | blue-700 |
| Border | gray-200 | gray-300 |
