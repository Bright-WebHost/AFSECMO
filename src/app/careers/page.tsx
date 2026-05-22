"use client";

import { motion } from "framer-motion";
import { ChevronRight, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";

export function CareersContent() {
  const { t } = useTranslation("content");
  const hero = t("careers.hero", { returnObjects: true }) as {
    eyebrow: string;
    titleLead: string;
    titleAccent: string;
    description: string;
  };
  const sections = t("careers.sections", { returnObjects: true }) as {
    why: { title: string; copy: string };
    standards: { title: string; copy: string };
    contact: { eyebrow: string; title: string; email: string };
  };

  return (
    <main className="w-full bg-white text-gray-900 font-sans selection:bg-[#FF6B00] selection:text-white pt-24">
      {/* Hero Section - UNCHANGED as requested */}
      <section className="mx-auto max-w-350 px-4 sm:px-6 lg:px-8">
        <div className="relative h-[60vh] min-h-120 w-full overflow-hidden rounded-4xl bg-gray-900 shadow-sm">
          <div className="absolute inset-0 z-0">
            <img
              src="/career.jpg"
              alt="AFSECMO careers banner"
              className="h-full w-full object-cover opacity-85"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />
          </div>

          <div className="relative z-10 flex h-full flex-col justify-between p-8 sm:p-12 md:p-16">
            <div className="flex items-center gap-2 text-xs font-semibold text-white/90 tracking-wide">
              <span className="opacity-80 hover:underline cursor-pointer">AFSECMO</span>
              <ChevronRight className="h-3 w-3 text-white/50 stroke-3" />
              <span className="text-white">Careers</span>
            </div>

            <div className="max-w-2xl text-left">
              <h1 className="text-4xl font-medium tracking-tight text-white sm:text-5xl lg:text-6xl">
                {hero.titleLead} <span className="block text-[#FF6B00]">{hero.titleAccent}</span>
              </h1>
              <p className="mt-4 text-base font-light leading-relaxed text-gray-200 sm:text-lg">
                {hero.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy & Standards Section - Realigned to Site Aesthetic */}
      <section className="w-full bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-350 px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-24">
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col"
            >
              <h2 className="text-3xl font-light text-gray-900 sm:text-4xl">{sections.why.title}</h2>
              <div className="mt-8 h-px w-full bg-gray-100" />
              <p className="mt-8 text-lg font-light leading-relaxed text-gray-600">
                {sections.why.copy}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col"
            >
              <h2 className="text-3xl font-light text-gray-900 sm:text-4xl">{sections.standards.title}</h2>
              <div className="mt-8 h-px w-full bg-gray-100" />
              <p className="mt-8 text-lg font-light leading-relaxed text-gray-600">
                {sections.standards.copy}
              </p>
            </motion.div>
            
          </div>
        </div>
      </section>

      {/* Recruitment Contact - Redesigned as a Premium CTA Block */}
      <section className="mx-auto max-w-350 px-4 sm:px-6 lg:px-8 pb-32">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-[2.5rem] bg-[#0F1B2E] p-8 sm:p-16 md:p-24 text-center overflow-hidden relative"
        >
          {/* Subtle Background Accent */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF6B00]/5 blur-[120px] rounded-full -mr-32 -mt-32" />
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 text-[#FF6B00] text-xs font-bold uppercase tracking-[0.2em] mb-8">
              {sections.contact.eyebrow}
            </span>
            <h2 className="text-3xl font-light tracking-tight text-white sm:text-5xl lg:text-6xl mb-12">
              {sections.contact.title}
            </h2>
            
            <div className="flex flex-col items-center gap-6">
              <p className="text-white/60 text-sm uppercase tracking-widest font-medium">
                Dedicated Inbox
              </p>
              <a 
                href="mailto:careers@afsecmo.com" 
                className="group relative flex items-center gap-4 text-2xl font-light text-white transition-all hover:text-[#FF6B00] sm:text-4xl lg:text-5xl"
              >
                <span className="flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full border border-white/10 group-hover:border-[#FF6B00]/50 transition-colors">
                  <Mail className="h-6 w-6 sm:h-8 sm:w-8 text-[#FF6B00]" />
                </span>
                {sections.contact.email}
              </a>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}

export default function CareersPage() {
  return null;
}