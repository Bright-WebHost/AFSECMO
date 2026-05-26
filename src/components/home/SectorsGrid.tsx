"use client";

import { MouseEvent, useState, UIEvent } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const cards = [
  {
    id: "mining",
    eyebrowKey: "sectorsGrid.cards.mining.eyebrow",
    defaultEyebrow: "Sectors Served",
    titleKey: "sectorsGrid.cards.mining.title",
    defaultTitle: "Driving extraction efficiency through innovation in Mining.",
    image: "/about1.webp",
  },
  {
    id: "oil-gas",
    eyebrowKey: "sectorsGrid.cards.oilGas.eyebrow",
    defaultEyebrow: "What We Do",
    titleKey: "sectorsGrid.cards.oilGas.title",
    defaultTitle: "Powering infrastructure with reliable Oil & Gas solutions.",
    image: "/about2.webp",
  },
  {
    id: "construction",
    eyebrowKey: "sectorsGrid.cards.construction.eyebrow",
    defaultEyebrow: "Our Impact",
    titleKey: "sectorsGrid.cards.construction.title",
    defaultTitle: "Building the backbone of West African industrial construction.",
    image: "/about3.webp",
  },
  {
    id: "logistics",
    eyebrowKey: "sectorsGrid.cards.logistics.eyebrow",
    defaultEyebrow: "Logistics",
    titleKey: "sectorsGrid.cards.logistics.title",
    defaultTitle: "Delivering dependable supply chain support to your doorstep.",
    image: "/about4.webp",
  },
];

// ─── Individual card ────────────────────────────────────────────────────────
function Card({ card }: { card: (typeof cards)[0] }) {
  const { t } = useTranslation("content");
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const bubbleBackground = useMotionTemplate`
    radial-gradient(
      420px circle at ${mouseX}px ${mouseY}px,
      rgba(255,255,255,0.15),
      transparent 75%
    )
  `;

  return (
    <div
      onMouseMove={handleMouseMove}
      // Adjusted height to look great in a horizontal scroll format
      className="group relative h-95 w-full cursor-pointer overflow-hidden rounded-2xl bg-black sm:h-110"
    >
      {/* 1 — Background image */}
      <img
        src={card.image}
        alt={t(card.titleKey, card.defaultTitle)}
        className="absolute inset-0 z-0 h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-[1.05]"
        loading="lazy"
      />

      {/* 2 — Permanent dark gradient */}
      <div
        className="absolute inset-0 z-10 transition-opacity duration-400"
        style={{
          background:
            "linear-gradient(160deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 45%, rgba(0,0,0,0.65) 100%)",
        }}
      />

      {/* 3 — Cursor spotlight bubble */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-20 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: bubbleBackground }}
      />

      {/* 4 — Text */}
      <div className="absolute inset-0 z-30 flex flex-col p-6 lg:p-7">
        <span className="mb-2 text-[10px] font-medium uppercase tracking-[0.2em] text-white/70">
          {t(card.eyebrowKey, card.defaultEyebrow)}
        </span>
        <h3 className="max-w-57.5 text-lg font-light leading-[1.35] text-white sm:text-xl">
          {t(card.titleKey, card.defaultTitle)}
        </h3>
      </div>

      {/* arrow removed per client request */}
    </div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────
export default function ServicesGrid() {
  const { t } = useTranslation("content");
  
  // State to track scroll progress (from 0 to 1)
  const [scrollProgress, setScrollProgress] = useState(0);

  // Calculate progress when user scrolls
  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const { scrollLeft, scrollWidth, clientWidth } = e.currentTarget;
    const maxScroll = scrollWidth - clientWidth;
    
    // Prevent dividing by zero if container isn't scrollable
    const progress = maxScroll > 0 ? scrollLeft / maxScroll : 0;
    setScrollProgress(progress);
  };
  
  return (
    <section
      className="w-full px-0 py-12 font-sans sm:px-8 lg:px-16 lg:py-20"
      style={{ background: "#f4f4f4" }}
    >
      <div className="mx-auto max-w-350">

        {/* Section header (kept padding on mobile so it aligns, while edge-to-edge scrolling happens below) */}
        <div className="mb-6 flex flex-col items-start justify-between gap-6 px-5 md:flex-row md:items-end lg:gap-10 lg:px-0">
          <div>
            <span className="mb-3 block text-[11px] font-medium uppercase tracking-[0.22em] text-[#0055A4] md:mb-5">
              {t("sectorsGrid.eyebrow", "Discover AFSECMO")}
            </span>
            <p className="max-w-155 text-2xl font-light leading-[1.3] tracking-tight text-[#111] sm:text-3xl lg:text-[38px] lg:leading-[1.2]">
              {t(
                "sectorsGrid.description",
                "We support infrastructure, energy and logistics operations with practical coordination, reliable sourcing and field execution."
              )}
            </p>
          </div>

          {/* 'View all sectors' button removed per request */}
        </div>

        {/* Thin divider */}
        <div className="mb-8 hidden h-px w-full bg-black/10 lg:block" />

        {/* ─── Carousel Container ─── */}
          <div 
          className="flex w-full snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-6 lg:px-0 [&::-webkit-scrollbar]:hidden"
          onScroll={handleScroll}
        >
          {cards.map((card) => (
            <div 
              key={card.id} 
              // 85vw on mobile gives that nice "peek" effect for the next card
              className="min-w-[85vw] shrink-0 snap-center sm:min-w-85 lg:min-w-80"
            >
              <Card card={card} />
            </div>
          ))}
        </div>

        {/* ─── Custom Scroll Indicator ─── */}
        {/* Exactly mimicking the screenshot with brand blue and orange */}
        <div className="mx-auto mt-2 h-1 w-full max-w-50 rounded-full bg-black/10 sm:max-w-75">
          <div
            className="h-full w-1/4 rounded-full bg-linear-to-r from-[#0055A4] to-[#FF8C00]"
            style={{
              // If width is 1/4 (25%), we need to move it across the remaining 75%. 
              // 300% of its own width = 75% of the parent width.
              transform: `translateX(${scrollProgress * 300}%)`,
              transition: "transform 0.1s ease-out"
            }}
          />
        </div>

      </div>
    </section>
  );
}