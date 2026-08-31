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
visual check at 1440px and 390px.

## Design system

The palette is radiographic film, defined in `tailwind.config.js`:
`film` (base), `plate`, `shelf`, `bone` (dense material reads bright),
`exposure` (steel blue), `flare` (amber, the only warm accent — reserve it for
the primary CTA, numbering, and hover states).

Type is IBM Plex: `font-cond` for headings and labels, `font-sans` for body,
`font-mono` for all code and data.

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
