"use client";

import { ReactNode } from "react";
import { motion, Variants } from "framer-motion";
import { useTranslation } from "react-i18next";

type Pillar = {
  id: string;
  title: string;
  description: string;
  image?: string;
};

export default function MethodologyGrid() {
  const { t } = useTranslation("home");
  const pillars = t("methodology.pillars", { returnObjects: true }) as Pillar[];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 1, 0.5, 1] as const,
      },
    },
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#0F1B2E] px-4 py-20 sm:px-6 lg:px-8 xl:py-32 selection:bg-[#FF6B00] selection:text-white">

      {/* ── Background Lighting (Kept Exactly the Same) ── */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="absolute top-1/3 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-[#FF6B00]/10 blur-[160px]" />
        <div className="absolute -top-20 right-0 h-[400px] w-[400px] rounded-full bg-white/[0.04] blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-black/40 blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-12 lg:mb-16 w-full"
        >
          <div className="mb-4 lg:mb-6 flex items-center gap-4">
            <span className="h-px w-8 lg:w-10 bg-[#FF6B00]" />
            <span className="text-xs lg:text-sm font-bold uppercase tracking-[0.2em] text-[#FF6B00]">
              {t("methodology.eyebrow")}
            </span>
          </div>
          <h2 className="text-3xl font-light tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight lg:leading-none">
            {t("methodology.titleLead")} {" "}
            <br className="hidden md:block" />
            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/40">
              {t("methodology.titleAccent")}
            </span>
          </h2>
        </motion.div>

        {/* ── Bento Grid ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2"
        >

          {/* ── Cards 01 & 02 ── */}
          {/* IMPROVEMENT: Mobile is now grid-cols-1 to breathe, sm is grid-cols-2, lg is flex-col */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:flex lg:flex-col">
            {pillars.slice(0, 2).map((pillar) => (
              <motion.div
                key={pillar.id}
                variants={itemVariants}
                className="group relative flex flex-col justify-end overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0c1522]/90 p-6 sm:p-8 lg:flex-1 lg:p-10 backdrop-blur-md transition-all duration-500 hover:border-white/20 hover:bg-[#0a1220]/95"
                style={{ minHeight: "240px" }}
              >
                <div className="absolute inset-0 z-10 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-full" />
                <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#FF6B00]/5 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                
                {/* IMPROVEMENT: Architectural Stroke Numbers */}
                <div
                  className="absolute bottom-[-10%] right-[-5%] z-0 select-none font-black leading-[1] text-transparent transition-all duration-700 group-hover:scale-105"
                  style={{ 
                    fontSize: "clamp(100px, 20vw, 200px)",
                    WebkitTextStroke: "1px rgba(255,255,255,0.06)",
                  }}
                >
                  {pillar.id}
                </div>

                {/* IMPROVEMENT: Content Lift on hover */}
                <div className="relative z-20 transition-transform duration-500 ease-out group-hover:-translate-y-2">
                  <div className="mb-2 text-xs font-bold tracking-wider text-[#FF6B00] sm:mb-4 sm:text-sm">
                    {pillar.id} .
                  </div>
                  <h3 className="mb-2 text-lg font-semibold tracking-tight text-white sm:mb-3 sm:text-2xl lg:text-3xl leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/55 sm:text-base">
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── Card 03 ── */}
          <motion.div
            variants={itemVariants}
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/[0.08] transition-all duration-500 hover:border-white/20"
            style={{ minHeight: "500px" }}
          >
            <div className="absolute inset-0 z-0">
              <img
                src={pillars[2].image}
                alt={pillars[2].title}
                className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1B2E] via-[#0F1B2E]/40 to-transparent" />
            </div>

            {/* IMPROVEMENT: Architectural Stroke Numbers */}
            <div
              className="absolute top-0 right-0 z-20 select-none font-black leading-[1] text-transparent transition-all duration-700 group-hover:scale-105"
              style={{ 
                fontSize: "clamp(120px, 15vw, 220px)",
                WebkitTextStroke: "1px rgba(255,255,255,0.06)",
                transform: "translate(10%, -10%)" // Bleeds off the top right edge slightly for style
              }}
            >
              {pillars[2].id}
            </div>

            <div className="relative z-20 mt-auto p-4 sm:p-8">
              {/* IMPROVEMENT: Enhanced Glass Panel with Lift */}
              <div className="rounded-2xl border border-white/[0.08] bg-[#0F1B2E]/60 backdrop-blur-xl p-6 shadow-2xl transition-all duration-500 group-hover:-translate-y-2 group-hover:bg-[#0F1B2E]/80 group-hover:border-white/[0.15]">
                <div className="mb-2 text-sm font-bold tracking-wider text-[#FF6B00] sm:mb-3">
                  {pillars[2].id} .
                </div>
                <h3 className="mb-3 text-xl font-semibold tracking-tight text-white sm:text-2xl lg:text-3xl">
                  {pillars[2].title}
                </h3>
                <p className="text-sm leading-relaxed text-white/70 transition-colors duration-300 group-hover:text-white/90 sm:text-base">
                  {pillars[2].description}
                </p>
                <div className="mt-6 h-px w-12 bg-[#FF6B00] transition-all duration-700 ease-out group-hover:w-full" />
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}