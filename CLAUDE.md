# CLAUDE.md — raidr_web

> **Git policy — never auto-commit or auto-push.** Leave your work in the working tree.
> Run `git commit`, `git push`, `gh pr create`, or `push_all.sh` **only when the user
> explicitly asks in that turn**. Approval for an earlier change does not carry forward, and
> finishing a task is not permission to commit it.

Single-page marketing/docs site for the raidr toolchain.

## Where it sits in the raidr family

This repo is the landing page (raidr.dev). It imports no raidr package; it
only describes and links to them.

- `raidr_extension` — MV3 capture extension.
- `raidr_processor` (npm `@sudobility/raidr_processor`; renamed from
  `raidr_lib` on 2026-09-30) — pure bundle format / redaction / coverage
  library the extension imports.
- `raidr_cli` — reconstructs projects from bundles; ships the agent skill.
- `raidr_crawler` — headless capture.
- `raidr_types` → `raidr_client` → `raidr_lib` (the *new* business-logic
  package) → `raidr_app` — the catalog app stack.
- `raidr_api` — hosts the catalog and the MCP endpoint.
- Releases run from `raidr_app/scripts/push_all.sh`, which processes this repo
  last. raidr_web no longer has a release script of its own.

## Tech stack

- React 19 + TypeScript + Vite
- Tailwind 3 with `createTailwindPreset()` from `@sudobility/design`
- `react-i18next` + `i18next-http-backend` (en populated, 15 locales wired)
- Cloudflare Pages (`wrangler.toml`)
- Bun for everything. Never npm/yarn/pnpm.

## Structure

```
index.html                SEO/OG meta, IBM Plex from Google Fonts, <html class="dark">
src/
  main.tsx                configureTheme(radiographTheme) + injects generateThemeCSS
  App.tsx                 top bar, section order, footer (+ its REPOS list), 404
  i18n.ts                 locale list + http backend
  index.css               radiographic tokens, plate surface, exposure animation
  data/capture.ts         REAL request rows from react-sample.zip
  components/
    CapturePlate.tsx      the signature: waterfall as radiograph
    Hero.tsx
    Sections.tsx          all content sections
    primitives.tsx        Section / Code / Note (+ RepoLink, REPO_BASE)
public/locales/en/translation.json    all prose
public/                   icons, og-image, sitemap.xml, robots.txt, site.webmanifest
tailwind.config.js        preset + font-cond / tracking-plate / max-w-readable only
wrangler.toml             Cloudflare Pages, output ./dist
```

There is no router: `App` renders the page at `/` and a 404 view (which
rewrites the URL to `/404`) everywhere else.

## Commands

```bash
bun run dev
bun run build         # tsc -b && vite build
bun run typecheck
```

| Command | What it does | Status (2026-09-30) |
| --- | --- | --- |
| `bun install` | install deps | — |
| `bun run dev` | vite on http://localhost:5140 (strictPort) | serves 200 |
| `bun run build` | `tsc -b && vite build` → `dist/` | passes |
| `bun run typecheck` | `tsc --noEmit` | passes |
| `bun run preview` | serve `dist/` on http://localhost:4173 | serves 200 |
| `bunx prettier --check "src/**/*.{ts,tsx,css}"` | format check | passes |
| `bun run format` | the same glob with `--write` (rewrites files) | — |

There is no lint script.

No test suite — this is a static page. Verification is `bun run build` plus a
visual check at 1440px and 390px. For styling changes, screenshot before and
after and pixel-diff: the palette is now theme-driven, so a regression shows up
as a color shift across the whole page rather than in one component.

## Design system

The palette lives in `@sudobility/design` as the **`radiograph`** theme, not in
this repo. `main.tsx` calls `configureTheme(radiographTheme)` and injects
`generateThemeCSS`, so color, radius, border width and both stock font stacks
arrive as CSS custom properties. Components use semantic classes only.

| Was | Now |
| --- | --- |
| `film` (base) | `background` |
| `plate` (card surface) | `card` |
| `shelf` | `muted` |
| `bone` (dense material reads bright) | `foreground` |
| `exposure` (steel blue) | `accent` |
| `flare` (amber) | `primary`, and `ring` |

`flare` is still the only warm accent — reserve `primary` for the CTA,
numbering, and hover states.

Two rules that are easy to get wrong:

