"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { ChevronRight, ArrowRight } from "lucide-react";

type ProjectItem = {
  id: string;
  title: string;
  sector: string;
  scope: string;
  location: string;
  image: string;
  span?: string;
};

const easeExp = [0.16, 1, 0.3, 1] as [number, number, number, number];

export function ProjectsContent() {
  const { t } = useTranslation("content");
  const { t: tc } = useTranslation("common");
  const projects = t("projects.items", { returnObjects: true }) as ProjectItem[];
  const hero = t("projects.hero", { returnObjects: true }) as { titleLead: string; titleAccent: string; description: string };

  return (
    <main className="w-full bg-[#f8f9fa] pt-24 pb-32 font-sans text-gray-900 selection:bg-[#FF6B00] selection:text-white">
      
      {/* ─── 1. HERO SECTION ─── */}
      <section className="mx-auto max-w-350 px-4 sm:px-6 lg:px-8">
        <div className="relative min-h-115 h-[60vh] w-full overflow-hidden rounded-4xl bg-gray-900 shadow-sm">
          
          <div className="absolute inset-0 z-0">
            <img
              src="/port.webp"
              alt="Operational Portfolio Banner"
              className="h-full w-full object-cover opacity-85"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-black/10" />
          </div>

          <div className="relative z-10 flex h-full flex-col justify-between p-8 sm:p-12 md:p-16">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-white/90">
              <span className="cursor-pointer opacity-80 hover:underline">AFSECMO</span>
              <ChevronRight className="h-3 w-3 stroke-3 text-white/50" />
              <span className="text-white">{tc("nav.projects")}</span>
            </div>

            <div className="max-w-3xl text-left">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: easeExp }}
                className="text-4xl font-medium leading-none tracking-tight text-white sm:text-5xl lg:text-7xl uppercase"
              >
                {hero.titleLead} <span className="block text-[#FF6B00]">{hero.titleAccent}</span>
              </motion.h1>
              <p className="mt-4 max-w-2xl text-base font-light leading-relaxed text-gray-200 sm:text-lg">
                {hero.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. ARCHITECTURAL PROJECT GRID ─── */}
      <section className="mx-auto max-w-350 px-4 pt-16 sm:px-6 lg:px-8 lg:pt-24">
        {/* Using grid-flow-row-dense to pack cards tightly */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-flow-row-dense gap-4 sm:gap-6">
          {projects.map((proj, index) => {
            
            // ─── GUARANTEED ORPHAN FIX ───
            const isLastCard = index === projects.length - 1;
            
            // If it is the very last card, we completely ignore the JSON span and force it to `col-span-full`.
            // This guarantees it stretches across the entire bottom row and never sits alone.
            const cardSpan = isLastCard ? "md:col-span-full" : (proj.span || "");

            return (
              <motion.div
                key={proj.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: easeExp }}
                className={`group relative h-100 md:h-120 w-full cursor-pointer overflow-hidden rounded-2xl bg-black ${cardSpan}`}
              >
                
                {/* Image Container */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="h-full w-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/40 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
                </div>

                {/* Massive Number overlay */}
                <div className="absolute right-6 top-6 z-10 overflow-hidden">
                  <span className="block text-4xl font-black text-white/30 transition-colors duration-500 group-hover:text-[#FF6B00]/80">
                    {proj.id}
                  </span>
                </div>

                {/* Content */}
                <div className="relative z-10 flex h-full flex-col justify-end p-6 lg:p-8">
                  <div className="mb-4 flex items-center gap-2">
                    <span className="flex items-center text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF6B00]">
                      <span className="mr-2 h-1.5 w-1.5 rounded-full bg-[#FF6B00]" />
                      {proj.sector}
                    </span>
                  </div>
                  
                  <h3 className="mb-2 text-2xl font-light leading-[1.2] tracking-tight text-white sm:text-3xl lg:text-[32px]">
                    {proj.title}
                  </h3>
                  
                  <p className="mb-6 max-w-md text-sm font-light leading-relaxed text-white/80">
                    {proj.scope}
                  </p>

                  <div className="flex items-center justify-between border-t border-white/20 pt-5">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60 transition-colors duration-300 group-hover:text-white">
                      {proj.location}
                    </span>
                    
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-transparent transition-all duration-500 group-hover:border-[#FF6B00] group-hover:bg-[rgba(255,107,0,0.15)]">
                      <ArrowRight className="h-3.5 w-3.5 stroke-white transition-transform duration-500 group-hover:-rotate-45 group-hover:stroke-[#FF6B00]" strokeWidth={2} />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

    </main>
  );
}

export default function ProjectShowcase() {
  return null;
}