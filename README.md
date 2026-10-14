# DevMKaos Portfolio

Personal portfolio for Mauricio Guerra Navarro (KAOS). Dark editorial single page
with a work gallery, a priced service catalogue, and a blog, in English, Spanish
and French.

Live repo: `m-kaos/Dev-Portfolio-M-Kaos`

## Stack — read this first

**This project is Create React App, not Next.js.** The global KAOS conventions
default to Next.js 15 + App Router + Tailwind v4; this repo predates that and has
not been migrated. Do not introduce Next.js imports, server components, the `@/`
alias or Tailwind v4 syntax here.

| | |
|---|---|
| Build | `react-scripts` 5 (CRA) |
| UI | React 19, TypeScript 4.9 |
| Styling | Tailwind **v3**, tokens as HSL CSS variables in `src/index.css` |
| Routing | `react-router-dom` 7, routes in `src/App.tsx` |
| Icons | `lucide-react`, plus `react-icons/si` for brand marks |
| Imports | relative paths — there is no path alias configured |

Three themes switch the token block: default, `.dark`, `.glass`. The glass theme
renders a fullscreen WebGL shader behind the content.

## Scripts

```bash
npm start        # dev server on :3000
npm run build    # production build into build/
npm test         # CRA test runner
```

To view a production build locally, serve `build/` on a static server; the app is
a single page, so any static host works for the home route.

## Layout

Sections are numbered in the UI and must stay in sync with `src/App.tsx` order:

| # | Section | Component |
|---|---|---|
| 01 | Work | `src/components/MyWork.tsx` |
| 02 | Services | `src/components/services/services-section.tsx` |
| 03 | About | `src/components/About.tsx` |
| 04 | Blog | `src/components/Blog.tsx` |
| 05 | More | `src/components/More.tsx` |

Renumbering means editing the literal in each component **and** the nav list in
`src/components/Navigation.tsx`.

## Data

### Work items

`src/data/workItems.json` — one entry per project: `id`, `url`, `title`, `date`,
`description`, `order`, and an optional `thumbnail`.

Previews are **static WebP screenshots**, never live iframes. An entry without a
`thumbnail` falls back to a typographic domain tile, so a project can ship before
its screenshot does.

To add a screenshot: capture the site at 1280x800, then compress before
committing. Raw captures land around 500 KB; the whole folder should stay in the
hundreds of KB.

```bash
ffmpeg -y -i raw.webp -vf "scale=800:-2" -c:v libwebp -quality 76 public/thumbs/<slug>.webp
```

`/admin/work` is an unlisted editor that exports the JSON; it knows about
`thumbnail` and will preserve it.

### Services

`src/lib/services/` keeps structure and prose apart on purpose:

- `catalog.ts` — id, category and price only, plus `SERVICE_CURRENCY`
- `copy.en.ts` / `copy.es.ts` / `copy.fr.ts` — the words a visitor reads
- `copy.ts` — resolves copy by language and formats prices through `Intl`
- `types.ts` — shared types

Prices are in **MXN** and confirmed. `Intl` renders them per locale from one
number: `MX$3,000` (en), `$3,000` (es), `3 000 $MX` (fr). Adding a service means
one row in `catalog.ts` and one entry in each of the three copy files.

The catalogue is derived from a private internal document. Only the
client-facing slice is public — the skills, MCPs and delivery checklists in that
document are internal method and must stay out of this repo.

## Conventions in this repo

- New components use named exports and kebab-case filenames; older top-level
  components still use default exports and PascalCase. Match whichever folder you
  are in rather than rewriting the other half.
- One component per file, kept under 200 lines.
- Copy lives in `src/translations/translations.ts` (UI chrome) or in the services
  copy files. All three languages are real; do not add a string to only one.
- Touch targets 44px, visible focus rings, WCAG AA contrast.
- `src/index.css` sets a transition on every element in the base layer. That is
  deliberate — it carries the theme morph. A `prefers-reduced-motion` guard at the
  bottom of the file neutralises it.

## Open items

- **Asesor Carlos Estrada has no public URL.** Its link resolves to the Vercel
  login screen, so it is a protected preview deployment, not a live site. It
  currently renders the fallback tile. Needs a production URL, a real
  description, and a screenshot.
- **LIA Skincare Clinic** uses a deployment-hash URL
  (`lia-skincare-clinic-5oa6k2rb8-m-kaos.vercel.app`). It resolves today but
  changes on redeploy. Replace with the production alias.
- **Teté y Matatena** points at `/d2`. Confirm whether that path is the final
  route or a design variant.
- **About contains its own "Services" subsection** with vague capability blurbs
  that now competes with the priced section 02. Consider renaming it to
  "Capabilities" or removing it.
- **`LanguageSelector.tsx` uses flag emojis** for the language buttons, which
  breaks the no-emoji-in-UI rule. On Windows they render as US/ES/FR letter
  pairs; on macOS they render as flags. Lucide has no flag set, so this needs a
  decision rather than a swap.
