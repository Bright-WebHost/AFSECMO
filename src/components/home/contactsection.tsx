"use client";

import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { withLocalePath } from "@/i18n/routing";

export default function ContactCTA() {
  const { t, i18n } = useTranslation("home");
  const locale = i18n.language === "fr" ? "fr" : "en";
  const contactCard = t("contact.cards.contact", { returnObjects: true }) as { title?: string; description?: string; cta?: string };
  const careersCard = t("contact.cards.careers", { returnObjects: true }) as { title?: string; description?: string; cta?: string };

  return (
    // Solid white background to differentiate from the #f8f9fa above it
    <section className="w-full border-t border-black/5 bg-white px-5 py-20 font-sans selection:bg-(--accent) selection:text-white sm:px-12 lg:px-16 xl:py-32">
      <div className="mx-auto max-w-350">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center lg:gap-8">
          
          {/* Left Side: The Main Message */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-(--accent)">
                {t("contact.eyebrow", "GLOBAL CONTACTS")}
              </span>
            </div>

            <h2 className="mb-6 text-3xl font-light leading-snug tracking-tight text-[#111] sm:text-4xl lg:text-5xl">
              {t("contact.titleLead", "Partner with AFSECMO to engineer")}{" "}
              <br className="hidden md:block" />
              <span className="font-medium text-(--accent)">
                {t("contact.titleAccent", "a better future for everyone.")}
              </span>
            </h2>

            <p className="max-w-xl text-lg leading-relaxed text-[#555]">
              {t("contact.description", "Whether you are looking for logistical solutions, energy partnerships, or industrial construction expertise across West Africa, our team is ready to assist.")}
            </p>
          </motion.div>

          {/* Right Side: The Action Cards */}
          <div className="flex flex-col gap-6 sm:flex-row lg:justify-end">
            
            {/* Primary Action Card (Light Gray / Elevated) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link 
                href="/contact"
                className="group flex h-full flex-col justify-between rounded-xs border border-transparent bg-[#f4f4f4] p-8 transition-transform duration-500 hover:-translate-y-1.5 sm:h-56 sm:w-72"
              >
                <div>
                  <h3 className="mb-2 text-xl font-light text-[#111]">{contactCard.title || "Get in touch"}</h3>
                    <p className="text-sm text-[#777]">{contactCard.description || "Reach out to our Abidjan headquarters or global offices."}</p>
                </div>
                
                <div className="mt-8 flex w-fit items-center gap-3 text-[11px] font-medium uppercase tracking-[0.18em] text-[#111]">
                  <span>{contactCard.cta || t("contact.cta", "Launch Inquiry")}</span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-black/10 transition-all duration-300 group-hover:border-(--accent) group-hover:bg-[rgba(255,140,0,0.08)]">
                    <ArrowRight className="h-3.5 w-3.5 stroke-[#111] transition-colors duration-300 group-hover:stroke-(--accent)" strokeWidth={2} />
                  </span>
                </div>
              </Link>
            </motion.div>

            {/* Secondary Action Card (White / Outlined) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link 
                href={withLocalePath(locale, "/careers")}
                className="group flex h-full flex-col justify-between rounded-xs border border-black/10 bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-black/20 hover:shadow-md sm:h-56 sm:w-72"
              >
                <div>
                  <h3 className="mb-2 text-xl font-light text-[#111]">{careersCard.title || "Join our team"}</h3>
                  <p className="text-sm text-[#777]">{careersCard.description || "Explore professional opportunities to make a positive difference."}</p>
                </div>
                
                <div className="mt-8 flex w-fit items-center gap-3 text-[11px] font-medium uppercase tracking-[0.18em] text-(--accent)">
                  <span>{careersCard.cta || "Explore Careers"}</span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#ccc] transition-all duration-300 group-hover:border-(--accent) group-hover:bg-[rgba(255,140,0,0.08)]">
                    <ArrowRight className="h-3.5 w-3.5 stroke-[#777] transition-colors duration-300 group-hover:stroke-(--accent)" strokeWidth={2} />
                  </span>
                </div>
              </Link>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}