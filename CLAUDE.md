# CLAUDE.md — raidr_web

Single-page marketing/docs site for the raidr toolchain.

## Tech stack

- React 19 + TypeScript + Vite
- Tailwind 3 with `createTailwindPreset()` from `@sudobility/design`
- `react-i18next` + `i18next-http-backend` (en populated, 15 locales wired)
- Cloudflare Pages (`wrangler.toml`)
- Bun for everything. Never npm/yarn/pnpm.

## Structure

```
src/
  App.tsx                 top bar, section order, footer
  i18n.ts                 locale list + http backend
  index.css               radiographic tokens, plate surface, exposure animation
  data/capture.ts         REAL request rows from react-sample.zip
  components/
    CapturePlate.tsx      the signature: waterfall as radiograph
    Hero.tsx
    Sections.tsx          all content sections
    primitives.tsx        Section / Code / Note
public/locales/en/translation.json    all prose
```

## Commands

```bash
bun run dev
bun run build         # tsc -b && vite build
bun run typecheck
```

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

## Gotchas

- **Grid children need `[&>*]:min-w-0`.** Grid tracks default to `min-width: auto`, so a wide `<pre>` inflates the track and breaks mobile even though the `<pre>` itself scrolls.
- Numbering (01/02/03) appears only in the stages and walkthrough sections, where order carries real information. Do not add it to the repo cards.
- Prose belongs in `translation.json`; code blocks stay inline in components.

## Related projects

- `raidr_extension` — the capture extension
- `raidr_cli` — reconstruction CLI and the agent skill
- `raidr_lib` — bundle format and pure analysis
- `sudobility` — the landing-page template this follows
