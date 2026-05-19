"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

type Phase = { num: string; tag: string; title: string; desc: string; image: string };

const awwwardsEase = [0.215, 0.61, 0.355, 1] as [number, number, number, number];

const rowRevealVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: awwwardsEase },
  },
};

export function MethodContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation("content");
  const phases = t("method.phases", { returnObjects: true }) as Phase[];
  const hero = t("method.hero", { returnObjects: true }) as {
    eyebrow: string;
    titleLead: string;
    titleAccent: string;
    subtitle: string;
    description: string;
  };
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <main className="relative min-h-screen bg-[#0F1B2E] text-white selection:bg-[#FF6B00] selection:text-white overflow-hidden pb-32">
      
      {/* ATMOSPHERIC DEEP BLUR FIELD BACKGROUNDS */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 h-150 w-150 rounded-full bg-[#FF6B00]/5 blur-[160px]" />
        <div className="absolute bottom-1/3 right-1/4 h-150 w-150 rounded-full bg-[#1A2C4D]/40 blur-[140px]" />
      </div>

      {/* ── HERO TEXT ROW BLOCK ── */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-8 lg:px-12 lg:pt-40">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end border-b border-white/5 pb-10">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-[#FF6B00]" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#FF6B00]">{hero.eyebrow}</span>
            </div>
            <h1 className="text-4xl font-light tracking-tight text-white sm:text-6xl lg:text-7xl uppercase leading-none">
              {hero.titleLead} <br />
              <span className="font-semibold text-transparent bg-clip-text bg-linear-to-r from-white via-white to-white/40">
                {hero.titleAccent}
              </span>
            </h1>
            <p className="mt-2 text-sm uppercase tracking-[0.2em] text-white/40 font-mono">
              {hero.subtitle}
            </p>
          </div>
          <div>
            <p className="text-sm leading-relaxed text-white/50 sm:text-base font-light lg:max-w-md">
              {hero.description}
            </p>
          </div>
        </div>
      </section>

      {/* ── CENTRALIZED SCROLL TIMELINE TRACK TRACKER ── */}
      <section ref={containerRef} className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 py-12">
        <div className="relative w-full">
          
          {/* Timeline Track Guide Line */}
          <div className="absolute left-4 top-0 h-full w-px -translate-x-1/2 bg-white/10 lg:left-1/2 rounded-full pointer-events-none" />

          {/* Electric Amber Active Progression Line Overlay */}
          <motion.div
            className="absolute left-4 top-0 w-px -translate-x-1/2 bg-linear-to-b from-[#FF6B00] to-[#FFD580] origin-top shadow-[0_0_12px_rgba(255,107,0,0.8)] lg:left-1/2 rounded-full pointer-events-none"
            style={{ height: lineHeight }}
          />

          {/* ASYMMETRIC STACKED TRACK CONTAINER ROWS */}
          <div className="space-y-8 sm:space-y-12 lg:space-y-14">
            {phases.map((phase, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={phase.num}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.25 }}
                  variants={rowRevealVariants}
                  className="grid grid-cols-1 gap-6 relative items-center pl-10 lg:grid-cols-[1fr_auto_1fr] lg:gap-12 lg:pl-0"
                >
                  
                  {/* LEFT ZONE NODE PANEL */}
                  <div className={`flex flex-col justify-center w-full ${
                    isEven ? "lg:text-right lg:items-end order-2 lg:order-1" : "order-2"
                  }`}>
                    <span className="text-[10px] font-mono tracking-[0.25em] text-[#FF6B00] mb-2 block uppercase">
                      // {phase.tag}
                    </span>
                    <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl lg:text-3xl uppercase mb-3">
                      {phase.title}
                    </h2>
                    <p className={`text-xs sm:text-sm leading-relaxed text-white/50 font-light max-w-md ${
                      isEven ? "lg:ml-auto" : ""
                    }`}>
                      {phase.desc}
                    </p>
                  </div>

                  {/* CENTER ZONE NODE PANEL: Animated Kinetic Timeline Portal Circles */}
                  <div className="absolute left-4 lg:left-1/2 lg:-translate-x-1/2 z-20 top-2 lg:top-auto flex items-center justify-center pointer-events-none">
                    <motion.div 
                      whileInView={{ scale: [0.8, 1.05, 1], borderColor: ["rgba(255,255,255,0.1)", "rgba(255,107,0,1)", "rgba(255,107,0,0.3)"] }}
                      viewport={{ once: false, margin: "-20% 0px -20% 0px" }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="rounded-full border bg-[#0F1B2E] w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center shadow-2xl transition-all group duration-500"
                    >
                      <span className="text-xs sm:text-sm font-black font-mono text-white/40 group-hover:text-[#FF6B00] transition-colors">{phase.num}</span>
                    </motion.div>
                  </div>

                  {/* RIGHT ZONE NODE PANEL: Premium Asymmetric Media Image Anchor Cards */}
                  {/* FIXED: Removed backdrop-blur-sm class for crystal-clear image viewing */}
                  <div className={`w-full relative overflow-hidden rounded-3xl border border-white/10 bg-[#060A11]/60 h-60 sm:h-72 lg:h-80 shadow-[0_30px_60px_rgba(0,0,0,0.4)] group order-1 lg:order-3 ${
                    isEven ? "lg:col-start-3" : "lg:col-start-1"
                  }`}>
                    {/* Interior Shimmer Mirror Layer */}
                    <div className="absolute inset-0 z-10 -translate-x-full bg-linear-to-r from-transparent via-white/5 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-full pointer-events-none" />
                    
                    <img 
                      src={phase.image} 
                      alt={phase.title} 
                      // FIXED: Removed opacity-35, mix-blend-luminosity, and grayscale classes for properly vivid, colored photos
                      className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
                    />
                    {/* FIXED: Removed excessive dark gradient overlay that was obscuring the bottom of the image */}
                    
                    {/* Background Huge Watermark Counter Layer */}
                    <div className="absolute -bottom-2.5 right-4 font-black text-white/5 select-none text-7xl sm:text-8xl lg:text-9xl tracking-tighter">
                      {phase.num}
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </div>

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