import type { Metadata } from "next";
import { AboutContent } from "@/app/about/page";
import CareersPage from "@/app/careers/page";
import { ContactContent } from "@/app/contact/page";
import { MethodContent } from "@/app/method/page";
import ProjectsPage from "@/app/projects/page";
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
  careers: () => <CareersPage />,
  contact: () => <ContactContent />,
  method: () => <MethodContent />,
  projects: () => <ProjectsPage />,
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

  return {};
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
