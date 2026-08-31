# raidr_web

Single-page landing site for [raidr](https://github.com/johnqh/raidr_extension) — the
capture extension, the reconstruction CLI, and the agent skill.

## Development

```bash
bun install
bun run dev        # http://localhost:5140
bun run build      # → dist/
bun run preview
```

## Deployment

Cloudflare Pages, via `wrangler.toml` (`pages_build_output_dir = "./dist"`).
Build command `bun run build`.

## Localization

`react-i18next` is wired with the same 15-locale list the other sudobility
landing pages use, but only `public/locales/en/translation.json` is populated.
A missing locale falls back to `en`, so adding a language is just adding a file
— no code change.

Copy lives in the locale file. Code blocks and technical identifiers stay in the
components: `raidr reconstruct` is not a phrase to translate.

## Content policy

Every code block and every number on the page is copied from a real run — the
hero's capture plate is actual request data from
`raidr_cli/fixtures/bundles/react-sample.zip`, and the CLI output block is that
bundle's real reconstruct report. If the tools change, re-run them and update
the page rather than editing the numbers.

## The raidr project

| Repository | Role |
|---|---|
| [`raidr_lib`](https://github.com/johnqh/raidr_lib) | Bundle format and pure analysis |
| [`raidr_extension`](https://github.com/johnqh/raidr_extension) | Chrome MV3 extension that performs the capture |
| [`raidr_cli`](https://github.com/johnqh/raidr_cli) | Reconstruction CLI and the agent skill |
| [`raidr_web`](https://github.com/johnqh/raidr_web) | Landing site — this repo |

## License

BUSL-1.1 — see [LICENSE.md](LICENSE.md).
