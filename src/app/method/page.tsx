"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { ChevronRight } from "lucide-react";

type Phase = { num: string; tag: string; title: string; desc: string; image: string };

export function MethodContent() {
  const { t } = useTranslation("content");
  const phases = t("method.phases", { returnObjects: true }) as Phase[];
  const hero = t("method.hero", { returnObjects: true }) as {
    eyebrow: string;
    titleLead: string;
    titleAccent: string;
    subtitle: string;
    description: string;
  };

  return (
    // Pure bright corporate layout canvas background matching the rest of the site
    <main className="w-full bg-white text-gray-900 font-sans selection:bg-[#FF6B00] selection:text-white pt-24 pb-24">
      
      {/* ─── 1. Architectural Rounded Hero Card Banner ─── */}
      <section className="mx-auto max-w-350 px-4 sm:px-6 lg:px-8">
        <div className="relative h-[60vh] min-h-115 w-full overflow-hidden rounded-4xl bg-gray-900 shadow-sm">
          
          <div className="absolute inset-0 z-0">
            {/* High-res operational/methodology backdrop asset image */}
            <img
              src="/method.webp"
              alt={hero.eyebrow || "Our Methodology"}
              className="h-full w-full object-cover opacity-85"
            />
            {/* Linear dark gradient layer for crisp type legibility layout parameters */}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
          </div>

          {/* Breadcrumbs & Title Text Overlay Container */}
          <div className="relative z-10 flex h-full flex-col justify-between p-8 sm:p-12 md:p-16">
            
            {/* Top-Aligned Navigation Path Track */}
            <div className="flex items-center gap-2 text-xs font-semibold text-white/90 tracking-wide">
              <span className="opacity-80 hover:underline cursor-pointer">AFSECMO</span>
              <ChevronRight className="h-3 w-3 text-white/50 stroke-3" />
              <span className="text-white">Our method</span>
            </div>

            {/* Bottom-left Asymmetrical Main Header Display */}
            <div className="max-w-3xl text-left">
              <h1 className="text-4xl font-medium tracking-tight text-white sm:text-5xl lg:text-6xl uppercase">
                {hero.titleLead} <span className="block text-[#FF6B00]">{hero.titleAccent}</span>
              </h1>
              {hero.subtitle && (
                <p className="mt-2 text-xs uppercase tracking-[0.15em] text-gray-300 font-mono">
                  {hero.subtitle}
                </p>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* ─── 2. Introductory Overview Row ─── */}
      <section className="mx-auto max-w-350 px-4 sm:px-6 lg:px-8 pt-16 pb-12 lg:pt-24">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:items-start">
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

      {/* ─── 3. Clean Alternating Editorial Phase Stream ─── */}
      <section className="mx-auto max-w-350 px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col gap-24 lg:gap-32">
          {Array.isArray(phases) && phases.map((phase, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={phase.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`flex flex-col gap-8 lg:items-center lg:gap-16 ${
                  isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                {/* Asymmetric Media Container Block - Pure, un-tinted and vivid */}
                <div className="h-80 w-full overflow-hidden rounded-2xl bg-gray-100 shadow-xs sm:h-96 lg:h-120 lg:w-1/2">
                  <img
                    src={phase.image}
                    alt={phase.title}
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-102"
                  />
                </div>

                {/* Structured Text Content Details Column Block */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xl font-bold font-mono text-[#FF6B00]">
                      {phase.num}
                    </span>
                    {phase.tag && (
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                        {phase.tag}
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl font-medium tracking-tight text-gray-900 sm:text-3xl mb-4 uppercase">
                    {phase.title}
                  </h3>
                  
                  <div className="mb-6 h-px w-12 bg-[#FF6B00]" />
                  
                  <p className="text-base font-light leading-relaxed text-gray-600 max-w-xl">
                    {phase.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

    </main>
  );
}

export default function MethodPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/en/method");
  }, [router]);

  return null;
}