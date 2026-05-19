import { defineConfig } from "next-i18next";
import { supportedLocales } from "./src/i18n/locales";

export default defineConfig({
  supportedLngs: [...supportedLocales],
  fallbackLng: "en",
  defaultNS: "common",
  ns: ["common", "home", "content"],
  localeInPath: true,
  reloadOnPrerender: process.env.NODE_ENV === "development",
  resourceLoader: (language, namespace) =>
    import(`./src/i18n/locales/${language}/${namespace}.json`),
});
