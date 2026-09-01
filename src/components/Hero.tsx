import { useTranslation } from "react-i18next";
import { CapturePlate } from "./CapturePlate";

export function Hero() {
  const { t } = useTranslation();

  return (
    <header className="relative overflow-hidden">
      <div className="mx-auto w-full max-w-6xl px-5 pb-14 pt-12 sm:px-8 sm:pb-20 sm:pt-16">
        <div className="grid items-center gap-12 [&>*]:min-w-0 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16">
          <div>
            <p className="font-cond text-[11px] uppercase tracking-plate text-accent">
              {t("hero.eyebrow")}
            </p>

            <h1 className="mt-5 font-cond text-[2.6rem] font-bold leading-[1.04] tracking-[-0.02em] sm:text-6xl">
              {t("meta.tagline")}
            </h1>

            <p className="mt-6 max-w-readable text-[16px] leading-relaxed text-foreground/65">
              {t("meta.intro")}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#walkthrough"
                className="rounded-sm bg-primary px-5 py-2.5 font-cond text-[13px] font-semibold uppercase tracking-plate text-background transition-opacity hover:opacity-85"
              >
                {t("hero.ctaPrimary")}
              </a>
              <a
                href="https://github.com/johnqh/raidr_extension"
                className="rounded-sm border border-foreground/15 px-5 py-2.5 font-cond text-[13px] font-semibold uppercase tracking-plate text-foreground/80 transition-colors hover:border-foreground/30 hover:text-foreground"
              >
                {t("hero.ctaSecondary")}
              </a>
            </div>
          </div>

          <CapturePlate label={t("hero.plateLabel")} />
        </div>
      </div>
    </header>
  );
}