- **Hairlines are `border-foreground/NN`, not a solid `border-border`.** They
  were written as `white/10`–`/15`; `foreground` is bone, which lands within
  4–9/255 of pure white at those alphas. Using solid `border-border` instead
  changes the look, because no single opaque value can serve a hairline drawn
  over both the film ground and a plate.
- **Inverted sections swap the two roles** rather than switching theme: the
  bundle section is `bg-foreground text-background`, and everything inside it
  uses `text-background/NN` and `border-background/NN`. That is why the theme
  needs no light token set.

Never reintroduce a palette utility, a hex literal, or a `film`/`plate`/`bone`
class. If a color is missing, add it to the theme rather than to
`tailwind.config.js` — which now owns only `font-cond`, `tracking-plate` and
`max-w-readable`, none of which have token equivalents.

Type is IBM Plex, loaded from Google Fonts in `index.html`: `font-cond` for
headings and labels, `font-sans` for body, `font-mono` for all code and data.
The latter two resolve to `var(--font-sans)` / `var(--font-mono)`.

**The Tailwind preset is a two-part contract.** `createTailwindPreset()` rewires
`rounded-*`, `border` width, shadows and fonts to CSS variables, so importing it
without also injecting `generateThemeCSS()` is worse than not importing it at
all: the variables go undefined, the declarations become invalid, and the
properties fall back to their CSS *initial* values. That is what happened here
before the extraction — every `border` rendered at `medium` (3px) instead of
1px, and every `rounded-sm` at 0 instead of 2px, across 26 and 27 elements.

The bundle section is deliberately inverted (ivory on dark page) — it reads as
pulling the film off the wall and holding it to the light, and it is the one
section literally about inspecting the artifact. Do not add a second inverted
section; the effect only works once.

## Making common changes

- **Copy change**: `public/locales/en/translation.json` only. Other locales
  fall back to `en` (only `en/` exists).
- **New section**: component in `Sections.tsx` using `Section` → strings in
  `translation.json` → add it to `HomePage` in `App.tsx` in page order → if it
  belongs in the top bar, add a `nav.*` key and an entry in `TopBar`'s `links`
  (the id must match the `Section`'s `id`).
- **New repository**: `repos` array in `Repos()` (`Sections.tsx`) with a new
  `repos.<key>` string → `REPOS` in `App.tsx` (footer) → the README table →
  check the card grid (`sm:grid-cols-2 lg:grid-cols-5`) still fills whole rows.
- **New color**: add it to the `radiograph` theme in `@sudobility/design`,
  bump the dependency, then use the semantic class — never here.
- **Updating the capture plate or CLI output**: re-run the tools on
  `raidr_cli/fixtures/bundles/react-sample.zip` and copy the numbers into
  `data/capture.ts` / `Sections.tsx`; never edit them by hand (README, "Content
  policy"). `widthFor` in `CapturePlate.tsx` hard-codes the largest body
  (205039 bytes) as its log-scale ceiling.

## Gotchas

- **Grid children need `[&>*]:min-w-0`.** Grid tracks default to `min-width: auto`, so a wide `<pre>` inflates the track and breaks mobile even though the `<pre>` itself scrolls.
- Numbering (01/02/03) appears only in the stages and walkthrough sections, where order carries real information. Do not add it to the repo cards.
- Prose belongs in `translation.json`; code blocks stay inline in components.
- Repo-card translation keys are not repo names: `raidr_processor` is
  `repos.lib` (its pre-rename key) and the new `raidr_lib` is `repos.applib`.
- The repo list exists twice — cards in `Sections.tsx`, footer links in
  `App.tsx` — and nothing keeps them in sync.
- A few English strings are still hard-coded in components rather than in
  `translation.json`: `BundleSection`'s "Artifact" and `Walkthrough`'s "End to
  end" eyebrows, the `Note` in `Skill`, the plate legend, "GitHub" in the top
  bar, and the 404 page.

## Related projects

- `raidr_extension` — the capture extension
- `raidr_cli` — reconstruction CLI and the agent skill
- `raidr_processor` — bundle format and pure analysis
- `raidr_crawler` — headless crawler, analysis pre-pass, raidr-publish skill
- `raidr_types` / `raidr_client` / `raidr_lib` — shared types, API client, app business logic
- `raidr_api` — catalog CRUD and the hosted MCP endpoint
- `raidr_app` — catalog web app; owns `scripts/push_all.sh`, the release script
- `sudobility` — the landing-page template this follows
