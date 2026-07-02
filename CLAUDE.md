# Brigantina Menu

**View-only digital menu** for Villa Brigantina snack bar (Sunny Beach, Bulgaria). No cart, ordering, or payment — an ordering system was built and deliberately removed in July 2026; do not re-add unless asked.

**See `HANDOFF.md` for current state, workflow rules, and gotchas — read it before exploring the repo.**

- Stack: React 19 + TypeScript + Vite + Tailwind v4. Deploys to GitHub Pages from `main` (base path `/brigantina-menu-prototype/`).
- Languages: BG / EN / RU / DE — every user-facing string needs all four (`name/nameEn/nameRu/nameGr` pattern).
- `src/data/menuData.ts` is the single source of truth for menu items; the owner edits it directly. No CMS, no database.
- Prices are **EUR strings** (`price: '9.00'`); лв is derived at display time × 1.95583. Convert to numbers only when calculating.
- Sections with `subCategory` on items (drinks, wine) render grouped under subcategory headings.
- Keep the dark/gold nautical theme — no visual redesign unless asked. Styling lives in `src/index.css` (tokens in `@theme`, light overrides under `[data-theme="light"]`).

## Commands
```bash
npm run dev / build / preview
```

## Workflow
- Commit automatically when a feature is done and verified. **Never push unless asked** — push deploys the live site.
- Never commit the untracked `memory/` folder.
