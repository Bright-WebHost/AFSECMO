"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { ArrowRight, ChevronRight } from "lucide-react";
import Link from "next/link";

type ServiceItem = {
  id: string;
  num: string;
  category: string;
  tag: string;
  title: [string, string];
  desc: string;
  features: string[];
  image: string;
};

export function ServicesContent() {
  const { t } = useTranslation("content");
  const services = t("services.items", { returnObjects: true }) as ServiceItem[];
  const hero = t("services.hero", { returnObjects: true }) as { eyebrow: string; titleLead: string; titleAccent: string; description: string };
  const cta = t("services.cta", { returnObjects: true }) as { heading: string; description: string; button: string };

  return (
    // Clean off-white baseline canvas to match the screenshots
    <div className="min-h-screen bg-[#f8f9fa] font-sans text-gray-900 selection:bg-[#FF6B00] selection:text-white pt-24">

      {/* ─── 1. Contained Hero Card ─── */}
      <section className="mx-auto max-w-350 px-4 sm:px-6 lg:px-8">
        <div className="relative h-[60vh] min-h-115 w-full overflow-hidden rounded-4xl bg-gray-900 shadow-sm">
          <div className="absolute inset-0 z-0">
            <img
              src="/service.webp"
              alt={hero.eyebrow || "What We Do"}
              className="h-full w-full object-cover opacity-85"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
          </div>

          <div className="relative z-10 flex h-full flex-col justify-between p-8 sm:p-12 md:p-16">
            <div className="flex items-center gap-2 text-xs font-semibold text-white/90 tracking-wide">
              <span className="opacity-80 hover:underline cursor-pointer">AFSECMO</span>
              <ChevronRight className="h-3 w-3 text-white/50 stroke-3" />
              <span className="text-white">What we do</span>
            </div>

            <div className="max-w-3xl text-left">
              <h1 className="text-4xl font-medium tracking-tight text-white sm:text-5xl lg:text-6xl">
                {hero.eyebrow || "What we do"}
              </h1>
              <p className="mt-4 text-base font-light leading-relaxed text-gray-200 sm:text-lg lg:text-xl">
                {hero.description || "Investing for growth. Innovating for greater sustainability."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. Corrected Borderless 3-Column Grid ─── */}
      <section className="mx-auto max-w-350 px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        {/* Strict 3-column setup. Spacing matches the clean spacing in the updated webp assets */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((svc, index) => (
            <Link
              key={svc.id || index}
              href="/contact"
              className="group flex flex-col cursor-pointer"
            >
              {/* Image box only - Completely borderless, no wrapper card background */}
              <div className="h-52 w-full overflow-hidden rounded-2xl bg-gray-200 sm:h-60 md:h-64">
                <img
                  src={svc.image}
                  alt={svc.title[0]}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                />
              </div>

              {/* Text content elements sit directly on the off-white page background */}
              <div className="mt-5 flex flex-col">
                <h3 className="text-base font-normal tracking-tight text-gray-900 leading-snug group-hover:text-gray-600 transition-colors">
                  {svc.title[0]} {svc.title[1]}
                </h3>
                
                <p className="mt-2 text-xs font-light leading-relaxed text-gray-500 line-clamp-3">
                  {svc.desc}
                </p>

                {/* Minimalist interactive link matching the custom request routing */}
                <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#FF6B00] transition-colors group-hover:text-[#E65C00]">
                  <span>{t("services.cta_label", "Request support")}</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── 3. Minimalist Footer CTA ─── */}
      <section className="w-full bg-white border-t border-gray-200 py-16 lg:py-24">
        <div className="mx-auto max-w-350 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-light tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
                {cta.heading || "Ready to mobilise your next operation?"}
              </h2>
              <p className="mt-2 text-sm font-light text-gray-500">
                {cta.description || "Share your requirements with AFSECMO and our team will coordinate the right procurement, logistics, equipment, technical or field-support solution for your project."}
              </p>
            </div>
            <div className="shrink-0">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl bg-gray-900 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
              >
                {cta.button || "Request a quotation"}
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default function ServicesPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/en/services");
  }, [router]);

  return null;
}