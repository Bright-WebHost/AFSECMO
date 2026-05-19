"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import { localeLabels, type Locale } from "@/i18n/locales";
import { withLocalePath } from "@/i18n/routing";

const supportedLocales: Locale[] = ["en", "fr"];

type LanguageSwitcherProps = {
  className?: string;
  compact?: boolean;
};

export default function LanguageSwitcher({ className = "", compact = false }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams<{ locale?: Locale }>();
  const currentLocale = params?.locale && supportedLocales.includes(params.locale) ? params.locale : "en";

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      {supportedLocales.map((locale) => {
        const active = locale === currentLocale;

        return (
          <button
            key={locale}
            type="button"
            onClick={() => {
              router.push(withLocalePath(locale, pathname));
            }}
            aria-pressed={active}
            className={`rounded-full border px-3 py-1.5 text-xs font-bold uppercase tracking-[0.2em] transition-all ${
              compact
                ? "border-white/10 bg-white/5 text-white/70 hover:border-[#FF6B00]/40 hover:text-[#FF6B00]"
                : "border-white/10 bg-white/5 text-white/70 hover:border-[#FF6B00]/40 hover:text-[#FF6B00]"
            } ${active ? "border-[#FF6B00]/50 text-[#FF6B00]" : ""}`}
          >
            {localeLabels[locale]}
          </button>
        );
      })}
    </div>
  );
}
