import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getResources, getT, initServerI18next } from "next-i18next/server";
import { I18nProvider } from "next-i18next/client";
import LenisProvider from "@/components/LenisProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GlobalScrollTracker from "@/components/ui/GlobalScrollTracker";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import i18nConfig from "../../../i18n.config";
import { supportedLocales, type Locale } from "@/i18n/locales";

initServerI18next(i18nConfig);

export async function generateStaticParams() {
  return supportedLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!supportedLocales.includes(locale as Locale)) {
    notFound();
  }

  const { t } = await getT("common", { lng: locale as Locale });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!supportedLocales.includes(locale as Locale)) {
    notFound();
  }

  const { i18n } = await getT("common", { lng: locale as Locale });
  const resources = getResources(i18n, ["common", "home", "content"]);

  return (
    <I18nProvider language={locale} resources={resources}>
      <LenisProvider>
        <div className="relative w-full max-w-[100vw] overflow-clip">
          <GlobalScrollTracker />
          <Navbar />
          {children}
          <Footer />
          <WhatsAppButton />
        </div>
      </LenisProvider>
    </I18nProvider>
  );
}
