"use client";

import { useEffect, useMemo } from "react";
import i18next, { type i18n as I18nInstance } from "i18next";
import { initReactI18next, I18nextProvider } from "react-i18next";
import enCommon from "@/i18n/locales/en/common.json";
import enHome from "@/i18n/locales/en/home.json";
import enContent from "@/i18n/locales/en/content.json";
import frCommon from "@/i18n/locales/fr/common.json";
import frHome from "@/i18n/locales/fr/home.json";
import frContent from "@/i18n/locales/fr/content.json";
import type { Locale } from "@/i18n/locales";

const resources = {
  en: {
    common: enCommon,
    home: enHome,
    content: enContent,
  },
  fr: {
    common: frCommon,
    home: frHome,
    content: frContent,
  },
};

let i18nInstance: I18nInstance | null = null;

function getI18n() {
  if (!i18nInstance) {
    i18nInstance = i18next.createInstance();
    i18nInstance.use(initReactI18next).init({
      resources,
      lng: "en",
      fallbackLng: "en",
      supportedLngs: ["en", "fr"],
      defaultNS: "common",
      ns: ["common", "home", "content"],
      interpolation: { escapeValue: false },
      react: { useSuspense: false },
    });
  }

  return i18nInstance;
}

export default function I18nProvider({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const i18n = useMemo(() => getI18n(), []);

  useEffect(() => {
    void i18n.changeLanguage(locale);
  }, [i18n, locale]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
