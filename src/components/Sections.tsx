import { useTranslation } from 'react-i18next';
import { Section, Code, Note } from './primitives';

/* The three-stage spine. Numbering is used here and nowhere else on the page,
   because this is the one place where order carries information. */
export function Stages() {
  const { t } = useTranslation();
  const stages = ['capture', 'bundle', 'reconstruct'] as const;

  return (
    <Section id="how" eyebrow={t('nav.howItWorks')} title={t('stages.title')} lede={t('stages.lede')}>
      <ol className="grid gap-px overflow-hidden rounded-sm border border-white/10 bg-white/10 [&>*]:min-w-0 sm:grid-cols-3">
        {stages.map((stage, index) => (
          <li key={stage} className="bg-film p-6">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-[11px] text-flare">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="font-cond text-lg font-semibold">{t(`stages.${stage}.name`)}</h3>
            </div>
            <p className="mt-1 font-cond text-[10px] uppercase tracking-plate text-bone/35">
              {t(`stages.${stage}.where`)}
            </p>
            <p className="mt-4 text-[14px] leading-relaxed text-bone/60">
              {t(`stages.${stage}.body`)}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export function Extension() {
  const { t } = useTranslation();
  const points = ['cdp', 'coverage', 'redaction'] as const;

  return (
    <Section id="extension" eyebrow={t('nav.extension')} title={t('extension.title')} lede={t('extension.lede')}>
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14 [&>*]:min-w-0">
        <div className="space-y-7">
          {points.map((point) => (
            <div key={point}>
              <h3 className="font-cond text-[15px] font-semibold text-bone">
                {t(`extension.${point}Title`)}
              </h3>
              <p className="mt-2 max-w-readable text-[14px] leading-relaxed text-bone/60">
                {t(`extension.${point}Body`)}
              </p>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <p className="font-cond text-[11px] uppercase tracking-plate text-exposure">
            {t('extension.installTitle')}
          </p>
          <p className="text-[14px] leading-relaxed text-bone/60">
            {t('extension.installBody')}
          </p>
          <Code caption="terminal">{`git clone https://github.com/johnqh/xray_extension
cd xray_extension && bun install && bun run build`}</Code>
          <Code caption="chrome">{`chrome://extensions → Developer mode → Load unpacked
select xray_extension/dist`}</Code>
          <Code caption="what a redacted request looks like">{`{
  "method": "POST",
  "url": "https://api.example.com/api/login",
  "requestHeaders": { "authorization": "<JWT:a1b2>" },
  "responseBodyHash": "8021533f75ad048d…",
  "status": 200
}`}</Code>
        </div>
      </div>
    </Section>
  );
}

/* The one inverted section: you pull the film off the wall and hold it to the
   light. It is also the section that is literally about inspecting the artifact. */
export function BundleSection() {
  const { t } = useTranslation();

  return (
    <Section id="bundle" eyebrow="Artifact" title={t('bundle.title')} lede={t('bundle.lede')} inverted>
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14 [&>*]:min-w-0">
        <Code inverted caption="xray-app.example.com-20260825-1430.zip">{`xray.json              manifest, detected stack, counts
network/
  requests.jsonl       one redacted request per line
  websockets.jsonl     frames
content/
  <sha256>.js          deduplicated bodies, byte-exact
  <sha256>.json
sourcemaps/
  index.json           script url → map hash
  <sha256>.map         sourcesContent intact
runtime/
  framework.json       react 18.3.1 · vite · react-router
  routes.json          the live router table
  chunks.json          loaded vs known
redaction.json         placeholder → kind. never values.
gaps.json              what was missed, and why`}</Code>

        <div className="space-y-6">
          <div>
            <h3 className="font-cond text-[15px] font-semibold">{t('bundle.gapsTitle')}</h3>
            <p className="mt-2 max-w-readable text-[14px] leading-relaxed text-film/70">
              {t('bundle.gapsBody')}
            </p>
          </div>
          <Code inverted caption="generated source, when capture fell short">{`// XRAY-GAP: chunk 47 (route /admin) never captured`}</Code>
          <Code inverted caption="replay server, same situation">{`GET /api/never-captured → 501
{ "error": "XRAY-GAP", "detail": "no endpoint captured" }`}</Code>
        </div>
      </div>
    </Section>
  );
}

export function Cli() {
  const { t } = useTranslation();

  return (
    <Section id="cli" eyebrow={t('nav.cli')} title={t('cli.title')} lede={t('cli.lede')}>
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14 [&>*]:min-w-0">
        <div className="space-y-4">
          <p className="font-cond text-[11px] uppercase tracking-plate text-exposure">
            {t('cli.installTitle')}
          </p>
          <Code caption="terminal">{`git clone https://github.com/johnqh/xray_lib
git clone https://github.com/johnqh/xray_cli

cd xray_lib && bun install && bun run build
cd ../xray_cli && bun install && bun link`}</Code>

          <p className="pt-2 font-cond text-[11px] uppercase tracking-plate text-exposure">
            {t('cli.runTitle')}
          </p>
          <Code caption="terminal">{`xray reconstruct capture.zip --out ./rebuilt`}</Code>

          <Code caption="./rebuilt/.xray/">{`report.md              start here
02-sources/            recovered original files
04-api-model.json      endpoints, schemas, auth
05-route-model.json    routes → the endpoints they fired
recordings.json        real captured responses`}</Code>
        </div>

        <div className="space-y-4">
          <p className="font-cond text-[11px] uppercase tracking-plate text-exposure">
            {t('cli.outputTitle')}
          </p>
          <p className="text-[14px] leading-relaxed text-bone/60">{t('cli.outputBody')}</p>
          <Code caption="actual output — react-sample.zip">{`{
  "recoveryRatio": 100,
  "mode": "recovery",
  "routes": 4,
  "endpoints": 5,
  "gaps": 0,
  "filesWritten": 14
}`}</Code>
        </div>
      </div>
    </Section>
  );
}

export function Skill() {
  const { t } = useTranslation();

  return (
    <Section id="skill" eyebrow={t('nav.skill')} title={t('skill.title')} lede={t('skill.lede')}>
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14 [&>*]:min-w-0">
        <div className="space-y-4">
          <p className="font-cond text-[11px] uppercase tracking-plate text-exposure">
            {t('skill.setupTitle')}
          </p>
          <Code caption="paste this once">{`git clone https://github.com/johnqh/xray_lib
git clone https://github.com/johnqh/xray_cli

cd xray_lib && bun install && bun run build
cd ../xray_cli && bun install && bun link

xray install --all`}</Code>

          <p className="pt-2 font-cond text-[11px] uppercase tracking-plate text-exposure">
            {t('skill.thenTitle')}
          </p>
          <Code caption="then, in a new session">{`reconstruct ~/Downloads/xray-app.example.com.zip`}</Code>
        </div>

        <div className="space-y-4">
          <p className="font-cond text-[11px] uppercase tracking-plate text-exposure">
            {t('skill.installTitle')}
          </p>
          <p className="text-[14px] leading-relaxed text-bone/60">
            {t('skill.installBody')}
          </p>

          <Code caption={t('skill.claudeTitle')}>{`xray install --claude`}</Code>
          <Code caption={t('skill.codexTitle')}>{`xray install --codex`}</Code>
          <Code caption={t('skill.sharedTitle')}>{`xray install --agents`}</Code>

          <p className="pt-1 text-[14px] leading-relaxed text-bone/60">
            {t('skill.codexBody')}
          </p>

          <Note title="What it will not do">
            Write an endpoint the capture never observed, or fill in a route you
            never visited. Both come back as gaps, because that is what the
            evidence says.
          </Note>
        </div>
      </div>
    </Section>
  );
}

export function Walkthrough() {
  const { t } = useTranslation();
  const steps = ['s1', 's2', 's3', 's4', 's5', 's6'] as const;
  const commands: Record<string, string | null> = {
    s1: null,
    s2: null,
    s3: null,
    s4: 'xray reconstruct ~/Downloads/xray-app.zip --out ./rebuilt',
    s5: '> reconstruct ./rebuilt',
    s6: 'cd rebuilt && bun install && bun run build && bun run server/replay.ts',
  };

  return (
    <Section id="walkthrough" eyebrow="End to end" title={t('walkthrough.title')} lede={t('walkthrough.lede')}>
      <ol className="space-y-8">
        {steps.map((step, index) => (
          <li key={step} className="grid gap-4 [&>*]:min-w-0 sm:grid-cols-[3rem_minmax(0,1fr)]">
            <span className="font-mono text-[12px] text-flare">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div>
              <p className="max-w-readable text-[15px] leading-relaxed text-bone/75">
                {t(`walkthrough.${step}`)}
              </p>
              {commands[step] && (
                <div className="mt-3">
                  <Code>{commands[step]!}</Code>
                </div>
              )}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export function Repos() {
  const { t } = useTranslation();
  const repos = [
    { name: 'xray_extension', key: 'extension' },
    { name: 'xray_cli', key: 'cli' },
    { name: 'xray_lib', key: 'lib' },
  ] as const;

  return (
    <Section id="repos" eyebrow={t('nav.repos')} title={t('repos.title')} lede={t('repos.lede')}>
      <div className="grid gap-px overflow-hidden rounded-sm border border-white/10 bg-white/10 [&>*]:min-w-0 sm:grid-cols-3">
        {repos.map((repo) => (
          <a
            key={repo.name}
            href={`https://github.com/johnqh/${repo.name}`}
            className="group bg-film p-6 transition-colors hover:bg-plate"
          >
            <h3 className="font-mono text-[13px] text-bone group-hover:text-flare">
              {repo.name}
            </h3>
            <p className="mt-3 text-[14px] leading-relaxed text-bone/55">
              {t(`repos.${repo.key}`)}
            </p>
            <span className="mt-4 inline-block font-cond text-[10px] uppercase tracking-plate text-bone/30 group-hover:text-bone/60">
              github ↗
            </span>
          </a>
        ))}
      </div>
    </Section>
  );
}
