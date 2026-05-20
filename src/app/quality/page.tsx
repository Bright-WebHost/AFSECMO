"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ArrowRight, ChevronRight } from "lucide-react";
import Link from "next/link";

type Standard = { title: string; category: string; copy: string };

export function QualityContent() {
  const { t } = useTranslation("content");
  const standards = t("quality.standards", { returnObjects: true }) as Standard[];
  const hero = t("quality.hero", { returnObjects: true }) as { eyebrow: string; titleLead: string; titleAccent: string; description: string };

  return (
    // Pristine off-white corporate canvas foundation matching the Aramco screenshots
    <main className="w-full bg-[#f8f9fa] text-gray-900 font-sans selection:bg-[#FF6B00] selection:text-white pt-24 pb-24">
      
      {/* ─── 1. Structural Rounded Hero Card Banner (image_d89325.jpg) ─── */}
      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="relative h-[60vh] min-h-[460px] w-full overflow-hidden rounded-[2rem] bg-gray-900 shadow-sm">
          
          <div className="absolute inset-0 z-0">
            <img
              src="/08.png"
              alt="Quality Standards Banner"
              className="h-full w-full object-cover opacity-85"
            />
            {/* Crisp dynamic linear dark gradient for legible headers */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
          </div>

          {/* Breadcrumbs & Title Text Overlay Cluster */}
          <div className="relative z-10 flex h-full flex-col justify-between p-8 sm:p-12 md:p-16">
            
            {/* Top-Aligned Navigation Path Track */}
            <div className="flex items-center gap-2 text-xs font-semibold text-white/90 tracking-wide">
              <span className="opacity-80 hover:underline cursor-pointer">AFSECMO</span>
              <ChevronRight className="h-3 w-3 text-white/50 stroke-[3]" />
              <span className="text-white">Quality & Compliance</span>
            </div>

            {/* Bottom-left Asymmetrical Main Header Display */}
            <div className="max-w-3xl text-left">
              <h1 className="text-4xl font-medium tracking-tight text-white sm:text-5xl lg:text-6xl uppercase leading-none">
                {hero.titleLead} <span className="block text-[#FF6B00]">{hero.titleAccent}</span>
              </h1>
            </div>

          </div>
        </div>
      </section>

      {/* ─── 2. Introductory Summary Paragraph Row ─── */}
      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-16 pb-12 lg:pt-24 border-b border-gray-100">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:items-start lg:gap-10">
          <div className="md:col-span-4">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-[#FF6B00]">
              {hero.eyebrow || "OPERATIONAL METRICS"}
            </h2>
          </div>
          <div className="md:col-span-8">
            <p className="text-lg font-light leading-relaxed text-gray-600 max-w-3xl">
              {hero.description}
            </p>
          </div>
        </div>
      </section>

      {/* ─── 3. Borderless Content Grid cluster (image_d8932a.jpg "In this section") ─── */}
      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        
        {/* Clean, minimalist section label matching reference */}
        <div className="mb-12">
          <h2 className="text-2xl font-light tracking-tight text-gray-900 sm:text-3xl">
            In this section
          </h2>
        </div>

        {/* Strict grid mapping (3 cards wide on desktop) */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {Array.isArray(standards) && standards.map((standard, index) => (
            <Link
              key={standard.title || index}
              href="/contact" 
              className="group flex flex-col cursor-pointer text-left"
            >
              {/* Media Element block */}
              <div className="h-56 w-full overflow-hidden rounded-2xl bg-gray-100 sm:h-60 md:h-64 shadow-xs">
                <img
                  src={index % 2 === 0 ? "/13.png" : "/08.png"}
                  alt={standard.title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                />
              </div>

              {/* Informational Text container elements directly on page background */}
              <div className="mt-5 flex flex-col pr-2">
                <div className="mb-2 flex items-center gap-3">
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#FF6B00]">
                    SYS // REG 0{index + 1}
                  </span>
                  {standard.category && (
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[8px] font-semibold uppercase tracking-wider text-gray-400">
                      {standard.category}
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-medium tracking-tight text-gray-900 leading-snug transition-colors group-hover:text-gray-600">
                  {standard.title}
                </h3>
                
                <p className="mt-2 text-xs font-light leading-relaxed text-gray-500 line-clamp-3">
                  {standard.copy}
                </p>

                {/* Minimalist interactive link wrapper with circled arrow */}
                <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold tracking-wider text-[#FF6B00] transition-colors group-hover:text-[#E65C00]">
                  <span>Verify operational compliance desk</span>
                  <div className="flex h-5 w-5 items-center justify-center rounded-full border border-[#FF6B00]/40 transition-colors group-hover:border-[#E65C00]">
                    <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </main> // FIXED closing tag to match line 18
  );
}

export default QualityContent;