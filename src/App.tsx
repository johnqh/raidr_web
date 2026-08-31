import { Suspense } from "react";
import { useTranslation } from "react-i18next";
import { Hero } from "./components/Hero";
import {
  Stages,
  Extension,
  BundleSection,
  Cli,
  Skill,
  Walkthrough,
  Repos,
} from "./components/Sections";
import { REPO_BASE } from "./components/primitives";

function TopBar() {
  const { t } = useTranslation();
  const links = [
    ["how", t("nav.howItWorks")],
    ["extension", t("nav.extension")],
    ["cli", t("nav.cli")],
    ["skill", t("nav.skill")],
    ["repos", t("nav.repos")],
  ] as const;

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-film/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-3.5 sm:px-8">
        <a
          href="#top"
          className="font-cond text-[15px] font-bold tracking-[-0.01em]"
        >
          raidr
        </a>
        <div className="flex items-center gap-5">
          {links.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className="hidden font-cond text-[11px] uppercase tracking-plate text-bone/50 transition-colors hover:text-bone md:inline"
            >
              {label}
            </a>
          ))}
          <a
            href={`${REPO_BASE}/raidr_cli`}
            className="font-cond text-[11px] uppercase tracking-plate text-flare/90 transition-colors hover:text-flare"
          >
            GitHub
          </a>
        </div>
      </div>
    </nav>
  );
}

const REPOS = [
  "raidr_extension",
  "raidr_cli",
  "raidr_lib",
  "raidr_web",
] as const;

function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="border-t border-white/10 py-14">
      <div className="mx-auto w-full max-w-5xl px-5 sm:px-8">
        <p className="max-w-readable text-[13px] leading-relaxed text-bone/45">
          {t("footer.note")}
        </p>
        <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2">
          {REPOS.map((repo) => (
            <li key={repo}>
              <a
                href={`${REPO_BASE}/${repo}`}
                className="font-mono text-[12px] text-bone/55 transition-colors hover:text-flare"
              >
                {repo} ↗
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-6 font-mono text-[11px] text-bone/25">
          {t("footer.built")}
        </p>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-film" />}>
      <div id="top">
        <TopBar />
        <main>
          <Hero />
          <Stages />
          <Extension />
          <BundleSection />
          <Cli />
          <Skill />
          <Walkthrough />
          <Repos />
        </main>
        <Footer />
      </div>
    </Suspense>
  );
}
