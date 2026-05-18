"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const services = [
  { id: "01", category: "Mining", title: "Mining & Quarry Support", summary: "Operational support for mining and quarry environments, from field mobilisation and heavy equipment coordination to materials supply and maintenance readiness.", tag: "Heavy Operations", image: "/01.png" },
  { id: "02", category: "Energy", title: "Oil & Gas Services", summary: "Industrial services for energy and hydrocarbons projects, supporting field teams with technical procurement, equipment, utilities and maintenance operations.", tag: "Field Support", image: "/02.png" },
  { id: "03", category: "Infrastructure", title: "Engineering & Construction", summary: "Structured support for civil works, infrastructure delivery, industrial construction and site preparation requirements.", tag: "Civil Works", image: "/03.png" },
  { id: "04", category: "Maintenance", title: "Mechanical & Industrial Maintenance", summary: "Practical mechanical support designed to keep industrial sites operational, productive and safe.", tag: "Site Operations", image: "/04.jpg" },
  { id: "05", category: "Utilities", title: "Electrical, Plumbing & Utilities", summary: "Technical installation and maintenance support for industrial facilities, camps, warehouses and operational buildings.", tag: "Facility Ops", image: "/05.png" },
  { id: "06", category: "Procurement", title: "Central Purchasing & Import-Export", summary: "Professional sourcing and procurement coordination for companies that need reliable access to equipment, materials and suppliers.", tag: "Global Supply", image: "/06.png" },
  { id: "07", category: "Fleet", title: "Equipment Rental & Fleet Support", summary: "Equipment solutions for sites that require fast mobilisation, flexible rental arrangements and reliable field support.", tag: "Mobilisation", image: "/07.png" },
  { id: "08", category: "Logistics", title: "Logistics & Project Mobilisation", summary: "End-to-end coordination for moving equipment, materials and teams from suppliers to operational sites.", tag: "Transport", image: "/08.png" },
  { id: "09", category: "Asset Mgt", title: "Facility & Asset Support", summary: "Support for operational properties, camps, workshops and industrial facilities that require professional service management.", tag: "Upkeep", image: "/09.png" },
];

export default function ServicesGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [centerCardIndex, setCenterCardIndex] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const ctx = gsap.context(() => {
      const trackWidth = track.scrollWidth;
      const viewportWidth = window.innerWidth;
      
      const scrollDistance = trackWidth - viewportWidth + 100;

      if (scrollDistance <= 0) return;

      gsap.to(track, {
        x: -scrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${scrollDistance}`, 
          pin: true,
          scrub: 1, 
          invalidateOnRefresh: true,
          onUpdate: () => {
            const viewportCenter = window.innerWidth / 2;
            let closestIndex = 0;
            let minDistance = Infinity;
            const cards = Array.from(track.children) as HTMLElement[];

            cards.forEach((card, index) => {
              const rect = card.getBoundingClientRect();
              const cardCenter = rect.left + rect.width / 2;
              const distance = Math.abs(cardCenter - viewportCenter);

              if (distance < minDistance) {
                minDistance = distance;
                closestIndex = index;
              }
            });

            setCenterCardIndex(closestIndex);
          },
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="services-section"
      className="relative w-full bg-[#0F1B2E] selection:bg-[#FF6B00] selection:text-white"
    >
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 h-[600px] w-[600px] rounded-full bg-[#FF6B00]/5 blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 h-[600px] w-[600px] rounded-full bg-[#1A2C4D]/40 blur-[150px]" />
      </div>

      <div
        ref={containerRef}
        className="relative z-10 flex h-screen w-full flex-col justify-center overflow-hidden pt-12"
      >
        <div className="relative z-20 mb-10 w-full px-6 md:px-12 lg:px-20">
          <div className="mb-3 flex items-center gap-4">
            <span className="h-px w-8 bg-[#FF6B00]" />
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#FF6B00]">
              Core Services
            </span>
          </div>
          <h2 className="text-4xl font-light tracking-tight text-white sm:text-5xl lg:text-6xl whitespace-nowrap overflow-visible">
            Detailed industrial capabilities <span className="font-semibold text-transparent bg-clip-text bg-linear-to-r from-white via-white to-white/40">for high-value projects.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/50 sm:text-base">
            AFSECMO brings together technical support, procurement, logistics, maintenance and construction coordination under one professional service platform.
          </p>
        </div>

        <div
          ref={trackRef}
          className="relative z-20 flex w-max items-center gap-6 px-6 md:gap-10 md:px-12 lg:px-20"
          style={{ willChange: "transform" }}
        >
          {services.map((service, index) => {
            const isCenter = index === centerCardIndex;

            return (
              <div
                key={service.id}
                className={`group relative flex h-[50vh] min-h-[420px] w-[85vw] max-w-[400px] shrink-0 flex-col justify-between overflow-hidden rounded-[2rem] border transition-all duration-700 ease-out ${
                  isCenter
                    ? "border-[#FF6B00]/30 bg-[#060A11] shadow-[0_30px_80px_rgba(0,0,0,0.6)] scale-100 opacity-100"
                    : "border-white/5 bg-[#020408]/80 shadow-[0_15px_40px_rgba(0,0,0,0.3)] scale-[0.95] opacity-60"
                }`}
              >
                {/* --- FIXED: Cinematic Image Layer --- */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-full w-full object-cover transition-all duration-1000 ease-out"
                    style={{
                      transform: isCenter ? "scale(1.05)" : "scale(1)",
                      // Increased brightness parameters so images are clearly visible
                      filter: isCenter ? "grayscale(0%) brightness(1.1)" : "grayscale(80%) brightness(0.6)",
                    }}
                  />
                  {/* Reduced the middle gradient (from /80 to /40) so the center of the photo shows through cleanly */}
                  <div className="absolute inset-0 bg-linear-to-t from-[#060A11] via-[#060A11]/40 to-transparent" />
                </div>

                <div className="absolute -right-4 -top-6 z-10 select-none text-[140px] font-black leading-none text-white/5">
                  {service.id}
                </div>

                <div className="relative z-20 flex items-center justify-between border-b border-white/10 px-8 pb-4 pt-8">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF6B00]">
                    {service.category}
                  </span>
                  <div className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-white/70 backdrop-blur-md">
                    {service.tag}
                  </div>
                </div>

                <div className="relative z-20 mt-auto flex flex-col gap-3 px-8">
                  <h3 className="text-2xl font-semibold tracking-tight text-white drop-shadow-md sm:text-3xl pr-4">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/90 drop-shadow-md line-clamp-3">
                    {service.summary}
                  </p>
                </div>

                <div className="relative z-20 mt-6 px-8 pb-8">
                  <a
                    href="#contact"
                    className="flex w-full items-center justify-center rounded-xl bg-[#FF6B00] px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#FF8C00]"
                  >
                    Request Details
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}