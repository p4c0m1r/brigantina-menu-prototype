# HANDOFF — Brigantina Menu (updated 2026-07-02)

Read this first in a new session; it replaces re-exploring the repo.

## Where things stand
- View-only digital menu (React 19 + TS + Vite + Tailwind v4), 4 languages, dark/gold theme, deployed to GitHub Pages from `main` via Actions.
- The cart/ordering system + Express backend were **deliberately deleted July 2026** — do not re-add.
- Prices are **EUR strings** in `src/data/menuData.ts` (POS export is source of truth); лв shown at fixed rate ×1.95583. € is primary in the UI.
- Sections: salads, toasts, alaminute, grill, chef, spaghetti, pizza, addons, sauces, focaccia, nuts, desserts, drinks, wine. Breakfast section and box items were removed on request. Photo-less items were removed from salads/omelettes/pasta only.
- Header uses `public/logo.png` (transparent gold logo) instead of text.
- Mobile nav = scrollable chips; sections fade in on scroll; modal has ✕ + animation; back-to-top button. All motion respects reduced-motion.

## Git / workflow
- **Auto-commit when a feature is done** (user preference). **Never push without being asked** — push deploys to the live site.
- Push works via SSH only (`git@github.com:p4c0m1r/...`, key at `~/.ssh/id_ed25519`); no gh CLI, no HTTPS creds. Network git needs sandbox disabled.
- The untracked `memory/` folder at repo root stays out of git.
- As of this writing, commits `c736b5d` (breakfast/box removal) and `c666161` (header logo) are local, not yet pushed.

## Gotchas
- A local hook ("Fact-Forcing Gate") intercepts first Write/Edit/destructive-Bash per file: present the requested facts in text, then retry the identical call — it passes the second time.
- No Chrome for Playwright MCP; verify UI with headless Brave: `brave --headless --screenshot=x.png --window-size=390,844 --virtual-time-budget=6000 <url>` and `--dump-dom` for DOM checks.
- Duplicate item names (wines/beers in multiple volumes) are keyed by `name-ml` in `MenuSection.tsx` — keep names+ml unique per subcategory.
- `npm run build` is the fast correctness check; owner edits `menuData.ts` directly (no CMS).
