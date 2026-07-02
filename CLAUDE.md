# Brigantina Menu — CLAUDE.md

## What This Project Is

**View-only digital menu** for **Villa Brigantina**, a snack bar at Fregata 13-14, Sunny Beach 8240, Bulgaria. Guests scan a QR code at the venue and browse the menu on their phones — there is no cart, ordering, or payment.

- **Live URL:** deployed to GitHub Pages via `peaceiris/actions-gh-pages` on the `gh-pages` branch
- **Base path:** `/brigantina-menu-prototype/`
- **Stack:** React 19 + TypeScript + Vite + Tailwind CSS v4
- **Languages supported:** Bulgarian (BG), English (EN), Russian (RU), German (DE)

---

## Current State (as of July 2026)

Multi-language, mobile-first menu with dark/light themes. An online ordering system (cart, checkout, email receipts, Express backend) was prototyped and then **deliberately removed in July 2026** — the owner decided to keep the site view-only. Do not re-add cart/ordering features unless explicitly asked.

### Architecture
```
src/
  App.tsx                  — root layout, IntersectionObserver scroll-spy
  components/
    Header.tsx             — hero banner with anchor logo
    NavBar.tsx             — sticky nav: mobile chip row / desktop tabs, theme + lang controls
    MenuSection.tsx        — renders a section + its items, scroll-reveal animation
    MenuCard.tsx           — dish card with lazy image fade-in + detail modal
    AllergenIcon.tsx       — allergen number → icon/label
    LangSwitcher.tsx       — BG / EN / RU / DE toggle
    BackToTop.tsx          — floating scroll-to-top button
  context/
    LanguageContext.tsx    — active language state, shared via context
    ThemeContext.tsx       — light / dark theme toggle
  data/
    menuData.ts            — single source of truth: ALL menu items, prices, allergens, images
  types/
    menu.ts                — MenuItem and MenuSection TypeScript interfaces
  utils/
    lang.ts                — helper to pick the right language field
    useInView.ts           — one-shot IntersectionObserver hook (scroll reveal)
public/                    — optimised food images (JPG), favicon, icons.svg
```

### Menu Sections (IDs)
`salads` · `toasts` · `alaminute` · `grill` · `chef` · `spaghetti` · `pizza` · `addons` · `sauces` · `focaccia` · `nuts` · `drinks`

### Data Shape
Every `MenuItem` has: `name/nameEn/nameRu/nameGr`, optional `description*`, `price` (string, BGN), `weight` (grams) or `ml`, optional `image`, optional `badge` (`best`|`chef`|`favorite`), optional `allergens` (number array), optional `subCategory`.

### UX Details Worth Knowing
- Mobile nav is a horizontally scrollable chip row; the active chip auto-centers as scroll-spy updates.
- Prices display in BGN with an EUR conversion (fixed rate 1.95583) underneath.
- All motion (section reveal, modal entrance, image fade-in) is guarded by `prefers-reduced-motion`.
- Styling lives in `src/index.css`: semantic tokens in `@theme` (with `[data-theme="light"]` overrides), component classes in `@layer components`, animations in `@layer utilities`.

---

## Dev Commands

```bash
npm run dev      # start Vite dev server
npm run build    # production build → dist/
npm run preview  # preview production build
```

Build output goes to `dist/`. GitHub Actions deploys the `dist/` folder to the `gh-pages` branch automatically on push to `main`.

---

## Constraints & Preferences
- Keep the existing dark/gold nautical theme — no visual redesign unless asked
- The multi-language system must extend to all new UI
- `menuData.ts` remains the single source of truth for menu items; do not duplicate data
- Do not add a CMS or database for menu items — the owner edits `menuData.ts` directly
- Prices are strings in `menuData.ts` — convert to numbers only at the point of calculation
