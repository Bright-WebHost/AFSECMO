"use client";

import { motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

type SectorItem = {
  id: string;
  prefix: string;
  title: string;
  subtitle: string;
  desc: string;
  tag: string;
  image: string;
};

const awwwardsEase = [0.76, 0, 0.24, 1] as [number, number, number, number];

// Mask reveal animation for hero text lines
const maskVariants: Variants = {
  hidden: { y: "110%" },
  visible: {
    y: 0,
    transition: { duration: 0.9, delay: 0.1, ease: awwwardsEase },
  },
};

export function SectorsContent() {
  const { t } = useTranslation("content");
  const sectors = t("sectors.items", { returnObjects: true }) as SectorItem[];
  const hero = t("sectors.hero", { returnObjects: true }) as { titleLead: string; titleAccent: string };
  const cta = t("sectors.cta") as string;

  // Track which sector is currently in the center of the viewport
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <main className="min-h-screen bg-[#0F1B2E] text-white selection:bg-[#FF6B00] selection:text-white pb-32">
      
      {/* ── Background Atmospheric Glow ── */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -left-40 top-0 h-[800px] w-[800px] rounded-full bg-[#FF6B00]/5 blur-[150px]" />
        <div className="absolute bottom-1/4 right-0 h-[600px] w-[600px] rounded-full bg-[#1A2C4D]/40 blur-[120px]" />
      </div>

      {/* ── Compact Cinematic Hero Section (UNCHANGED) ── */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-20 pt-40 lg:px-12 lg:pt-48">
        <div className="max-w-4xl">
          <h1 className="text-5xl font-black uppercase leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-[85px]">
            <span className="relative block overflow-hidden py-1">
              <motion.span initial="hidden" animate="visible" variants={maskVariants} className="block">
                {hero.titleLead}
              </motion.span>
            </span>
            <span className="relative block overflow-hidden py-1">
              <motion.span initial="hidden" animate="visible" variants={maskVariants} className="block text-[#FF6B00]">
                {hero.titleAccent}
              </motion.span>
            </span>
          </h1>
        </div>
      </section>

      {/* ── Premium Editorial Sticky Scroll Layout ── */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 flex flex-col lg:flex-row">
        
        {/* ── LEFT COLUMN: Sticky Cinematic Portal (Desktop Only) ── */}
        <div className="hidden lg:flex w-1/2 sticky top-0 h-screen flex-col justify-center pr-16 xl:pr-24">
          <div className="relative w-full h-[75vh] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.6)] bg-[#020408]">
            {sectors.map((sector, idx) => {
              const isActive = activeIndex === idx;
              return (
                <div 
                  key={`image-${sector.id}`} 
                  className={`absolute inset-0 transition-all duration-[1200ms] ease-[0.76,0,0.24,1] ${
                    isActive ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-110'
                  }`}
                >
                  <img 
                    src={sector.image} 
                    alt={sector.title}
                    className="w-full h-full object-cover grayscale-[30%]" 
                  />
                  {/* Cinematic Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060A11] via-transparent to-transparent opacity-90" />
                  
                  {/* Giant Wireframe Number inside Image */}
                  <div 
                    className="absolute -bottom-8 -right-8 text-transparent select-none transition-transform duration-[1200ms] ease-out"
                    style={{ 
                      fontSize: "220px", 
                      fontWeight: 900, 
                      lineHeight: 1,
                      WebkitTextStroke: "1px rgba(255,255,255,0.12)",
                      transform: isActive ? "translateY(0)" : "translateY(20px)"
                    }}
                  >
                    {sector.id}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── RIGHT COLUMN: Scrolling Typography ── */}
        <div className="w-full lg:w-1/2 flex flex-col pb-[10vh]">
          {sectors.map((sector, idx) => {
            const isActive = activeIndex === idx;

            return (
              <motion.div
                key={`text-${sector.id}`}
                // Triggers when this text block hits the vertical center of the screen
                viewport={{ margin: "-50% 0px -50% 0px" }}
                onViewportEnter={() => setActiveIndex(idx)}
                className="flex flex-col justify-center min-h-screen py-16 lg:py-0"
              >
                {/* ── Mobile-Only Image (Hidden on Desktop) ── */}
                <div className="block lg:hidden w-full h-[45vh] rounded-3xl overflow-hidden mb-10 relative border border-white/10 shadow-2xl">
                  <img src={sector.image} className="w-full h-full object-cover grayscale-[20%]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060A11] via-transparent to-transparent opacity-90" />
                  <div className="absolute -bottom-4 -right-4 text-[120px] font-black text-transparent leading-none" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.15)" }}>
                    {sector.id}
                  </div>
                </div>

                {/* ── Content Block ── */}
                <div 
                  className={`transition-all duration-[800ms] ease-out ${
                    // Fades and slides inactive items on desktop for focus
                    isActive ? 'opacity-100 translate-x-0' : 'lg:opacity-30 lg:translate-x-12 opacity-100'
                  }`}
                >
                  {/* Meta Tags */}
                  <div className="mb-6 flex items-center gap-4">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF6B00]">
                      {sector.prefix} Division
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[8px] font-bold uppercase tracking-widest text-white backdrop-blur-md">
                      {sector.tag}
                    </span>
                  </div>

                  {/* Headlines */}
                  <h2 className="mb-6 text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
                    {sector.title} <br />
                    <span className="text-white/40">{sector.subtitle}</span>
                  </h2>

                  {/* Description */}
                  <p className="max-w-md text-sm leading-relaxed text-white/60 sm:text-base lg:text-lg mb-10">
                    {sector.desc}
                  </p>

                  {/* Animated CTA */}
                  <a 
                    href="#contact" 
                    className="group flex w-max items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-white transition-colors hover:text-[#FF6B00]"
                  >
                    {cta}
                    <span className="h-px w-8 bg-white/30 transition-all duration-500 ease-out group-hover:w-20 group-hover:bg-[#FF6B00]" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

      </section>
    </main>
  );
}

export default function SectorsPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/en/sectors");
  }, [router]);

  return null;
}