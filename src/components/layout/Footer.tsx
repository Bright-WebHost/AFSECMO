"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/components/i18n/LanguageSwitcher";
import { type Locale } from "@/i18n/locales";
import { withLocalePath } from "@/i18n/routing";

export default function Footer() {
  const { t } = useTranslation("common");
  const params = useParams<{ locale?: Locale }>();
  const locale = params?.locale === "fr" ? "fr" : "en";
  const year = new Date().getFullYear();

  return (
    // Switched to full-bleed white background canvas with spacious padding block boundaries
    <footer className="w-full bg-white text-gray-900 border-t border-gray-200 pt-24 pb-12 font-sans">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        
        {/* Main Clean Corporate Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-20 border-b border-gray-100">
          
          {/* Brand & Corporate Identity Column */}
          <div className="md:col-span-6 lg:col-span-6">
            <Link href={withLocalePath(locale, "/")} className="inline-block mb-6">
              <img src="/logo.svg" alt="AFSECMO" className="h-10 w-auto" />
            </Link>
            <h2 className="text-base font-semibold text-gray-900 mb-6 uppercase tracking-[0.15em]">
              {t("footer.title")}
            </h2>
            <p className="text-sm font-light leading-relaxed text-gray-500 max-w-sm mb-6">
              {t("footer.description")}
            </p>
            
            {/* Location Track Parameters */}
            <div className="text-[11px] font-medium uppercase tracking-widest text-gray-400">
              <span>{t("footer.location")}</span>
            </div>
          </div>

          {/* Contact Details Column */}
          <div className="md:col-span-3 lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-6">
              {t("footer.connect")}
            </h3>
            <ul className="space-y-4">
              <li>
                <a 
                  href="mailto:info@afsecmo.com" 
                  className="text-sm font-light text-gray-600 hover:text-[#FF6B00] transition-colors duration-200"
                >
                  info@afsecmo.com
                </a>
              </li>
              <li>
                <a 
                  href="tel:+2250700070077" 
                  className="text-sm font-light text-gray-600 hover:text-[#FF6B00] transition-colors duration-200"
                >
                  +225 07 00 07 00 77
                </a>
              </li>
            </ul>
          </div>

          {/* Actions & Language Selection Column */}
          <div className="md:col-span-3 lg:col-span-3 flex flex-col items-start justify-between h-full gap-8">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
                {t("footer.actions")}
              </h3>
              <Link
                href={withLocalePath(locale, "/contact")}
                className="inline-flex items-center text-sm font-medium text-[#FF6B00] hover:text-[#E65C00] transition-colors group"
              >
                <span>{t("footer.requestConsultation")}</span>
                <span className="ml-1.5 transform transition-transform duration-200 group-hover:translate-x-0.5">→</span>
              </Link>
            </div>

            {/* Language Selection Bar explicitly nested below the action blocks */}
            <div className="text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors">
              <LanguageSwitcher compact />
            </div>
          </div>

        </div>

        {/* Minimalist Corporate Meta Legal Subbar */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 gap-4">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] font-light text-gray-400 tracking-wide uppercase">
            <p>
              {t("footer.copyright", { year })}
            </p>
          </div>
          
          <div>
            <p className="text-[11px] font-light text-gray-300 tracking-wide uppercase">
              {t("footer.prepared")}
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}