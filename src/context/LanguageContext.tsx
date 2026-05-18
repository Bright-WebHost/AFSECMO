"use client";

import React, { createContext, useContext, useMemo, useState } from "react";

type Language = "EN" | "FR";

type Translations = Record<string, Record<string, string>>;

type LanguageContextValue = {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
  dictionary: Translations;
};

const defaultDict: Translations = {
  EN: {
    siteName: "AFSECMO",
    services: "Services",
    sectors: "Sectors",
    method: "Method",
    quality: "Quality",
    about: "About Us",
    projects: "Projects",
    careers: "Careers",
    contact: "Contact",
    request: "Request",
  },
  FR: {
    siteName: "AFSECMO",
    services: "Services",
    sectors: "Secteurs",
    method: "Méthode",
    quality: "Qualité",
    about: "À propos",
    projects: "Projets",
    careers: "Carrières",
    contact: "Contact",
    request: "Demander",
  },
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("EN");

  const toggleLanguage = () => setLanguage((prev) => (prev === "EN" ? "FR" : "EN"));

  const dictionary = useMemo(() => defaultDict, []);

  const t = (key: string) => {
    return dictionary[language]?.[key] ?? dictionary.EN[key] ?? key;
  };

  const value: LanguageContextValue = {
    language,
    setLanguage,
    toggleLanguage,
    t,
    dictionary,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
