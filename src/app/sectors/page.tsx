"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { ArrowRight, ChevronRight } from "lucide-react";
import Link from "next/link";

type SectorItem = {
  id: string;
  prefix: string;
  title: string;
  subtitle: string;
  desc: string;
  tag: string;
  image: string;
};

export function SectorsContent() {
  const { t } = useTranslation("content");
  const sectors = t("sectors.items", { returnObjects: true }) as SectorItem[];
  const hero = t("sectors.hero", { returnObjects: true }) as { titleLead: string; titleAccent: string };
  const cta = t("sectors.cta") as string;

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-[#FF6B00] selection:text-white pt-24">

      {/* ─── 1. Architectural Rounded Hero Card Banner (image_d6c58b.jpg) ─── */}
      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="relative h-[60vh] min-h-[460px] w-full overflow-hidden rounded-[2rem] bg-gray-900 shadow-sm">
          
          <div className="absolute inset-0 z-0">
            {/* Using the standard first asset image from your collection to stay authentic */}
            <img
              src={sectors?.[0]?.image || "/08.png"}
              alt={sectors?.[0]?.title || "Hero Banner"}
              className="h-full w-full object-cover opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          </div>

          {/* Breadcrumbs & Dynamic Text Overlay */}
          <div className="relative z-10 flex h-full flex-col justify-between p-8 sm:p-12 md:p-16">
            
            {/* Top-Aligned Navigation Path Track */}
            <div className="flex items-center gap-2 text-xs font-semibold text-white/90 tracking-wide">
              <span className="opacity-80 hover:underline cursor-pointer">AFSECMO</span>
              <ChevronRight className="h-3 w-3 text-white/50 stroke-[3]" />
              <span className="text-white">Sustainability & Sectors</span>
            </div>

            {/* Bottom-left Asymmetrical Main Header Display */}
            <div className="max-w-3xl text-left">
              <h1 className="text-4xl font-medium tracking-tight text-white sm:text-5xl lg:text-6xl">
                {hero.titleLead} <span className="block text-[#FF6B00]">{hero.titleAccent}</span>
              </h1>
            </div>

          </div>
        </div>
      </section>

      {/* ─── 2. Professional Multi-Column Summary Descriptions (image_d6c590.jpg top) ─── */}
      {/* Real layout columns populated strictly from your parsed sector items array */}
      {Array.isArray(sectors) && sectors.length > 0 && (
        <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-16 lg:py-24 border-b border-gray-100">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 text-sm font-light leading-relaxed text-gray-600 lg:text-base lg:gap-12">
            {sectors.slice(0, 3).map((sector) => (
              <div key={`summary-${sector.id}`}>
                <p>{sector.desc}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ─── 3. Freestanding Content Grid Cluster (image_d6c590.jpg "In this section") ─── */}
      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        
        <div className="mb-12">
          <h2 className="text-2xl font-light tracking-tight text-gray-900 sm:text-3xl">
            In this section
          </h2>
        </div>

        {/* 3-Column Naked Component Grid stream - Rerouted to Contact for functional UX */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {Array.isArray(sectors) && sectors.map((sector) => (
            <Link
              key={sector.id}
              href="/contact"
              className="group flex flex-col cursor-pointer text-left"
            >
              {/* Media Container Box */}
              <div className="h-52 w-full overflow-hidden rounded-2xl bg-gray-100 sm:h-56 md:h-60">
                <img
                  src={sector.image}
                  alt={sector.title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                />
              </div>

              {/* Text elements resting completely bare on the off-white canvas fields */}
              <div className="mt-5 flex flex-col">
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#FF6B00]">
                    {sector.prefix}
                  </span>
                  <span className="text-[9px] font-medium uppercase tracking-wider text-gray-400">
                    {sector.tag}
                  </span>
                </div>

                <h3 className="text-lg font-medium tracking-tight text-gray-900 leading-snug transition-colors group-hover:text-gray-600">
                  {sector.title} <span className="text-gray-400 font-light">{sector.subtitle}</span>
                </h3>
                
                <p className="mt-2 text-xs font-light leading-relaxed text-gray-500 line-clamp-3">
                  {sector.desc}
                </p>

                {/* Dynamic Action Trigger directly pulling your core 'cta' parameter string */}
                <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold tracking-wider text-[#FF6B00] transition-colors group-hover:text-[#E65C00]">
                  <span className="uppercase tracking-widest">{cta}</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}

export default function SectorsPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/en/sectors");
  }, [router]);

  return null;
}