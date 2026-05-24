"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import BrandLogo from "@/components/layout/BrandLogo";
import LanguageSwitcher from "@/components/i18n/LanguageSwitcher";
import { type Locale } from "@/i18n/locales";
import { withLocalePath } from "@/i18n/routing";

export default function Footer() {
  const { t } = useTranslation("common");
  const params = useParams<{ locale?: Locale }>();
  const locale = params?.locale === "fr" ? "fr" : "en";
  const year = new Date().getFullYear();

  return (
    // 1. Updated Background to Brand Blue and Border to translucent white
    <footer className="w-full bg-[#0F1B2E] text-white border-t border-white/10 pt-24 pb-12 font-sans">
      <div className="mx-auto max-w-350 px-6 lg:px-10">
        
        {/* Main Grid Layout */}
        <div className="flex flex-col md:grid md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          
          {/* Brand & Corporate Identity Column */}
          <div className="md:col-span-6 lg:col-span-6">
            <Link href={withLocalePath(locale, "/")} className="inline-block mb-8">
              <BrandLogo className="h-16 sm:h-20 w-auto object-contain" width={320} height={96} />
            </Link>
            <h2 className="text-base font-semibold text-white mb-6 uppercase tracking-[0.15em]">
              {t("footer.title")}
            </h2>
            <p className="text-sm font-light leading-relaxed text-white/70 max-w-sm mb-8">
              {t("footer.description")}
            </p>
            
            {/* Location Track Parameters */}
            <div className="text-[11px] font-medium uppercase tracking-widest text-white/40">
              <span>{t("footer.location")}</span>
            </div>
          </div>

          {/* 3. Grouped Contact and Actions in a nested grid so they sit side-by-side on mobile! */}
          <div className="md:col-span-6 lg:col-span-6 grid grid-cols-2 gap-4 sm:gap-12">
            
            {/* Contact Details Column */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-6">
                {t("footer.connect")}
              </h3>
              <ul className="space-y-4">
                <li>
                  <a 
                    href="mailto:info@afsecmo.com" 
                    // Synced the hover color to the brand orange #FF8C00
                    className="text-sm font-light text-white/70 hover:text-[#FF8C00] transition-colors duration-200 break-all"
                  >
                    info@afsecmo.com
                  </a>
                </li>
                <li>
                  <a 
                    href="tel:+2250700070077" 
                    className="text-sm font-light text-white/70 hover:text-[#FF8C00] transition-colors duration-200"
                  >
                    +225 07 00 07 00 77
                  </a>
                </li>
              </ul>
            </div>

            {/* Actions & Language Selection Column */}
            <div className="flex flex-col items-start justify-between h-full gap-8">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-5">
                  {t("footer.actions")}
                </h3>
                <Link
                  href={withLocalePath(locale, "/contact")}
                  className="inline-flex items-center text-sm font-medium text-[#FF8C00] hover:text-white transition-colors group"
                >
                  <span>{t("footer.requestConsultation")}</span>
                  <span className="ml-1.5 transform transition-transform duration-200 group-hover:translate-x-1">→</span>
                </Link>
              </div>

              {/* Language Selection Bar */}
              <div className="text-xs font-medium text-white/50 hover:text-white transition-colors">
                <LanguageSwitcher compact />
              </div>
            </div>

          </div>
        </div>

        {/* Minimalist Corporate Meta Legal Subbar */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 gap-4 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-6 gap-y-2 text-[11px] font-light text-white/40 tracking-wide uppercase">
            <p>
              {t("footer.copyright", { year })}
            </p>
          </div>
          
          {/* Removed prepared-for line per request */}
        </div>

      </div>
    </footer>
  );
}