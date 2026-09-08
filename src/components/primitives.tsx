import type { ReactNode } from "react";

export const REPO_BASE = "https://github.com/johnqh";

/* A direct link to the repository a section is about. Mono, because it names a
   repo, not a concept. */
export function RepoLink({
  repo,
  inverted = false,
}: {
  repo: string;
  inverted?: boolean;
}) {
  return (
    <a
      href={`${REPO_BASE}/${repo}`}
      className={`inline-flex shrink-0 items-center gap-2 rounded-sm border px-3 py-1.5 font-mono text-[12px] transition-colors ${
        inverted
          ? "border-background/20 text-background/70 hover:border-background/40 hover:text-background"
          : "border-foreground/12 text-foreground/60 hover:border-primary/50 hover:text-primary"
      }`}
    >
      {repo}
      <span aria-hidden="true">↗</span>
    </a>
  );
}

export function Section({
  id,
  eyebrow,
  title,
  lede,
  repo,
  children,
  inverted = false,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  lede?: string;
  repo?: string;
  children: ReactNode;
  inverted?: boolean;
}) {
  return (
    <section
      id={id}
      className={
        inverted
          ? "border-y border-background/10 bg-foreground py-16 text-background sm:py-24"
          : "py-16 sm:py-24"
      }
    >
      <div className="mx-auto w-full max-w-5xl px-5 sm:px-8">
        {eyebrow && (
          <p
            className={`font-cond text-[11px] uppercase tracking-plate ${
              inverted ? "text-background/45" : "text-accent"
            }`}
          >
            {eyebrow}
          </p>
        )}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
          <h2 className="font-cond text-3xl font-semibold tracking-tight sm:text-4xl">
            {title}
          </h2>
          {repo && <RepoLink repo={repo} inverted={inverted} />}
        </div>
        {lede && (
          <p
            className={`mt-4 max-w-readable text-[15px] leading-relaxed ${
              inverted ? "text-background/70" : "text-foreground/60"
            }`}
          >
            {lede}
          </p>
        )}
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

export function Code({
  children,
  caption,
  inverted = false,
}: {
  children: string;
  caption?: string;
  inverted?: boolean;
}) {
  return (
    <div
      className={`overflow-hidden rounded-sm border ${
        inverted
          ? "border-background/15 bg-background/[0.04]"
          : "border-foreground/10 bg-card"
      }`}
    >
      {caption && (
        <div
          className={`border-b px-4 py-2 font-cond text-[10px] uppercase tracking-plate ${
            inverted
              ? "border-background/10 text-background/45"
              : "border-foreground/10 text-foreground/40"
          }`}
        >
          {caption}
        </div>
      )}
      <pre className="overflow-x-auto px-4 py-3.5">
        <code
          className={`font-mono text-[12.5px] leading-[1.75] ${
            inverted ? "text-background/85" : "text-foreground/80"
          }`}
        >
          {children}
        </code>
      </pre>
    </div>
  );
}

export function Note({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="border-l-2 border-primary/60 pl-4">
      <p className="font-cond text-[11px] uppercase tracking-plate text-primary/90">
        {title}
      </p>
      <p className="mt-2 max-w-readable text-[14px] leading-relaxed text-foreground/60">
        {children}
      </p>
    </div>
  );
}
