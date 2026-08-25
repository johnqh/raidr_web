# xray_web

Single-page landing site for [xray](https://github.com/johnqh/xray_extension) — the
capture extension, the reconstruction CLI, and the agent skill.

## Development

```bash
bun install
bun run dev        # http://localhost:5173
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
components: `xray reconstruct` is not a phrase to translate.

## Content policy

Every code block and every number on the page is copied from a real run — the
hero's capture plate is actual request data from
`xray_cli/fixtures/bundles/react-sample.zip`, and the CLI output block is that
bundle's real reconstruct report. If the tools change, re-run them and update
the page rather than editing the numbers.

## The xray project

| Repository | Role |
|---|---|
| [`xray_lib`](https://github.com/johnqh/xray_lib) | Bundle format and pure analysis |
| [`xray_extension`](https://github.com/johnqh/xray_extension) | Chrome MV3 extension that performs the capture |
| [`xray_cli`](https://github.com/johnqh/xray_cli) | Reconstruction CLI and the agent skill |
| [`xray_web`](https://github.com/johnqh/xray_web) | Landing site — this repo |

## License

BUSL-1.1 — see [LICENSE.md](LICENSE.md).
