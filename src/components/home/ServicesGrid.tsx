"use client";

import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react"; // Ensure lucide-react is installed

// We add a 'widthClass' to control the unique size of each card
const fallbackServices = [
  {
    title: "Managing our emissions",
    image: "https://images.unsplash.com/photo-1581092160607-ee22531fa799?q=80&w=600&auto=format&fit=crop",
    // Narrow / Portrait
    widthClass: "w-[240px] sm:w-[280px] lg:w-[320px]", 
  },
  {
    title: "The Manifa Story",
    image: "https://images.unsplash.com/photo-1549421263-503525164478?q=80&w=1200&auto=format&fit=crop",
    // Wide / Landscape
    widthClass: "w-[320px] sm:w-[480px] lg:w-[650px]", 
  },
  {
    title: "Serving society",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800&auto=format&fit=crop",
    // Square-ish
    widthClass: "w-[280px] sm:w-[360px] lg:w-[400px]", 
  },
  {
    title: "Driving Logistics Forward", // Updated title for your context
    image: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=1000&auto=format&fit=crop",
    // Medium Wide
    widthClass: "w-[300px] sm:w-[420px] lg:w-[500px]", 
  },
];

export default function ServicesGallery() {
  const { t } = useTranslation("home");
  const rawServices = t("services.items", { returnObjects: true });
  
  // Map your translations to the dynamic widths, or use fallbacks
  const services = Array.isArray(rawServices) && rawServices.length > 0 
    ? rawServices.map((s: any, i) => ({
        ...s,
        widthClass: fallbackServices[i % fallbackServices.length].widthClass
      }))
    : fallbackServices;
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    // Strictly white background
    <section className="w-full bg-white py-20 sm:py-32 font-sans selection:bg-[#FF8C00] selection:text-white">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        
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
          className="flex w-full snap-x snap-mandatory gap-6 overflow-x-auto pb-8 pt-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {services.map((service, index) => (
            <div 
              key={index} 
              // Applies the unique width to each card while keeping shrink-0
              className={`group flex shrink-0 snap-start flex-col cursor-pointer ${service.widthClass}`}
            >
              {/* Image Container */}
              <div className="h-[280px] sm:h-[350px] lg:h-[420px] w-full overflow-hidden rounded-[1.5rem]">
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
                
                {/* Arrow Link updated to AFSECMO brand orange (#FF8C00) and hovers to a slightly darker shade (#E67E00) */}
                <div className="flex w-fit items-center gap-2 text-sm font-medium text-[#FF8C00] transition-colors group-hover:text-[#E67E00]">
                  <span>{t("services.cta", "Learn more")}</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}