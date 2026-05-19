"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const services = [
  { id: "01", category: "Mining", title: "Mining & Quarry Support", summary: "Operational support for mining and quarry environments, from field mobilisation and heavy equipment coordination to materials supply and maintenance readiness.", tag: "Heavy Operations", image: "/01.png" },
  { id: "02", category: "Energy", title: "Oil & Gas Services", summary: "Industrial services for energy and hydrocarbons projects, supporting field teams with technical procurement, equipment, utilities and maintenance operations.", tag: "Field Support", image: "/02.jpg" },
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
      {/* Background blobs */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 h-[600px] w-[600px] rounded-full bg-[#FF6B00]/5 blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 h-[600px] w-[600px] rounded-full bg-[#1A2C4D]/40 blur-[150px]" />
      </div>

      <div
        ref={containerRef}
        className="relative z-10 flex h-screen w-full flex-col justify-center overflow-hidden"
      >
        {/* ── Section header ── */}
        <div className="relative z-20 mb-6 w-full px-4 pt-10 sm:mb-10 sm:px-8 md:px-12 lg:px-20 lg:pt-12">
          <div className="mb-3 flex items-center gap-3">
            <span className="h-px w-6 bg-[#FF6B00] sm:w-8" />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#FF6B00] sm:text-xs">
              Core Services
            </span>
          </div>

          {/* Headline: wraps on mobile, single line on lg+ */}
          <h2 className="text-2xl font-light tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl lg:whitespace-nowrap">
            Detailed industrial capabilities{" "}
            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/40">
              for high-value projects.
            </span>
          </h2>

          {/* Subtitle: hidden on very small screens to save vertical space */}
          <p className="mt-2 hidden max-w-2xl text-sm leading-relaxed text-white/50 sm:mt-4 sm:block sm:text-base">
            AFSECMO brings together technical support, procurement, logistics, maintenance and
            construction coordination under one professional service platform.
          </p>
        </div>

        {/* ── Scrolling card track ── */}
        <div
          ref={trackRef}
          className="relative z-20 flex w-max items-center gap-4 px-4 sm:gap-6 sm:px-8 md:gap-8 md:px-12 lg:gap-10 lg:px-20"
          style={{ willChange: "transform" }}
        >
          {services.map((service, index) => {
            const isCenter = index === centerCardIndex;

            return (
              <div
                key={service.id}
                className={`group relative flex shrink-0 flex-col justify-between overflow-hidden rounded-[1.5rem] border transition-all duration-700 ease-out sm:rounded-[2rem] ${
                  isCenter
                    ? "border-[#FF6B00]/30 bg-[#060A11] shadow-[0_30px_80px_rgba(0,0,0,0.6)] scale-100 opacity-100"
                    : "border-white/5 bg-[#020408]/80 shadow-[0_15px_40px_rgba(0,0,0,0.3)] scale-[0.95] opacity-60"
                }`}
                style={{
                  /*
                    Mobile : card fills ~78vw, capped at 300px tall
                    Tablet+: 85vw / max-w 400px, taller
                    The height is set via min-h + explicit h so the
                    card doesn't collapse inside the flex track.
                  */
                  width: "clamp(260px, 78vw, 360px)",
                  height: "clamp(340px, 52vh, 520px)",
                }}
              >
                {/* Cinematic image layer */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-full w-full object-cover transition-all duration-1000 ease-out"
                    style={{
                      transform: isCenter ? "scale(1.05)" : "scale(1)",
                      filter: isCenter
                        ? "grayscale(0%) brightness(1.1)"
                        : "grayscale(80%) brightness(0.6)",
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060A11] via-[#060A11]/40 to-transparent" />
                </div>

                {/* Decorative number — always in frame */}
                <div className="absolute -right-2 -top-4 z-10 select-none text-[90px] font-black leading-none text-white/5 sm:text-[130px]">
                  {service.id}
                </div>

                {/* Top meta row */}
                <div className="relative z-20 flex items-center justify-between border-b border-white/10 px-5 pb-3 pt-6 sm:px-8 sm:pb-4 sm:pt-8">
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#FF6B00] sm:text-[10px]">
                    {service.category}
                  </span>
                  <div className="rounded-full border border-white/10 bg-black/40 px-2.5 py-1 text-[8px] font-bold uppercase tracking-widest text-white/70 backdrop-blur-md sm:px-3 sm:text-[9px]">
                    {service.tag}
                  </div>
                </div>

                {/* Card body */}
                <div className="relative z-20 mt-auto flex flex-col gap-2 px-5 sm:gap-3 sm:px-8">
                  <h3 className="text-lg font-semibold tracking-tight text-white drop-shadow-md sm:text-2xl md:text-3xl pr-2">
                    {service.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-white/90 drop-shadow-md line-clamp-3 sm:text-sm">
                    {service.summary}
                  </p>
                </div>

                {/* CTA */}
                <div className="relative z-20 mt-4 px-5 pb-5 sm:mt-6 sm:px-8 sm:pb-8">
                  <a
                    href="#contact"
                    className="flex w-full items-center justify-center rounded-xl bg-[#FF6B00] px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#FF8C00] sm:px-6 sm:py-3.5 sm:text-xs"
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