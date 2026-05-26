"use client";

import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react"; // Ensure lucide-react is installed
import Link from "next/link";
import { useParams } from "next/navigation";
import { withLocalePath } from "@/i18n/routing";

type ServiceItem = {
  title: string;
  summary?: string;
  image: string;
  widthClass: string;
};

// We add a 'widthClass' to control the unique size of each card
const fallbackServices: ServiceItem[] = [
  {
    title: "Managing our emissions",
    image: "/about1.webp",
    // Narrow / Portrait
    widthClass: "w-[240px] sm:w-[280px] lg:w-[320px]", 
  },
  {
    title: "The Manifa Story",
    image: "/about2.webp",
    // Wide / Landscape
    widthClass: "w-[320px] sm:w-[480px] lg:w-[650px]", 
  },
  {
    title: "Serving society",
    image: "/unsplash-1541888946425-d81bb19240f5.webp",
    // Square-ish
    widthClass: "w-[280px] sm:w-[360px] lg:w-[400px]", 
  },
  {
    title: "Driving Logistics Forward", // Updated title for your context
    image: "/unsplash-1494412574643-ff11b0a5c1c3.webp",
    // Medium Wide
    widthClass: "w-[300px] sm:w-[420px] lg:w-[500px]", 
  },
];

export default function ServicesGallery() {
  const { t } = useTranslation("home");
  const params = useParams<{ locale?: string }>();
  const locale = params?.locale === "fr" ? "fr" : "en";
  const rawServices = t("services.items", { returnObjects: true }) as ServiceItem[];
  
  // Map your translations to the dynamic widths, or use fallbacks
  const services: ServiceItem[] = Array.isArray(rawServices) && rawServices.length > 0 
    ? rawServices.map((service, i) => ({
        ...service,
        widthClass: fallbackServices[i % fallbackServices.length].widthClass,
      }))
    : fallbackServices;
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    // Strictly white background
    <section className="w-full bg-white py-20 sm:py-32 font-sans selection:bg-[#FF8C00] selection:text-white">
      <div className="mx-auto max-w-350 px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-12 max-w-3xl">
          {/* Eyebrow text updated to AFSECMO brand orange */}
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-[#FF8C00]">
            {t("services.eyebrow", "WHAT WE BELIEVE")}
          </h2>
          <p className="text-3xl font-light leading-snug text-gray-900 sm:text-4xl lg:text-5xl">
            {t(
              "services.titleLead", 
              "We believe in the power of energy to help transform lives, enhance communities, and advance human progress."
            )}
          </p>
        </div>

        {/* Horizontal Scrolling Track */}
        <div 
          ref={scrollContainerRef}
          className="scrollbar-none flex w-full snap-x snap-mandatory gap-6 overflow-x-auto pb-8 pt-4 [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {services.map((service, index) => (
            <Link
              key={index}
              href={withLocalePath(locale, "/services")}
              className={`group flex shrink-0 snap-start flex-col ${service.widthClass}`}
            
            >
              {/* Image Container */}
              <div className="h-70 w-full overflow-hidden rounded-3xl sm:h-87.5 lg:h-105">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              
              {/* Text Content Below Image */}
              <div className="mt-6 flex flex-col pr-4">
                <h3 className="mb-3 text-lg font-medium leading-snug text-gray-900 transition-colors group-hover:text-gray-600">
                  {service.title}
                </h3>

                <p className="mb-4 text-sm leading-relaxed text-gray-600 line-clamp-3">
                  {service.summary || "AFSECMO provides industrial project support tailored to operational requirements."}
                </p>
                
                {/* Arrow Link updated to AFSECMO brand orange (#FF8C00) and hovers to a slightly darker shade (#E67E00) */}
                <div className="flex w-fit items-center gap-2 text-sm font-medium text-[#FF8C00] transition-colors group-hover:text-[#E67E00]">
                  <span>{t("services.cta_label", "Request support")}</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
        
      </div>
    </section>
  );
}