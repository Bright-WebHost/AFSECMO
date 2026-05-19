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
    <footer className="border-t border-white/10 bg-[#060A11] pt-20 pb-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          
          {/* Brand & Corporate Identity */}
          <div className="col-span-1 lg:col-span-2">
            <h2 className="text-xl font-semibold text-white mb-6 uppercase tracking-widest">{t("footer.title")}</h2>
            <p className="text-sm text-white/50 max-w-sm leading-relaxed mb-6">
              {t("footer.description")}
            </p>
            <div className="flex gap-4 text-[10px] uppercase tracking-[0.2em] text-[#FF6B00] font-bold">
              <span>{t("footer.location")}</span>
              <span>|</span>
              <LanguageSwitcher compact />
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-6">{t("footer.connect")}</h3>
            <ul className="space-y-4">
              <li className="text-sm text-white/60 hover:text-[#FF6B00] transition-colors">
                <a href="mailto:info@afsecmo.com">info@afsecmo.com</a>
              </li>
              <li className="text-sm text-white/60 hover:text-[#FF6B00] transition-colors">
                <a href="tel:+2250700070077">+225 07 00 07 00 77</a>
              </li>
            </ul>
          </div>

          {/* Quick Actions */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-6">{t("footer.actions")}</h3>
            <Link
              href={withLocalePath(locale, "/contact")}
              className="inline-block border border-[#FF6B00] text-[#FF6B00] px-6 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-[#FF6B00] hover:text-white transition-all"
            >
              {t("footer.requestConsultation")}
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-white/5 gap-6">
          <p className="text-[10px] text-white/30 uppercase tracking-[0.1em]">
            {t("footer.copyright", { year })}
          </p>
          <p className="text-[10px] text-white/20 uppercase tracking-[0.1em]">
            {t("footer.prepared")}
          </p>
        </div>
      </div>
    </footer>
  );
}