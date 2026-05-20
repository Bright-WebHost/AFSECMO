"use client";

import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";

export default function ContactCTA() {
  const { t } = useTranslation("home");

  return (
    <section className="w-full bg-[#f8f9fa] px-4 py-20 sm:px-6 lg:px-8 xl:py-32 font-sans border-t border-gray-200 selection:bg-[#FF6B00] selection:text-white">
      
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8 lg:items-center">
          
          {/* Left Side: The Main Message */}
          <div className="max-w-2xl">
            {/* Brand Orange Eyebrow */}
            <div className="mb-6 flex items-center gap-3">
              <span className="text-sm font-semibold uppercase tracking-widest text-[#FF6B00]">
                {t("contact.eyebrow", "GLOBAL CONTACTS")}
              </span>
            </div>

            <h2 className="text-3xl font-light leading-snug tracking-tight text-gray-900 sm:text-4xl lg:text-5xl mb-6">
              {t("contact.titleLead", "Partner with AFSECMO to engineer")} <br className="hidden md:block" />
              {/* Brand Orange Accent */}
              <span className="font-medium text-[#FF6B00]">
                {t("contact.titleAccent", "a better future for everyone.")}
              </span>
            </h2>

            <p className="max-w-xl text-lg leading-relaxed text-gray-600">
              {t("contact.description", "Whether you are looking for logistical solutions, energy partnerships, or industrial construction expertise across West Africa, our team is ready to assist.")}
            </p>
          </div>

          {/* Right Side: The Action Cards */}
          <div className="flex flex-col sm:flex-row gap-6 lg:justify-end">
            
            {/* Primary Action Card (Dark) */}
            <a 
              href="/contact"
              className="group flex flex-col justify-between rounded-xl bg-gray-900 p-8 shadow-sm transition-transform hover:-translate-y-1 sm:w-72 sm:h-56"
            >
              <div>
                <h3 className="text-xl font-medium text-white mb-2">Get in touch</h3>
                <p className="text-sm text-gray-400">Reach out to our Abidjan headquarters or global offices.</p>
              </div>
              <div className="flex w-fit items-center gap-2 text-sm font-semibold text-white mt-8 transition-colors group-hover:text-gray-300">
                <span>{t("contact.cta", "Contact Us")}</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </a>

            {/* Secondary Action Card (Light) */}
            <a 
              href="/careers"
              className="group flex flex-col justify-between rounded-xl bg-white border border-gray-200 p-8 shadow-sm transition-all hover:-translate-y-1 hover:border-gray-300 hover:shadow-md sm:w-72 sm:h-56"
            >
              <div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Join our team</h3>
                <p className="text-sm text-gray-500">Explore professional opportunities to make a positive difference.</p>
              </div>
              {/* Updated accent to Brand Orange */}
              <div className="flex w-fit items-center gap-2 text-sm font-semibold text-[#FF6B00] transition-colors group-hover:text-[#E65C00] mt-8">
                <span>Explore Careers</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </a>

          </div>
        </div>
      </div>
      
    </section>
  );
}