"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { ArrowRight, ChevronRight } from "lucide-react";
import Link from "next/link";

type Standard = { title: string; category: string; copy: string };

// High-end Unsplash images for heavy industry & quality control
const images = [
  "/about1.png", 
  "/about2.jpg", 
  "/unsplash-1541888946425-d81bb19240f5.jpg", 
  "/unsplash-1494412574643-ff11b0a5c1c3.jpg", 
  "/unsplash-1504328345606-18bbc8c9d7d1.jpg", 
  "/unsplash-1518770660439-4636190af475.jpg", 
];

const easeExp = [0.16, 1, 0.3, 1] as [number, number, number, number];

export function QualityContent() {
  const { t } = useTranslation("content");
  
  // Data extraction with fallbacks
  const standards = (t("quality.standards", { returnObjects: true }) || [
    { title: "Environmental Compliance", category: "Safety", copy: "Strict adherence to global ecological preservation protocols." },
    { title: "Supply Chain Integrity", category: "Logistics", copy: "End-to-end verification of raw material sourcing and delivery." },
    { title: "Operational Excellence", category: "Engineering", copy: "Maximizing uptime through rigorous preventative maintenance." }
  ]) as Standard[];

  const hero = (t("quality.hero", { returnObjects: true }) || {
    eyebrow: "OPERATIONAL METRICS",
    titleLead: "Unyielding commitment to",
    titleAccent: "industrial excellence.",
    description: "Our quality assurance frameworks are designed to exceed global compliance standards, ensuring reliability and safety across all African operations."
  }) as { eyebrow: string; titleLead: string; titleAccent: string; description: string };

  return (
    <main className="w-full bg-[#f8f9fa] pt-24 pb-24 font-sans text-gray-900 selection:bg-[#FF6B00] selection:text-white">
      
      {/* ─── 1. YOUR ORIGINAL HERO (Untouched visually, Tailwind classes optimized) ─── */}
      <section className="mx-auto max-w-350 px-4 sm:px-6 lg:px-8">
        <div className="relative min-h-115 h-[60vh] w-full overflow-hidden rounded-4xl bg-gray-900 shadow-sm">
          
          <div className="absolute inset-0 z-0">
            <img
              src="/quality.jpg"
              alt="Quality Standards Banner"
              className="h-full w-full object-cover opacity-85"
            />
            {/* Updated to bg-linear-to-t per Tailwind v4 standards */}
            <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-transparent" />
          </div>

          <div className="relative z-10 flex h-full flex-col justify-between p-8 sm:p-12 md:p-16">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-white/90">
              <span className="cursor-pointer opacity-80 hover:underline">AFSECMO</span>
              <ChevronRight className="h-3 w-3 stroke-3 text-white/50" />
              <span className="text-white">Quality & Compliance</span>
            </div>

            <div className="max-w-3xl text-left">
              <h1 className="text-4xl font-medium leading-none tracking-tight text-white sm:text-5xl lg:text-6xl uppercase">
                {hero.titleLead} <span className="block text-[#FF6B00]">{hero.titleAccent}</span>
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. Introductory Summary Paragraph Row (Upgraded Typography) ─── */}
      <section className="mx-auto max-w-350 px-4 pt-16 pb-12 sm:px-6 lg:px-8 lg:pt-24">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-start lg:gap-16">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: easeExp }}
            className="md:col-span-4"
          >
            <h2 className="text-xl md:text-2xl lg:text-[28px] font-bold uppercase tracking-[0.25em] text-[#FF6B00]">
              {hero.eyebrow || "OPERATIONAL METRICS"}
            </h2>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: easeExp }}
            className="md:col-span-8 lg:col-span-7"
          >
            <p className="text-xl font-light leading-relaxed text-[#111] md:text-2xl lg:text-[28px] lg:leading-[1.4]">
              {hero.description}
            </p>
          </motion.div>
          
        </div>
      </section>

      {/* Thin architectural divider */}
      <div className="mx-auto max-w-350 px-4 sm:px-6 lg:px-8">
        <div className="h-px w-full bg-black/10" />
      </div>

      {/* ─── 3. Borderless Corporate Grid (Aramco-style Upgrades) ─── */}
      <section className="mx-auto max-w-350 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        
        <div className="mb-12 lg:mb-16">
          <h2 className="text-3xl font-light tracking-tight text-[#111] lg:text-4xl">
            In this section
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-16">
          {Array.isArray(standards) && standards.map((standard, index) => (
            <motion.div
              key={standard.title || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: easeExp }}
            >
              <Link
                href="/contact" 
                className="group flex cursor-pointer flex-col text-left"
              >
                {/* Image Block: Sharp corners, grayscale hover effect */}
                <div className="relative h-70 w-full overflow-hidden rounded-xs bg-black sm:h-80 lg:h-95">
                  <img
                    src={images[index % images.length]}
                    alt={standard.title}
                    className="h-full w-full object-cover transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:opacity-80"
                    loading="lazy"
                  />
                </div>

                {/* Text Content */}
                <div className="mt-6 flex flex-col pr-4">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF6B00]">
                      SYS // REG 0{index + 1}
                    </span>
                    {standard.category && (
                      <span className="flex items-center text-[10px] font-bold uppercase tracking-[0.2em] text-[#777]">
                        <span className="mr-3 h-1 w-1 rounded-full bg-[#ccc]" />
                        {standard.category}
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl font-light leading-[1.3] tracking-tight text-[#111] transition-colors duration-300 group-hover:text-[#FF6B00]">
                    {standard.title}
                  </h3>
                  
                  <p className="mt-3 line-clamp-3 text-sm font-light leading-relaxed text-[#555]">
                    {standard.copy}
                  </p>

                  {/* High-End Interactive CTA */}
                  <div className="mt-6 flex w-fit items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#111] transition-colors duration-300 group-hover:text-[#FF6B00]">
                    <span>Verify Standard</span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-black/10 transition-all duration-300 group-hover:border-[#FF6B00] group-hover:bg-[rgba(255,107,0,0.08)]">
                      <ArrowRight className="h-3 w-3 transition-colors duration-300 group-hover:stroke-[#FF6B00]" strokeWidth={2.5} />
                    </span>
                  </div>
                </div>
              </Link>
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