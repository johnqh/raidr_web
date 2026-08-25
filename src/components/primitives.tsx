import type { ReactNode } from 'react';

export function Section({
  id,
  eyebrow,
  title,
  lede,
  children,
  inverted = false,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  lede?: string;
  children: ReactNode;
  inverted?: boolean;
}) {
  return (
    <section
      id={id}
      className={
        inverted
          ? 'border-y border-black/10 bg-bone py-16 text-film sm:py-24'
          : 'py-16 sm:py-24'
      }
    >
      <div className="mx-auto w-full max-w-5xl px-5 sm:px-8">
        {eyebrow && (
          <p
            className={`font-cond text-[11px] uppercase tracking-plate ${
              inverted ? 'text-film/45' : 'text-exposure'
            }`}
          >
            {eyebrow}
          </p>
        )}
        <h2 className="mt-3 font-cond text-3xl font-semibold tracking-tight sm:text-4xl">
          {title}
        </h2>
        {lede && (
          <p
            className={`mt-4 max-w-readable text-[15px] leading-relaxed ${
              inverted ? 'text-film/70' : 'text-bone/60'
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
        inverted ? 'border-film/15 bg-film/[0.04]' : 'border-white/10 bg-plate'
      }`}
    >
      {caption && (
        <div
          className={`border-b px-4 py-2 font-cond text-[10px] uppercase tracking-plate ${
            inverted
              ? 'border-film/10 text-film/45'
              : 'border-white/10 text-bone/40'
          }`}
        >
          {caption}
        </div>
      )}
      <pre className="overflow-x-auto px-4 py-3.5">
        <code
          className={`font-mono text-[12.5px] leading-[1.75] ${
            inverted ? 'text-film/85' : 'text-bone/80'
          }`}
        >
          {children}
        </code>
      </pre>
    </div>
  );
}

export function Note({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="border-l-2 border-flare/60 pl-4">
      <p className="font-cond text-[11px] uppercase tracking-plate text-flare/90">
        {title}
      </p>
      <p className="mt-2 max-w-readable text-[14px] leading-relaxed text-bone/60">
        {children}
      </p>
    </div>
  );
}
