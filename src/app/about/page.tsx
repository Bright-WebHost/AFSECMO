"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { ChevronRight } from "lucide-react";

type AboutActivity = { title: string; copy: string; image: string };
type AboutStat = { label: string; value: string };

export function AboutContent() {
  const { t } = useTranslation("content");
  const { t: tc } = useTranslation("common");
  const activities = t("about.activities", { returnObjects: true }) as AboutActivity[];
  const stats = t("about.stats", { returnObjects: true }) as AboutStat[];
  const hero = t("about.hero", { returnObjects: true }) as {
    eyebrow: string;
    titleLead: string;
    titleAccent: string;
    description: string;
    imageAlt: string;
  };
  const section = t("about.section", { returnObjects: true }) as { eyebrow: string; title: string };

  return (
    // Clean, pure white background for the page body
    <main className="w-full bg-white text-gray-900 font-sans selection:bg-[#FF6B00] selection:text-white pt-24">
      
      {/* ── Outer Layout Container (Creates the side margins) ── */}
      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        
        {/* ── Inner Image Box with rounded corners matching the screenshot ── */}
        <div className="relative h-[60vh] min-h-[480px] w-full overflow-hidden rounded-[2rem] bg-gray-900 shadow-sm">
          
          {/* Background Image inside the rounded card */}
          <div className="absolute inset-0 z-0">
            <img
              src="/about-hero.webp"
              alt={hero.imageAlt || "About Banner"}
              className="h-full w-full object-cover opacity-85"
            />
            {/* Subtle dark overlay for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          </div>

          {/* Text and Breadcrumbs Content inside the image container */}
          <div className="relative z-10 flex h-full flex-col justify-between p-8 sm:p-12 md:p-16">
            
            {/* Breadcrumbs matching your screenshot positioning */}
            <div className="flex items-center gap-2 text-xs font-semibold text-white/90 tracking-wide">
              <span className="opacity-80 hover:underline cursor-pointer">{tc("nav.home")}</span>
              <ChevronRight className="h-3 w-3 text-white/50 stroke-[3]" />
              <span className="text-white">{tc("nav.about")}</span>
            </div>

            {/* Title & Subtitle sitting firmly in the bottom left */}
            <div className="max-w-2xl text-left">
              <h1 className="text-4xl font-medium tracking-tight text-white sm:text-5xl lg:text-6xl">
                {hero.titleLead} <span className="block text-[#FF6B00]">{hero.titleAccent}</span>
              </h1>
              <p className="mt-4 text-base font-light leading-relaxed text-gray-200 sm:text-lg">
                {hero.description || "Energy security for a more sustainable world."}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ── Minimalist At A Glance Section (Directly underneath) ── */}
      <section className="w-full bg-white py-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-2xl font-light text-gray-900 sm:text-3xl">At a glance</h2>
          </div>
          
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8 lg:gap-16">
            {stats.map((item) => (
              <div key={item.label} className="flex flex-col">
                <span className="text-5xl font-light tracking-tight text-gray-900 lg:text-6xl">
                  {item.value}
                </span>
                <span className="mt-3 text-sm text-gray-600 leading-relaxed">
                  {item.label}
                </span>
                <div className="mt-6 h-px w-full bg-gray-200" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Activities Stream Section ── */}
      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-20 text-left max-w-3xl">
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#FF6B00]">
            {section.eyebrow || "OUR CORE ACTIVITIES"}
          </h2>
          <p className="text-3xl font-light leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
            {section.title}
          </p>
        </div>

        <div className="flex flex-col gap-24 lg:gap-32">
          {activities.map((activity, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div 
                key={activity.title} 
                className={`flex flex-col gap-8 lg:items-center lg:gap-16 ${
                  isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                <div className="h-80 w-full overflow-hidden rounded-2xl sm:h-96 lg:h-[450px] lg:w-1/2">
                  <img 
                    src={activity.image} 
                    alt={activity.title} 
                    className="h-full w-full object-cover" 
                  />
                </div>

                <div className="w-full lg:w-1/2">
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                    ACTIVITY 0{idx + 1}
                  </span>
                  <h3 className="mt-2 mb-6 text-2xl font-medium tracking-tight text-gray-900 sm:text-3xl">
                    {activity.title}
                  </h3>
                  <div className="mb-6 h-px w-12 bg-[#FF6B00]" />
                  <p className="text-base leading-relaxed text-gray-600">
                    {activity.copy}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </main>
  );
}

export default function AboutPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/en/about");
  }, [router]);

  return null;
}