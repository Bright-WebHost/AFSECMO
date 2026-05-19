"use client";

import { motion, Variants } from "framer-motion";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

type Standard = { title: string; category: string; copy: string };

const awwwardsEase = [0.76, 0, 0.24, 1] as [number, number, number, number];

const maskVariants: Variants = {
  hidden: { y: "110%" },
  visible: {
    y: 0,
    transition: { duration: 0.9, delay: 0.1, ease: awwwardsEase },
  },
};

// Clean, smooth upward fading reveal for individual data rows
const rowRevealVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: awwwardsEase },
  },
};

export function QualityContent() {
  const { t } = useTranslation("content");
  const standards = t("quality.standards", { returnObjects: true }) as Standard[];
  const hero = t("quality.hero", { returnObjects: true }) as { eyebrow: string; titleLead: string; titleAccent: string; description: string };

  return (
    <main className="min-h-screen bg-[#060A11] text-white selection:bg-[#FF6B00] selection:text-white pb-32 pt-24 sm:pb-40 sm:pt-32 lg:pb-48 lg:pt-56">
      
      {/* ── Background Geometric Blueprint Layer ── */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
            maskImage: "radial-gradient(ellipse at center, black 40%, transparent 90%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 90%)",
          }}
        />
        <div className="absolute top-1/4 right-1/4 h-[600px] w-[600px] rounded-full bg-[#FF6B00]/5 blur-[160px]" />
      </div>

      <section className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-12">
        
        {/* ── Compact Cinematic Hero Section (UNCHANGED) ── */}
        <div className="max-w-4xl mb-20 lg:mb-32">
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
          <p className="mt-6 max-w-xl text-base font-light text-white/50 leading-relaxed">
            {hero.description}
          </p>
        </div>

        {/* ── Premium High-Visibility Data Grid ── */}
        <div className="flex flex-col gap-12 sm:gap-16 lg:gap-20 border-t border-white/10 pt-12 sm:pt-16">
          {standards.map((standard, idx) => (
            <motion.div
              key={standard.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={rowRevealVariants}
              className="group relative grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start w-full pb-12 lg:pb-16 border-b border-white/5 last:border-none last:pb-0"
            >
              
              {/* ── Left Metadata Frame (3 Columns) ── */}
              <div className="lg:col-span-3 flex flex-row lg:flex-col items-center lg:items-start justify-between lg:justify-start gap-4">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-sm font-bold tracking-widest text-[#FF6B00]">
                    0{idx + 1}
                  </span>
                  <span className="h-px w-6 bg-white/10 hidden lg:block" />
                  <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-white/30 group-hover:text-white/50 transition-colors duration-300">
                    SYS // REG
                  </span>
                </div>

                {standard.category && (
                  <div className="mt-0 lg:mt-4 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-[8px] font-bold uppercase tracking-widest text-white/60 backdrop-blur-md">
                    {standard.category}
                  </div>
                )}
              </div>

              {/* ── Center Core Headline Frame (4 Columns) ── */}
              <div className="lg:col-span-4 pr-0 lg:pr-6">
                <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-white leading-tight group-hover:text-[#FF6B00] transition-colors duration-300">
                  {standard.title}
                </h3>
              </div>

              {/* ── Right Detailed Content Description Frame (5 Columns) ── */}
              <div className="lg:col-span-5">
                <p className="text-sm sm:text-base font-light leading-relaxed text-white/50 group-hover:text-white/80 transition-colors duration-500">
                  {standard.copy}
                </p>

                {/* Minimalist interactive node verification line */}
                <div className="mt-6 flex w-max items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-white/40 group-hover:text-[#FF6B00] transition-all duration-300 cursor-pointer">
                  Verify Node Parameters
                  <span className="h-px w-6 bg-white/20 group-hover:w-12 group-hover:bg-[#FF6B00] transition-all duration-500" />
                </div>
              </div>

              {/* ── Decorative Wireframe Baseline Index Number ── */}
              <div 
                className="absolute right-0 bottom-6 z-0 select-none font-black leading-none text-transparent pointer-events-none transition-transform duration-700 opacity-[0.6] group-hover:translate-x-[-10px]"
                style={{
                  fontSize: "120px",
                  WebkitTextStroke: "1px rgba(255,255,255,0.02)",
                }}
              >
                0{idx + 1}
              </div>

            </motion.div>
          ))}
        </div>
      </section>

    </main>
  );
}

export default function QualityPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/en/quality");
  }, [router]);

  return null;
}