/**
 * i18next setup, imported for its side effect by main.tsx. Strings load over
 * HTTP from public/locales/<lang>/translation.json; the language comes from
 * `?lng=` or the browser, and is not cached.
 */
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

/**
 * Only `en` is populated today. The other locales are wired so translations can
 * be added later without a retrofit — drop a `translation.json` into
 * `public/locales/<lang>/` and it becomes available.
 */
export const supportedLanguages = [
  "en",
  "zh",
  "zh-hant",
  "ja",
  "ko",
  "es",
  "fr",
  "de",
  "it",
  "pt",
  "ru",
  "sv",
  "th",
  "uk",
  "vi",
] as const;

/** One of the wired locale codes. */
export type SupportedLanguage = (typeof supportedLanguages)[number];

void i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    supportedLngs: supportedLanguages as unknown as string[],
    interpolation: { escapeValue: false },
    backend: { loadPath: "/locales/{{lng}}/translation.json" },
    detection: { order: ["querystring", "navigator"], caches: [] },
  });

/** The initialised instance; components use `useTranslation()` instead. */
export default i18n;
