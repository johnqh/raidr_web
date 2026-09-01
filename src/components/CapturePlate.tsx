import { CAPTURE_ROWS, NAV_LABELS, type PlateRow } from "../data/capture";

/**
 * The signature. A radiograph is a negative: dense material reads bright. So
 * the 205 KB bundle is the brightest, widest band on the plate, and a 66-byte
 * JSON response is a thin filament. The shape of the app is legible before you
 * read a single label.
 */

// Log scale, or the entry chunk is the only thing you can see.
function widthFor(bytes: number): number {
  if (bytes <= 0) return 4;
  const scaled = Math.log10(bytes + 1) / Math.log10(205039 + 1);
  return 6 + scaled * 94;
}

function formatBytes(bytes: number): string {
  if (bytes <= 0) return "—";
  return bytes < 1024 ? `${bytes}` : `${(bytes / 1024).toFixed(1)}k`;
}

const DENSITY: Record<PlateRow["kind"], string> = {
  script: "bg-foreground",
  document: "bg-accent",
  api: "bg-primary",
  preflight: "bg-muted",
};

const OPACITY: Record<PlateRow["kind"], string> = {
  script: "opacity-95",
  document: "opacity-70",
  api: "opacity-90",
  preflight: "opacity-45",
};

export function CapturePlate({ label }: { label: string }) {
  return (
    <figure className="relative plate-grain plate-surface overflow-hidden rounded-sm border border-foreground/10">
      <figcaption className="flex items-baseline justify-between gap-4 border-b border-foreground/10 px-4 py-2.5">
        <span className="font-cond text-[10px] uppercase tracking-plate text-accent">
          {label}
        </span>
        <span className="font-mono text-[10px] text-foreground/40">CDP 1.3</span>
      </figcaption>

      <div className="px-4 py-4">
        {NAV_LABELS.map((navLabel, navIndex) => {
          const rows = CAPTURE_ROWS.filter((row) => row.nav === navIndex + 1);
          return (
            <div key={navLabel} className="mb-3 last:mb-0">
              <div className="mb-1.5 flex items-center gap-2">
                <span className="font-mono text-[10px] text-foreground/35">
                  nav{navIndex + 1}
                </span>
                <span className="font-mono text-[10px] text-foreground/55">
                  {navLabel}
                </span>
                <span className="h-px flex-1 bg-foreground/[0.07]" />
              </div>

              {rows.map((row, rowIndex) => (
                <div
                  key={`${row.method}${row.path}`}
                  className="expose group flex items-center gap-3 py-[3px]"
                  style={{
                    animationDelay: `${(navIndex * 6 + rowIndex) * 45 + 200}ms`,
                  }}
                >
                  <span className="w-[52px] shrink-0 text-right font-mono text-[10px] text-foreground/40">
                    {row.method}
                  </span>

                  <span className="relative h-[7px] flex-1">
                    <span
                      className={`absolute inset-y-0 left-0 rounded-[1px] ${DENSITY[row.kind]} ${OPACITY[row.kind]} transition-opacity group-hover:opacity-100`}
                      style={{ width: `${widthFor(row.bytes)}%` }}
                    />
                  </span>

                  <span className="hidden w-[190px] shrink-0 truncate font-mono text-[10px] text-foreground/45 sm:block">
                    {row.path}
                  </span>
                  <span className="w-[54px] shrink-0 text-right font-mono text-[10px] text-foreground/30">
                    {formatBytes(row.bytes)}
                  </span>
                </div>
              ))}
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-1 border-t border-foreground/10 px-4 py-2.5">
        {(
          [
            ["script", "JavaScript"],
            ["document", "Document"],
            ["api", "API"],
            ["preflight", "Preflight"],
          ] as const
        ).map(([kind, name]) => (
          <span key={kind} className="flex items-center gap-1.5">
            <span
              className={`h-[7px] w-4 rounded-[1px] ${DENSITY[kind]} ${OPACITY[kind]}`}
            />
            <span className="font-mono text-[10px] text-foreground/40">{name}</span>
          </span>
        ))}
      </div>
    </figure>
  );
}
