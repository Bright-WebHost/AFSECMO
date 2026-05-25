import type { Metadata } from "next";
import { AboutContent } from "@/app/about/page";
import { CareersContent } from "@/app/careers/page";
import { ContactContent } from "@/app/contact/page";
import { MethodContent } from "@/app/method/page";
import { ProjectsContent } from "@/app/projects/page";
import { QualityContent } from "@/app/quality/page";
import { SectorsContent } from "@/app/sectors/page";
import { ServicesContent } from "@/app/services/page";
import ContactSection from "@/components/home/contactsection";
import Hero from "@/components/home/Hero";
import SectorsGrid from "@/components/home/SectorsGrid";
import WhatWeBelieveSection from "@/components/home/whatwebieleve";
import ServicesGrid from "@/components/home/ServicesGrid";
import { getT } from "next-i18next/server";
import type { Locale } from "@/i18n/locales";
import { supportedLocales } from "@/i18n/locales";

const routeMap: Record<string, () => React.JSX.Element> = {
  about: () => <AboutContent />,
  careers: () => <CareersContent />,
  contact: () => <ContactContent />,
  method: () => <MethodContent />,
  projects: () => <ProjectsContent />,
  quality: () => <QualityContent />,
  sectors: () => <SectorsContent />,
  services: () => <ServicesContent />,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug?: string[] }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!supportedLocales.includes(locale as Locale)) {
    return {};
  }

  if (!slug?.length) {
    const { t } = await getT("home", { lng: locale as Locale });

    return {
      title: t("metadata.title"),
      description: t("metadata.description"),
    };
  }

  const route = slug[0];
  const { t } = await getT("content", { lng: locale as Locale });

  const metadataByRoute: Record<string, Metadata> = {
    about: {
      title: t("about.metadata.title"),
      description: t("about.metadata.description"),
    },
    services: {
      title: t("services.metadata.title"),
      description: t("services.metadata.description"),
    },
    sectors: {
      title: t("sectors.metadata.title"),
      description: t("sectors.metadata.description"),
    },
    method: {
      title: `${t("method.hero.titleLead")} ${t("method.hero.titleAccent")} | AFSECMO Group`,
      description: t("method.hero.description"),
    },
    quality: {
      title: `${t("quality.hero.eyebrow")} | AFSECMO Group`,
      description: t("quality.hero.description"),
    },
    projects: {
      title: `${t("projects.hero.titleLead")} ${t("projects.hero.titleAccent")} | AFSECMO Group`,
      description: t("projects.hero.description"),
    },
    careers: {
      title: `${t("careers.hero.titleLead")} ${t("careers.hero.titleAccent")} | AFSECMO Group`,
      description: t("careers.hero.description"),
    },
    contact: {
      title: t("contact.metadata.title"),
      description: t("contact.metadata.description"),
    },
  };

  return metadataByRoute[route] ?? {};
}

export default async function LocaleSlugPage({
  params,
}: {
  params: Promise<{ locale: string; slug?: string[] }>;
}) {
  const { locale, slug } = await params;

  if (!supportedLocales.includes(locale as Locale)) {
    return null;
  }

  const route = slug?.[0] ?? "";
  const Page = routeMap[route];

  if (!route) {
    const { t } = await getT("home", { lng: locale as Locale });

    return (
      <main className="relative min-h-screen bg-[#0F1B2E]">
        <Hero />
        <SectorsGrid />
        <WhatWeBelieveSection />
        <ServicesGrid />
        <ContactSection />
      </main>
    );
  }

  return Page ? <Page /> : null;
}
