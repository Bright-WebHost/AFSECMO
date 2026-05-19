export const supportedLocales = ["en", "fr"] as const;

export type Locale = (typeof supportedLocales)[number];

export const localeLabels: Record<Locale, string> = {
  en: "EN",
  fr: "FR",
};
